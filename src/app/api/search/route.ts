import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServiceSlugByTitle } from "@/utils/serviceMapping";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.trim().length < 3) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    // Проверяем авторизацию пользователя
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session?.user;

    const searchTerm = query.trim();

    // Search across all entities
    const [services, specialists, vacancies, faqs, materials, partners, contacts] = await Promise.all([
      // Search Services
      prisma.service.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { subtitle: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        include: {
          category: true,
        },
        take: 10,
      }),

      // Search Specialists
      prisma.specialist.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { specialization: { contains: searchTerm, mode: "insensitive" } },
            { qualification: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        include: {
          category: true,
        },
        take: 10,
      }),

      // Search Vacancies
      prisma.vacancy.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { category: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { requirements: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),

      // Search FAQs
      prisma.question.findMany({
        where: {
          OR: [
            { question: { contains: searchTerm, mode: "insensitive" } },
            { answer: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),

      // Search Materials (только для авторизованных пользователей)
      isAuthenticated
        ? prisma.material.findMany({
            where: {
              AND: [
                { is_active: true },
                {
                  OR: [
                    { title: { contains: searchTerm, mode: "insensitive" } },
                    { content: { contains: searchTerm, mode: "insensitive" } },
                  ],
                },
              ],
            },
            take: 10,
          })
        : Promise.resolve([]),

      // Search Partners
      prisma.partner.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        include: {
          category: true,
        },
        take: 10,
      }),

      // Search Contacts
      prisma.contacts.findMany({
        where: {
          OR: [
            { address: { contains: searchTerm, mode: "insensitive" } },
            { phone_number: { contains: searchTerm, mode: "insensitive" } },
            { phone_number_sec: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
        take: 1,
      }),
    ]);

    // Format results
    type SearchResult = {
      id: string;
      title: string;
      description: string;
      category: string;
      url: string;
      type: "service" | "specialist" | "vacancy" | "faq" | "material" | "partner" | "contact" | "patient-info";
    };

    const results: SearchResult[] = [
      ...services.map((service) => {
        // Получаем slug услуги по её названию и категории
        const serviceSlug = getServiceSlugByTitle(service.category.slug, service.title);

        // Если slug найден, используем полный URL, иначе перенаправляем на страницу услуг
        const url = serviceSlug
          ? `/services/${service.category.slug}/${serviceSlug}`
          : `/services`;

        return {
          id: `service-${service.id}`,
          title: service.title,
          description: service.description,
          category: service.category.name,
          url,
          type: "service" as const,
        };
      }),

      ...specialists.map((specialist) => ({
        id: `specialist-${specialist.id}`,
        title: specialist.name,
        description: `${specialist.specialization} • Стаж: ${specialist.experience} лет • ${specialist.qualification}`,
        category: specialist.category.name,
        url: `/doctors/${specialist.category.slug}/${specialist.id}`,
        type: "specialist" as const,
      })),

      ...vacancies.map((vacancy) => ({
        id: `vacancy-${vacancy.id}`,
        title: vacancy.name,
        description: vacancy.description,
        category: vacancy.category,
        url: "/clinic/vacancies",
        type: "vacancy" as const,
      })),

      ...faqs.map((faq) => ({
        id: `faq-${faq.id}`,
        title: faq.question,
        description: faq.answer || "Ответ скоро будет добавлен",
        category: faq.category || "Общие вопросы",
        url: "/clinic",
        type: "faq" as const,
      })),

      ...materials.map((material) => ({
        id: `material-${material.id}`,
        title: material.title,
        description: material.content,
        category: `Материалы ${material.year}`,
        url: "/account",
        type: "material" as const,
      })),

      ...partners.map((partner) => ({
        id: `partner-${partner.id}`,
        title: partner.name,
        description: partner.description,
        category: partner.category.name,
        url: "/clinic/partners",
        type: "partner" as const,
      })),

      ...contacts.map((contact) => ({
        id: `contact-${contact.id}`,
        title: "Контакты клиники",
        description: `${contact.address} • Тел: ${contact.phone_number} • Email: ${contact.email}`,
        category: "Контактная информация",
        url: "/contacts",
        type: "contact" as const,
      })),
    ];

    // Add static search results for Patient Information page
    const patientPageKeywords = [
      {
        keywords: ["запись", "приём", "прием", "записаться", "визит"],
        title: "Запись на приём",
        description: "Узнайте, как записаться на приём к специалисту, что взять с собой и правила посещения клиники",
      },
      {
        keywords: ["подготовка", "анализ", "кровь", "моча", "экг", "узи", "обследование", "сдать"],
        title: "Подготовка к анализам и обследованиям",
        description: "Рекомендации по подготовке к анализам крови, мочи, ЭКГ, УЗИ и другим обследованиям",
      },
      {
        keywords: ["документ", "договор", "согласие", "политика", "конфиденциальность", "защита данных"],
        title: "Документы и согласия",
        description: "Договор оказания услуг, политика конфиденциальности, защита персональных данных и информированное согласие",
      },
      {
        keywords: ["оплата", "цена", "стоимость", "тариф", "страховка", "страхование", "оплатить"],
        title: "Способы оплаты",
        description: "Информация о способах оплаты услуг: наличные, банковские карты, рассрочка и медицинское страхование",
      },
    ];

    const patientPageResults = patientPageKeywords
      .filter((item) =>
        item.keywords.some((keyword) =>
          keyword.includes(searchTerm.toLowerCase()) ||
          searchTerm.toLowerCase().includes(keyword)
        )
      )
      .map((item, index) => ({
        id: `patient-info-${index}`,
        title: item.title,
        description: item.description,
        category: "Информация для пациентов",
        url: "/patient",
        type: "patient-info" as const,
      }));

    results.push(...patientPageResults);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Ошибка при поиске", results: [] },
      { status: 500 }
    );
  }
}
