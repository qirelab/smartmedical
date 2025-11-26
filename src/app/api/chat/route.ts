import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function parseCardsInMessage(message: string) {
  console.log("🔍 Parsing message for cards:", message);
  console.log("🔍 Message length:", message.length);
  console.log("🔍 Message includes [CARD:", message.includes("[CARD:"));

  // Ищем маркеры с учетом возможных пробелов и переносов строк
  const cardRegex = /\[CARD:(SPECIALIST|SERVICE):(\d+)\]/gi;
  const cards: any[] = [];
  let match;

  while ((match = cardRegex.exec(message)) !== null) {
    const [fullMatch, type, id] = match;
    const cardId = parseInt(id);
    console.log(`📌 Found card marker: ${fullMatch}, type: ${type}, id: ${cardId}`);

    try {
      if (type === "SPECIALIST") {
        const specialist = await prisma.specialist.findUnique({
          where: { id: cardId },
          select: {
            id: true,
            name: true,
            qualification: true,
            experience: true,
            specialization: true,
            image_url: true,
            education: true,
            category: {
              select: {
                slug: true,
              },
            },
          },
        });

        if (specialist) {
          console.log(`✅ Found specialist:`, specialist);
          cards.push({
            type: "specialist",
            data: {
              ...specialist,
              categorySlug: specialist.category?.slug || "specialists",
            },
            placeholder: fullMatch,
          });
        } else {
          console.log(`❌ Specialist ${cardId} not found in DB`);
        }
      } else if (type === "SERVICE") {
        const service = await prisma.service.findUnique({
          where: { id: cardId },
          select: {
            id: true,
            title: true,
            description: true,
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
            price: true,
          },
        });

        if (service) {
          console.log(`✅ Found service:`, service);
          // Нормализуем данные: category из объекта в строку + добавляем slug
          const normalizedService = {
            ...service,
            category: service.category?.name || "Не указано",
            categorySlug: service.category?.slug || "services",
          };
          cards.push({
            type: "service",
            data: normalizedService,
            placeholder: fullMatch,
          });
        } else {
          console.log(`❌ Service ${cardId} not found in DB`);
        }
      }
    } catch (error) {
      console.error(`❌ Error loading card ${type}:${id}:`, error);
    }
  }

  console.log(`📦 Total cards found: ${cards.length}`, cards);
  return { message, cards };
}

async function getClinicContext() {
  try {
    console.log("getClinicContext: Fetching contacts...");
    const contacts = await prisma.contacts.findFirst();
    console.log("getClinicContext: Contacts fetched:", contacts ? "✓" : "✗");

    console.log("getClinicContext: Fetching services...");
    const services = await prisma.service.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log("getClinicContext: Services fetched:", services.length);

    console.log("getClinicContext: Fetching specialists...");
    const specialists = await prisma.specialist.findMany({
      select: {
        id: true,
        name: true,
        qualification: true,
        experience: true,
        specialization: true,
      },
    });
    console.log("getClinicContext: Specialists fetched:", specialists.length);

    // Нормализуем данные: преобразуем вложенные объекты в строки
    const normalizedServices = services.map((s) => ({
      ...s,
      category: s.category?.name || "Не указано",
    }));

    return {
      contacts,
      services: normalizedServices,
      specialists,
    };
  } catch (error) {
    console.error("Error fetching clinic context:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}

function buildSystemPrompt(clinicData: any) {
  const servicesText = clinicData.services && clinicData.services.length > 0
    ? clinicData.services.map((s: any) => `- ID:${s.id} - ${s.title}: ${s.description || ''}`).join("\n")
    : "Полный список услуг можно уточнить по телефону или на нашем сайте.";

  const specialistsText = clinicData.specialists && clinicData.specialists.length > 0
    ? clinicData.specialists.map((s: any) => `- ID:${s.id} - ${s.name}, ${s.qualification}, ${s.specialization}, опыт: ${s.experience} лет`).join("\n")
    : "Список специалистов можно уточнить по телефону или на нашем сайте.";

  return `Ты - виртуальный помощник медицинской клиники "Doctor Family". Твоя задача - помогать пациентам с информацией о клинике, услугах и специалистах.

📋 КОГДА ОТВЕЧАТЬ ТЕКСТОМ (без карточек):
- Вопросы о контактах, адресе, телефоне
- Вопросы о режиме работы
- Вопросы о записи на приём (как записаться)
- Общие вопросы о клинике
- Вопросы для пациентов (что взять с собой, как подготовиться)

🎴 КОГДА ИСПОЛЬЗОВАТЬ КАРТОЧКИ:
Только когда пользователь просит показать КОНКРЕТНОГО специалиста или услугу!

Формат карточек:
[CARD:SPECIALIST:ID] - заменяй ID на число из списка специалистов
[CARD:SERVICE:ID] - заменяй ID на число из списка услуг

⚠️ КАК НАЙТИ ПРАВИЛЬНЫЙ ID:
В разделе "Наши специалисты" каждая строка начинается с "- ID:число"
В разделе "Наши услуги" каждая строка начинается с "- ID:число"
Возьми это ЧИСЛО и подставь в карточку.

ПРИМЕРЫ (смотри реальные ID в списках ниже!):
- Если пользователь спросит про Анну, найди в списке "Петрова Анна Сергеевна" с её ID и напиши [CARD:SPECIALIST:её_id]
- Если спросят про лечение кариеса, найди в списке услуг "Лечение кариеса" и её ID

❌ НЕПРАВИЛЬНО: [CARD:SPECIALIST:1] или [CARD:SPECIALIST:5] - таких ID нет!
✅ ПРАВИЛЬНО: смотри список ниже, бери реальный ID оттуда

Примеры БЕЗ карточек (отвечай текстом):
Пользователь: "Как записаться на приём?"
Ответ: "Записаться можно несколькими способами:
📞 По телефону: [номер]
🌐 Через сайт
📍 Лично по адресу: [адрес]"

Пользователь: "Какой у вас адрес?"
Ответ: "Мы находимся по адресу: [адрес]. Работаем [часы работы]."

Пользователь: "Что взять с собой на приём?"
Ответ: "На приём рекомендуем взять: паспорт, результаты предыдущих обследований (если есть), список принимаемых лекарств."

ВАЖНЫЕ ПРАВИЛА:
1. Отвечай на вопросы о клинике, услугах, специалистах, контактах, записи на приём
2. НЕ давай медицинских советов и не ставь диагнозы - рекомендуй записаться к врачу
3. НЕ рассказывай про админ-панель или внутренние системы
4. Будь вежливым, дружелюбным и профессиональным
5. Отвечай на русском языке
6. Если не знаешь ответа - предложи позвонить в клинику

ИНФОРМАЦИЯ О КЛИНИКЕ:

Контакты:
- Телефон: ${clinicData.contacts?.phone_number || "информация недоступна"}
${clinicData.contacts?.phone_number_sec ? `- Дополнительный телефон: ${clinicData.contacts.phone_number_sec}` : ""}
- Email: ${clinicData.contacts?.email || "информация недоступна"}
- Адрес: ${clinicData.contacts?.address || "информация недоступна"}
- Режим работы: ${clinicData.contacts?.work_hours_main || "Пн-Сб 09:00-20:00"}
- Воскресенье: ${clinicData.contacts?.work_hours_sunday || "10:00-18:00"}

Наши услуги:
${servicesText || "Информация загружается..."}

Наши специалисты:
${specialistsText || "Информация загружается..."}

ИНФОРМАЦИЯ ДЛЯ ПАЦИЕНТОВ:

Как записаться на приём:
- По телефону: ${clinicData.contacts?.phone_number || "уточните на сайте"}
- Через сайт клиники
- Лично в клинике по адресу: ${clinicData.contacts?.address || "уточните на сайте"}

Что взять с собой на первый приём:
- Паспорт или документ, удостоверяющий личность
- Результаты предыдущих обследований и анализов (если есть)
- Список принимаемых лекарств
- Медицинскую карту из другой клиники (если есть)

Подготовка к приёму:
- На УЗИ органов брюшной полости - натощак (не есть 6-8 часов)
- На анализы крови - натощак (не есть 8-12 часов)
- На приём к гинекологу - стандартная гигиена
- На стоматологический приём - почистить зубы

Оплата:
- Наличными в кассе клиники
- Банковской картой
- Безналичный расчёт для организаций

Помни: если пациент спрашивает про симптомы или лечение - НЕ давай медицинских советов, а рекомендуй записаться к соответствующему специалисту.`;
}

export async function POST(request: NextRequest) {
  try {
    console.log("Chat API: Starting request...");

    // Проверяем подключение к Prisma
    try {
      await prisma.$connect();
      console.log("Chat API: Prisma connected ✓");
    } catch (dbError) {
      console.error("Chat API: Prisma connection failed:", dbError);
    }

    if (!OPENROUTER_API_KEY) {
      console.error("Chat API: OpenRouter API key is not configured");
      return NextResponse.json(
        { error: "OpenRouter API key not configured. Please add OPENROUTER_API_KEY to your .env file." },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log("Chat API: Request body received");

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.error("Chat API: Invalid messages format", messages);
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    console.log("Chat API: Fetching clinic context...");
    // Получаем контекст клиники
    const clinicData = await getClinicContext();

    // Если не удалось загрузить данные, используем базовую информацию
    const finalClinicData = clinicData || {
      contacts: {
        phone_number: "+375(29)161-01-01",
        email: "smartmedical.by@gmail.com",
        address: "г. Минск, пр. Победителей, д. 119, пом. 504",
        work_hours_main: "Пн-Сб 09:00-20:00",
        work_hours_sunday: "Вс 10:00-18:00",
      },
      services: [],
      specialists: [],
    };

    if (!clinicData) {
      console.warn("Chat API: Using fallback clinic data (DB connection failed)");
    }

    console.log("Chat API: Building system prompt...");
    // Создаём системный промпт
    const systemPrompt = buildSystemPrompt(finalClinicData);

    console.log("Chat API: Sending request to OpenRouter...");
    // Отправляем запрос в OpenRouter
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Doctor Family Medical Clinic",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    console.log("Chat API: OpenRouter response status:", response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter API error:", error);
      return NextResponse.json(
        { error: `Failed to get response from AI: ${error.substring(0, 100)}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat API: OpenRouter response received");

    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      console.error("Chat API: No message in response", data);
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    console.log("Chat API: Parsing cards in message...");
    const { message: cleanMessage, cards } = await parseCardsInMessage(assistantMessage);
    console.log("Chat API: Found cards:", cards.length);

    // Удаляем плейсхолдеры карточек из сообщения
    let finalMessage = cleanMessage;
    cards.forEach((card) => {
      finalMessage = finalMessage.replace(card.placeholder, "");
    });
    finalMessage = finalMessage.trim();

    console.log("Chat API: Success!");
    return NextResponse.json({
      message: finalMessage,
      cards: cards,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
