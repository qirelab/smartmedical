import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data in dependency order
  await prisma.question.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.service.deleteMany();
  await prisma.specialist.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.category.deleteMany();
  await prisma.vacancy.deleteMany();
  await prisma.contacts.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.material.deleteMany();

  // Categories
  const dentistry = await prisma.category.create({
    data: {
      name: 'Стоматология',
      slug: 'dentistry' 
    }
  });

  const pediatricDentistry = await prisma.category.create({
    data: {
      name: 'Детская стоматология',
      slug: 'pediatric-dentistry'
    }
  });

  const gynecology = await prisma.category.create({
    data: {
      name: 'Гинекология',
      slug: 'gynecology'
    }
  });

  const ultrasound = await prisma.category.create({
    data: {
      name: 'УЗИ',
      slug: 'ultrasound'
    }
  });

  const diagnostics = await prisma.category.create({
    data: {
      name: 'Диагностика',
      slug: 'diagnostics'
    }
  });

  const cardiology = await prisma.category.create({
    data: {
      name: 'Кардиология',
      slug: 'cardiology'
    }
  });

  const pediatricGynecology = await prisma.category.create({
    data: {
      name: 'Детская гинекология',
      slug: 'pediatric-gynecology'
    }
  });

  const endocrinology = await prisma.category.create({
    data: {
      name: 'Эндокринология',
      slug: 'endocrinology'
    }
  });

  const oncology = await prisma.category.create({
    data: {
      name: 'Онкология',
      slug: 'oncology'
    }
  });

  const dayHospital = await prisma.category.create({
    data: {
      name: 'Дневной стационар',
      slug: 'day-hospital'
    }
  });

  // Specialists
  const specialistIvanov = await prisma.specialist.create({
    data: {
      category_id: dentistry.id,
      name: 'Иванов Иван Иванович',
      specialization: 'Стоматолог-терапевт',
      qualification: 'Врач высшей категории',
      experience: 10,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585598/smartmedical/specialists/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      activity_area: 'Лечение кариеса, реставрация зубов',
      education_details: 'МГМСУ, интернатура по терапевтической стоматологии',
      conferences: 'StomExpo 2023, DentalTech 2024',
      specializations: [
        'Лечение кариеса',
        'Реставрация зубов',
        'Эндодонтическое лечение',
        'Профессиональная гигиена'
      ],
      education: [
        'МГМСУ им. А.И. Евдокимова, стоматологический факультет, 2013г.',
        'Интернатура по терапевтической стоматологии, 2014г.',
        'Курсы повышения квалификации по эндодонтии, 2020г.'
      ],
      work_examples: [
        {
          title: 'Эстетическая реставрация фронтальных зубов',
          images: [
            'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_caries_1.jpg',
            'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_caries_2.jpg'
          ]
        }
      ]
    }
  });

  const specialistPetrova = await prisma.specialist.create({
    data: {
      category_id: cardiology.id,
      name: 'Петрова Анна Сергеевна',
      specialization: 'Кардиолог',
      qualification: 'Кандидат медицинских наук',
      experience: 12,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585602/smartmedical/specialists/smiling-brunette-woman-with-crossed-arms-looking-camera-gray_171337-987.jpg',
      activity_area: 'Диагностика и лечение сердечно-сосудистых заболеваний',
      education_details: 'РНИМУ им. Пирогова, ординатура по кардиологии',
      conferences: 'CardioForum 2024',
      specializations: [
        'Диагностика сердечно-сосудистых заболеваний',
        'Эхокардиография',
        'Лечение артериальной гипертензии',
        'Реабилитация после инфаркта'
      ],
      education: [
        'РНИМУ им. Н.И. Пирогова, лечебный факультет, 2011г.',
        'Ординатура по кардиологии, 2013г.',
        'Кандидатская диссертация по кардиологии, 2018г.'
      ]
    }
  });

  // Дополнительные специалисты
  const specialistSidorova = await prisma.specialist.create({
    data: {
      category_id: pediatricDentistry.id,
      name: 'Сидорова Елена Викторовна',
      specialization: 'Детский стоматолог',
      qualification: 'Врач высшей категории',
      experience: 8,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585603/smartmedical/specialists/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg',
      activity_area: 'Лечение молочных и постоянных зубов у детей',
      education_details: 'БГМУ, интернатура по детской стоматологии',
      conferences: 'PediatricDent 2023, KidsDental 2024',
      specializations: [
        'Лечение молочных зубов',
        'Профилактика кариеса у детей',
        'Лечение пульпита у детей',
        'Герметизация фиссур'
      ],
      education: [
        'БГМУ, стоматологический факультет, 2015г.',
        'Интернатура по детской стоматологии, 2016г.',
        'Курсы повышения квалификации по детской анестезиологии, 2020г.'
      ]
    }
  });

  const specialistKozlov = await prisma.specialist.create({
    data: {
      category_id: gynecology.id,
      name: 'Козлов Дмитрий Александрович',
      specialization: 'Врач-гинеколог',
      qualification: 'Врач первой категории',
      experience: 6,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585600/smartmedical/specialists/portrait-white-man-isolated_53876-40306.jpg',
      activity_area: 'Диагностика и лечение гинекологических заболеваний',
      education_details: 'БГМУ, ординатура по акушерству и гинекологии',
      conferences: 'GynecForum 2023',
      specializations: [
        'Лечение воспалительных заболеваний',
        'Гормональные нарушения',
        'Планирование семьи',
        'УЗИ в гинекологии'
      ],
      education: [
        'БГМУ, лечебный факультет, 2017г.',
        'Ординатура по акушерству и гинекологии, 2019г.',
        'Курсы повышения квалификации по УЗИ-диагностике, 2022г.'
      ]
    }
  });

  const specialistVolkova = await prisma.specialist.create({
    data: {
      category_id: ultrasound.id,
      name: 'Волкова Ольга Петровна',
      specialization: 'Врач УЗИ-диагностики',
      qualification: 'Врач высшей категории',
      experience: 15,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585602/smartmedical/specialists/smiling-brunette-woman-with-crossed-arms-looking-camera-gray_171337-987.jpg',
      activity_area: 'УЗИ всех органов и систем',
      education_details: 'БГМУ, специальность по ультразвуковой диагностике',
      conferences: 'UltrasoundExpert 2023, USGConference 2024',
      specializations: [
        'УЗИ органов брюшной полости',
        'УЗИ органов малого таза',
        'УЗИ молочных желез',
        'УЗИ щитовидной железы',
        'УЗИ сердца'
      ],
      education: [
        'БГМУ, лечебный факультет, 2008г.',
        'Специализация по ультразвуковой диагностике, 2010г.',
        'Курсы повышения квалификации по эхокардиографии, 2015г.'
      ]
    }
  });

  // Специалист для диагностики
  const specialistDiagnostics = await prisma.specialist.create({
    data: {
      category_id: diagnostics.id,
      name: 'Соколов Андрей Викторович',
      specialization: 'Врач-диагност',
      qualification: 'Врач высшей категории',
      experience: 12,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585599/smartmedical/specialists/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg',
      activity_area: 'Лабораторная диагностика, рентгенология, функциональная диагностика',
      education_details: 'БГМУ, специальность по диагностике',
      conferences: 'DiagnosticsForum 2023, LabTech 2024',
      specializations: [
        'Лабораторная диагностика',
        'Рентгенология',
        'Функциональная диагностика',
        'УЗИ-диагностика',
        '3D-диагностика'
      ],
      education: [
        'БГМУ, лечебный факультет, 2011г.',
        'Специализация по диагностике, 2013г.',
        'Курсы повышения квалификации по 3D-диагностике, 2020г.'
      ]
    }
  });

  // Дополнительные специалисты для детской стоматологии
  const specialistPediatricSurgeon = await prisma.specialist.create({
    data: {
      category_id: pediatricDentistry.id,
      name: 'Михайлов Сергей Николаевич',
      specialization: 'Детский хирург-стоматолог',
      qualification: 'Врач высшей категории',
      experience: 9,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585598/smartmedical/specialists/young-bearded-man-with-striped-shirt_273609-5677.jpg',
      activity_area: 'Хирургическое лечение молочных и постоянных зубов у детей',
      education_details: 'БГМУ, интернатура по детской хирургической стоматологии',
      conferences: 'PediatricDentSurgery 2023, KidsDentalSurgery 2024',
      specializations: [
        'Удаление молочных зубов',
        'Удаление постоянных зубов у детей',
        'Пластика уздечек',
        'Лечение травм зубов у детей'
      ],
      education: [
        'БГМУ, стоматологический факультет, 2014г.',
        'Интернатура по детской хирургической стоматологии, 2015г.',
        'Курсы повышения квалификации по детской анестезиологии, 2021г.'
      ]
    }
  });

  const specialistPediatricOrthodontist = await prisma.specialist.create({
    data: {
      category_id: pediatricDentistry.id,
      name: 'Новикова Екатерина Александровна',
      specialization: 'Детский ортодонт',
      qualification: 'Врач первой категории',
      experience: 7,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585603/smartmedical/specialists/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg',
      activity_area: 'Исправление прикуса у детей, установка брекет-систем',
      education_details: 'БГМУ, интернатура по ортодонтии',
      conferences: 'OrthodontKids 2023, PediatricOrtho 2024',
      specializations: [
        'Исправление прикуса у детей',
        'Установка брекет-систем',
        'Лечение скученности зубов',
        'Коррекция аномалий прикуса'
      ],
      education: [
        'БГМУ, стоматологический факультет, 2016г.',
        'Интернатура по ортодонтии, 2017г.',
        'Курсы повышения квалификации по современным брекет-системам, 2022г.'
      ]
    }
  });

  // Специалисты для новых категорий
  const specialistPediatricGynecologist = await prisma.specialist.create({
    data: {
      category_id: pediatricGynecology.id,
      name: 'Белова Наталья Сергеевна',
      specialization: 'Детский гинеколог',
      qualification: 'Врач высшей категории',
      experience: 14,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585602/smartmedical/specialists/smiling-brunette-woman-with-crossed-arms-looking-camera-gray_171337-987.jpg',
      activity_area: 'Гинекологическое наблюдение девочек и подростков',
      education_details: 'БГМУ, ординатура по детской гинекологии',
      conferences: 'PediatricGynec 2023, KidsHealth 2024',
      specializations: [
        'Гинекологический осмотр девочек',
        'Лечение воспалительных заболеваний',
        'Нарушения менструального цикла',
        'Консультации для подростков'
      ],
      education: [
        'БГМУ, лечебный факультет, 2009г.',
        'Ординатура по детской гинекологии, 2011г.',
        'Курсы повышения квалификации по подростковой гинекологии, 2020г.'
      ]
    }
  });

  const specialistEndocrinologist = await prisma.specialist.create({
    data: {
      category_id: endocrinology.id,
      name: 'Морозов Алексей Владимирович',
      specialization: 'Врач-эндокринолог',
      qualification: 'Кандидат медицинских наук',
      experience: 11,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585600/smartmedical/specialists/portrait-white-man-isolated_53876-40306.jpg',
      activity_area: 'Диагностика и лечение эндокринных заболеваний',
      education_details: 'БГМУ, ординатура по эндокринологии',
      conferences: 'EndocrineConf 2023, DiabetesExpo 2024',
      specializations: [
        'Сахарный диабет',
        'Заболевания щитовидной железы',
        'Ожирение и метаболический синдром',
        'Гормональные нарушения'
      ],
      education: [
        'БГМУ, лечебный факультет, 2012г.',
        'Ординатура по эндокринологии, 2014г.',
        'Защита кандидатской диссертации, 2019г.'
      ]
    }
  });

  const specialistOncologist = await prisma.specialist.create({
    data: {
      category_id: oncology.id,
      name: 'Федорова Ирина Михайловна',
      specialization: 'Врач-онколог',
      qualification: 'Врач высшей категории',
      experience: 18,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585603/smartmedical/specialists/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg',
      activity_area: 'Диагностика и лечение онкологических заболеваний',
      education_details: 'БГМУ, ординатура по онкологии',
      conferences: 'OncologyForum 2023, CancerResearch 2024',
      specializations: [
        'Диагностика онкозаболеваний',
        'Химиотерапия',
        'Паллиативная помощь',
        'Профилактика рака'
      ],
      education: [
        'БГМУ, лечебный факультет, 2005г.',
        'Ординатура по онкологии, 2007г.',
        'Курсы повышения квалификации по химиотерапии, 2022г.'
      ]
    }
  });

  const specialistDayHospital = await prisma.specialist.create({
    data: {
      category_id: dayHospital.id,
      name: 'Кузнецова Марина Андреевна',
      specialization: 'Врач-терапевт дневного стационара',
      qualification: 'Врач первой категории',
      experience: 9,
      grade: 5,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585602/smartmedical/specialists/smiling-brunette-woman-with-crossed-arms-looking-camera-gray_171337-987.jpg',
      activity_area: 'Ведение пациентов в дневном стационаре',
      education_details: 'БГМУ, ординатура по терапии',
      conferences: 'DayClinic 2023, Therapy 2024',
      specializations: [
        'Внутривенная терапия',
        'Наблюдение пациентов',
        'Реабилитация',
        'Подготовка к операциям'
      ],
      education: [
        'БГМУ, лечебный факультет, 2014г.',
        'Ординатура по терапии, 2016г.',
        'Курсы повышения квалификации по интенсивной терапии, 2021г.'
      ]
    }
  });

  // Partners
  await prisma.partner.createMany({
    data: [
      {
        category_id: dentistry.id,
        image_url: '/images/partner_swiss.jpg',
        name: 'SwissDental',
        description: 'Поставщик стоматологических материалов премиум-класса',
        number: 1,
        website_url: 'https://swissdental.example.com'
      },
      {
        category_id: pediatricDentistry.id,
        image_url: '/images/partner_kids_dental.jpg',
        name: 'KidsDental',
        description: 'Специализированные материалы для детской стоматологии',
        number: 2,
        website_url: 'https://kidsdental.example.com'
      },
      {
        category_id: gynecology.id,
        image_url: '/images/partner_gynec.jpg',
        name: 'GynecTech',
        description: 'Современное гинекологическое оборудование и инструменты',
        number: 3,
        website_url: 'https://gynectech.example.com'
      },
      {
        category_id: ultrasound.id,
        image_url: '/images/partner_ultrasound.jpg',
        name: 'UltraSound Pro',
        description: 'Экспертное ультразвуковое оборудование для диагностики',
        number: 4,
        website_url: 'https://ultrasoundpro.example.com'
      },
      {
        category_id: diagnostics.id,
        image_url: '/images/partner_diagnostics.jpg',
        name: 'Diagnostics Plus',
        description: 'Лабораторное оборудование и диагностические системы',
        number: 5,
        website_url: 'https://diagnosticsplus.example.com'
      },
      {
        category_id: cardiology.id,
        image_url: '/images/partner_cardio.jpg',
        name: 'CardioTech',
        description: 'Инновационное кардиологическое оборудование',
        number: 6,
        website_url: 'https://cardiotech.example.com'
      }
    ]
  });

  // Services
  const serviceCaries = await prisma.service.create({
    data: {
      title: 'Лечение кариеса',
      subtitle: 'Щадящие методики и современные материалы',
      price: 4500,
      video_url: 'https://videos.example.com/dentistry/caries',
      description:
        'Комплексное лечение кариеса с использованием микроскопа и композитных материалов последнего поколения. Индивидуальный подход и безболезненная анестезия.',
      specialists_id: specialistIvanov.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_1.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585606/smartmedical/services/service_2.jpg',
      image_url_2: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585614/smartmedical/services/service_4.jpg',
      image_url_4: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585628/smartmedical/services/service_5.jpg',
      questions_id: 0, // legacy field in schema, not used as relation
      reviews_id: 0, // legacy field in schema, not used as relation
      category_id: dentistry.id
    }
  });

  const serviceEcho = await prisma.service.create({
    data: {
      title: 'ЭХО-КГ (УЗИ сердца)',
      subtitle: 'Высокоточная диагностика сердечных заболеваний',
      price: 3500,
      video_url: 'https://videos.example.com/cardiology/echo',
      description:
        'Эхокардиография на современном аппарате экспертного класса. Расширенная оценка структуры и функции сердца, заключение специалиста.',
      specialists_id: specialistPetrova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585629/smartmedical/services/service_6.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585630/smartmedical/services/service_7.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585631/smartmedical/services/service_8.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585629/smartmedical/services/service_6.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: cardiology.id
    }
  });

  // Дополнительные услуги
  const serviceMilkTeeth = await prisma.service.create({
    data: {
      title: 'Лечение молочных зубов',
      subtitle: 'Безболезненное лечение для детей',
      price: 2500,
      video_url: 'https://videos.example.com/pediatric-dentistry/milk-teeth',
      description:
        'Специализированное лечение молочных зубов у детей с использованием современных методик и материалов. Безболезненная анестезия, игровая форма приема. Сохранение молочных зубов важно для правильного формирования постоянного прикуса.',
      specialists_id: specialistSidorova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585606/smartmedical/services/service_2.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585636/smartmedical/services/service_11.jpg',
      image_url_2: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&q=80',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_1.jpg',
      image_url_4: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_milk_teeth_4.jpg',
      questions_id: 0,
      reviews_id: 0,
      category_id: pediatricDentistry.id
    }
  });

  const serviceTeethWhitening = await prisma.service.create({
    data: {
      title: 'Отбеливание зубов Beyond Polus',
      subtitle: 'Профессиональное отбеливание за один визит',
      price: 8500,
      video_url: 'https://videos.example.com/dentistry/whitening',
      description:
        'Современная система отбеливания Beyond Polus позволяет осветлить зубы на несколько тонов за один визит. Используется холодный свет, что исключает перегрев тканей зуба. Безболезненная процедура, результат сохраняется до 2-3 лет при соблюдении рекомендаций.',
      specialists_id: specialistIvanov.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585628/smartmedical/services/service_5.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_1.jpg',
      image_url_2: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585614/smartmedical/services/service_4.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: dentistry.id
    }
  });

  const serviceProfessionalCleaning = await prisma.service.create({
    data: {
      title: 'Профессиональная чистка зубов Air Flow',
      subtitle: 'Удаление налета и зубного камня',
      price: 3500,
      video_url: 'https://videos.example.com/dentistry/cleaning',
      description:
        'Профессиональная чистка зубов методом Air Flow эффективно удаляет зубной налет, пигментацию и зубной камень. Процедура безопасна, безболезненна и не повреждает эмаль. После чистки зубы становятся светлее, глаже и здоровее.',
      specialists_id: specialistIvanov.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585634/smartmedical/services/service_10.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585606/smartmedical/services/service_2.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585636/smartmedical/services/service_11.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585628/smartmedical/services/service_5.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: dentistry.id
    }
  });

  const serviceGynecologist = await prisma.service.create({
    data: {
      title: 'Приём гинеколога',
      subtitle: 'Комплексное обследование и консультация',
      price: 5500,
      video_url: 'https://videos.example.com/gynecology/appointment',
      description:
        'Полный гинекологический осмотр, консультация специалиста, взятие анализов. Врач проведет осмотр, ответит на все вопросы, назначит необходимые обследования. Ведение беременности, лечение гинекологических заболеваний, планирование семьи.',
      specialists_id: specialistKozlov.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585637/smartmedical/services/service_12.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_gynecologist_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_gynecologist_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_gynecologist_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: gynecology.id
    }
  });

  const servicePelvicUltrasound = await prisma.service.create({
    data: {
      title: 'УЗИ органов малого таза',
      subtitle: 'Точная диагностика гинекологических заболеваний',
      price: 4000,
      video_url: 'https://videos.example.com/ultrasound/pelvic',
      description:
        'Ультразвуковое исследование органов малого таза на современном аппарате экспертного класса. Оценка состояния матки, яичников, мочевого пузыря. Безболезненное и безопасное исследование, не требует специальной подготовки.',
      specialists_id: specialistVolkova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585638/smartmedical/services/service_13.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pelvic_ultrasound_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pelvic_ultrasound_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pelvic_ultrasound_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: ultrasound.id
    }
  });

  const serviceBreastUltrasound = await prisma.service.create({
    data: {
      title: 'УЗИ молочных желез',
      subtitle: 'Ранняя диагностика заболеваний груди',
      price: 3800,
      video_url: 'https://videos.example.com/ultrasound/breast',
      description:
        'Ультразвуковое исследование молочных желез для ранней диагностики заболеваний. Безопасный и информативный метод обследования. Рекомендуется женщинам всех возрастов для профилактики и выявления патологий на ранних стадиях.',
      specialists_id: specialistVolkova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585639/smartmedical/services/service_14.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_breast_ultrasound_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_breast_ultrasound_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_breast_ultrasound_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: ultrasound.id
    }
  });

  const serviceThyroidUltrasound = await prisma.service.create({
    data: {
      title: 'УЗИ щитовидной железы',
      subtitle: 'Оценка структуры и функции щитовидной железы',
      price: 3200,
      video_url: 'https://videos.example.com/ultrasound/thyroid',
      description:
        'Ультразвуковое исследование щитовидной железы для оценки ее структуры, размеров и выявления патологических изменений. Безболезненное и безопасное исследование, не требует специальной подготовки. Результаты готовы сразу после исследования.',
      specialists_id: specialistVolkova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585640/smartmedical/services/service_15.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_thyroid_ultrasound_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_thyroid_ultrasound_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_thyroid_ultrasound_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: ultrasound.id
    }
  });

  const servicePulpitis = await prisma.service.create({
    data: {
      title: 'Лечение пульпита',
      subtitle: 'Эндодонтическое лечение с использованием микроскопа',
      price: 6500,
      video_url: 'https://videos.example.com/dentistry/pulpitis',
      description:
        'Лечение пульпита (воспаления нерва зуба) с использованием современного микроскопа и новейших методик. Тщательная обработка каналов, качественная пломбировка. Сохранение зуба и восстановление его функции. Безболезненная процедура с современной анестезией.',
      specialists_id: specialistIvanov.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_1.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pulpitis_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pulpitis_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pulpitis_3.jpg',
      image_url_4: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pulpitis_4.jpg',
      questions_id: 0,
      reviews_id: 0,
      category_id: dentistry.id
    }
  });

  // Дополнительные услуги для детской стоматологии
  const servicePediatricSurgeon = await prisma.service.create({
    data: {
      title: 'Детский хирург-стоматолог',
      subtitle: 'Хирургическое лечение зубов у детей',
      price: 5500,
      video_url: 'https://videos.example.com/pediatric-dentistry/surgeon',
      description:
        'Хирургическое лечение молочных и постоянных зубов у детей. Удаление зубов, пластика уздечек, лечение травм зубов. Безболезненные процедуры с использованием современной детской анестезии. Опытные врачи найдут подход к каждому ребенку.',
      specialists_id: specialistPediatricSurgeon.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585634/smartmedical/services/service_10.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_surgeon_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_surgeon_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_surgeon_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: pediatricDentistry.id
    }
  });

  const servicePediatricOrthodontist = await prisma.service.create({
    data: {
      title: 'Детский ортодонт',
      subtitle: 'Исправление прикуса у детей',
      price: 7500,
      video_url: 'https://videos.example.com/pediatric-dentistry/orthodontist',
      description:
        'Исправление прикуса у детей с использованием современных брекет-систем и ортодонтических аппаратов. Лечение скученности зубов, коррекция аномалий прикуса. Индивидуальный подход к каждому ребенку, комфортное лечение.',
      specialists_id: specialistPediatricOrthodontist.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585606/smartmedical/services/service_2.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_orthodontist_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_orthodontist_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_orthodontist_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: pediatricDentistry.id
    }
  });

  const serviceMilkTeethAnesthesia = await prisma.service.create({
    data: {
      title: 'Лечение молочных зубов под наркозом',
      subtitle: 'Безболезненное лечение для самых маленьких',
      price: 12000,
      video_url: 'https://videos.example.com/pediatric-dentistry/anesthesia',
      description:
        'Лечение молочных зубов под общим наркозом для детей, которые не могут перенести лечение в обычных условиях. Безопасный медицинский наркоз, полный контроль состояния ребенка. За одно посещение можно вылечить все проблемные зубы.',
      specialists_id: specialistSidorova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585636/smartmedical/services/service_11.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_milk_teeth_anesthesia_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_milk_teeth_anesthesia_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_milk_teeth_anesthesia_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: pediatricDentistry.id
    }
  });

  // Дополнительные услуги для гинекологии
  const serviceDiagnosticStudies = await prisma.service.create({
    data: {
      title: 'Диагностические исследования',
      subtitle: 'Комплексная диагностика гинекологических заболеваний',
      price: 6000,
      video_url: 'https://videos.example.com/gynecology/diagnostic',
      description:
        'Комплексные диагностические исследования в гинекологии: кольпоскопия, биопсия, цитология, анализы на инфекции. Современное оборудование, точная диагностика. Помогаем выявить заболевания на ранних стадиях.',
      specialists_id: specialistKozlov.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585642/smartmedical/services/service_16.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_diagnostic_studies_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_diagnostic_studies_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_diagnostic_studies_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: gynecology.id
    }
  });

  // Дополнительные услуги для УЗИ
  const serviceAbdominalUltrasound = await prisma.service.create({
    data: {
      title: 'УЗИ органов брюшной полости',
      subtitle: 'Комплексное обследование органов брюшной полости',
      price: 4200,
      video_url: 'https://videos.example.com/ultrasound/abdominal',
      description:
        'Ультразвуковое исследование органов брюшной полости: печень, желчный пузырь, поджелудочная железа, селезенка, почки. Безболезненное и безопасное исследование. Точная диагностика заболеваний органов брюшной полости.',
      specialists_id: specialistVolkova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585638/smartmedical/services/service_13.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_abdominal_ultrasound_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_abdominal_ultrasound_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_abdominal_ultrasound_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: ultrasound.id
    }
  });

  const serviceFetalUltrasound = await prisma.service.create({
    data: {
      title: 'УЗИ плода',
      subtitle: 'Ультразвуковое исследование при беременности',
      price: 4500,
      video_url: 'https://videos.example.com/ultrasound/fetal',
      description:
        'Ультразвуковое исследование плода при беременности. Оценка развития плода, определение пола, выявление патологий. Безопасное исследование для матери и ребенка. Современное оборудование экспертного класса.',
      specialists_id: specialistVolkova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585637/smartmedical/services/service_12.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_fetal_ultrasound_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_fetal_ultrasound_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_fetal_ultrasound_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: ultrasound.id
    }
  });

  // Услуги для диагностики
  const serviceExpertUltrasound = await prisma.service.create({
    data: {
      title: 'Экспертное УЗИ',
      subtitle: 'УЗИ-диагностика экспертного уровня',
      price: 5000,
      video_url: 'https://videos.example.com/diagnostics/expert-ultrasound',
      description:
        'Экспертное ультразвуковое исследование на аппарате экспертного класса. Высокая точность диагностики, детальная оценка состояния органов. Проводится опытными специалистами с использованием современного оборудования.',
      specialists_id: specialistDiagnostics.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585639/smartmedical/services/service_14.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_expert_ultrasound_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_expert_ultrasound_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_expert_ultrasound_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: diagnostics.id
    }
  });

  const serviceAnalyses = await prisma.service.create({
    data: {
      title: 'Лабораторные анализы',
      subtitle: 'Комплексная лабораторная диагностика',
      price: 3500,
      video_url: 'https://videos.example.com/diagnostics/analyses',
      description:
        'Широкий спектр лабораторных анализов: общий анализ крови, биохимия, гормоны, онкомаркеры, инфекции. Современная лаборатория, точные результаты. Быстрое выполнение анализов, удобная система получения результатов.',
      specialists_id: specialistDiagnostics.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585643/smartmedical/services/service_17.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_analyses_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_analyses_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_analyses_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: diagnostics.id
    }
  });

  const serviceToothXray = await prisma.service.create({
    data: {
      title: 'Рентген зубов',
      subtitle: 'Рентгенологическое исследование зубов',
      price: 1500,
      video_url: 'https://videos.example.com/diagnostics/tooth-xray',
      description:
        'Рентгенологическое исследование зубов для диагностики кариеса, пульпита, периодонтита. Прицельные и панорамные снимки. Низкая доза облучения, безопасно для здоровья. Необходимо для точной диагностики и планирования лечения.',
      specialists_id: specialistDiagnostics.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585609/smartmedical/services/service_3.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_tooth_xray_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_tooth_xray_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_tooth_xray_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: diagnostics.id
    }
  });

  const service3DDentalScan = await prisma.service.create({
    data: {
      title: '3D сканирование зубов',
      subtitle: 'Трехмерное сканирование для точной диагностики',
      price: 5500,
      video_url: 'https://videos.example.com/diagnostics/3d-scan',
      description:
        'Трехмерное сканирование зубов с помощью компьютерной томографии. Точная диагностика, планирование имплантации, оценка состояния корней зубов. Высокое качество изображений, минимальная доза облучения.',
      specialists_id: specialistDiagnostics.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585614/smartmedical/services/service_4.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_3d_dental_scan_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_3d_dental_scan_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_3d_dental_scan_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: diagnostics.id
    }
  });

  const servicePanoramicDentalScan = await prisma.service.create({
    data: {
      title: 'Панорамный снимок зубов',
      subtitle: 'Ортопантомограмма (ОПТГ)',
      price: 2500,
      video_url: 'https://videos.example.com/diagnostics/panoramic-scan',
      description:
        'Панорамный снимок всех зубов (ортопантомограмма) для оценки состояния зубов, челюстей, височно-нижнечелюстных суставов. Необходим для планирования лечения, имплантации, ортодонтического лечения. Быстрое выполнение, низкая доза облучения.',
      specialists_id: specialistDiagnostics.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_1.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_panoramic_scan_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_panoramic_scan_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_panoramic_scan_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: diagnostics.id
    }
  });

  // Услуги для детской гинекологии
  const servicePediatricGynecologist = await prisma.service.create({
    data: {
      title: 'Детский гинеколог',
      subtitle: 'Специализированная помощь для девочек и подростков',
      price: 5500,
      video_url: 'https://videos.example.com/pediatric-gynecology/appointment',
      description:
        'Консультация детского гинеколога для девочек и подростков. Профилактические осмотры, диагностика и лечение гинекологических заболеваний. Деликатный и профессиональный подход к маленьким пациенткам.',
      specialists_id: specialistPediatricGynecologist.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585637/smartmedical/services/service_12.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_gyn_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_gyn_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_pediatric_gyn_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: pediatricGynecology.id
    }
  });

  // Услуги для эндокринологии
  const serviceEndocrinologistAppointment = await prisma.service.create({
    data: {
      title: 'Консультация врача-эндокринолога',
      subtitle: 'Диагностика и лечение эндокринных заболеваний',
      price: 6000,
      video_url: 'https://videos.example.com/endocrinology/appointment',
      description:
        'Консультация эндокринолога с комплексной диагностикой. Лечение сахарного диабета, заболеваний щитовидной железы, ожирения и метаболического синдрома. Индивидуальный подбор терапии.',
      specialists_id: specialistEndocrinologist.id,
      image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_endocrinology_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_endocrinology_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_endocrinology_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: endocrinology.id
    }
  });

  // Услуги для онкологии
  const serviceOncologistAppointment = await prisma.service.create({
    data: {
      title: 'Приём врача онколога',
      subtitle: 'Профилактика и диагностика онкологических заболеваний',
      price: 7500,
      video_url: 'https://videos.example.com/oncology/appointment',
      description:
        'Консультация онколога с оценкой факторов риска, ранняя диагностика, скрининг. Профессиональная оценка новообразований, назначение обследований. Составление плана наблюдения и лечения при необходимости.',
      specialists_id: specialistOncologist.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585639/smartmedical/services/service_14.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_oncology_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_oncology_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_oncology_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: oncology.id
    }
  });

  // Услуги для дневного стационара
  const serviceProcedureRoom = await prisma.service.create({
    data: {
      title: 'Процедурный кабинет',
      subtitle: 'Медицинские процедуры в дневном стационаре',
      price: 2500,
      video_url: 'https://videos.example.com/day-hospital/procedure',
      description:
        'Инъекции, капельницы, внутривенные инфузии в комфортных условиях дневного стационара. Квалифицированный медперсонал, современное оборудование, контроль состояния пациента во время процедур.',
      specialists_id: specialistDayHospital.id,
      image_url: 'https://images.unsplash.com/photo-1631217868264-e6641e0e2055?w=800&q=80',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_procedure_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_procedure_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_procedure_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: dayHospital.id
    }
  });

  // Дополнительные услуги для кардиологии
  const serviceCardiologistAppointment = await prisma.service.create({
    data: {
      title: 'Приём кардиолога',
      subtitle: 'Комплексная консультация кардиолога',
      price: 6500,
      video_url: 'https://videos.example.com/cardiology/appointment',
      description:
        'Консультация кардиолога с оценкой состояния сердечно-сосудистой системы. Анализ жалоб, осмотр, интерпретация результатов исследований. Назначение лечения и рекомендации по профилактике.',
      specialists_id: specialistPetrova.id,
      image_url: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585629/smartmedical/services/service_6.jpg',
      image_url_1: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_cardiology_1.jpg',
      image_url_2: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_cardiology_2.jpg',
      image_url_3: 'https://res.cloudinary.com/dkee0i6u7/image/upload/v1763585605/smartmedical/services/service_cardiology_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: cardiology.id
    }
  });

  // Questions for services
  await prisma.question.createMany({
    data: [
      // Вопросы для лечения кариеса
      {
        question: 'Больно ли лечить кариес?',
        answer: 'Мы используем современную анестезию, поэтому лечение проходит комфортно. Пациент не испытывает болезненных ощущений во время процедуры.',
        service_id: serviceCaries.id
      },
      {
        question: 'Сколько длится процедура?',
        answer: 'В среднем 40–60 минут в зависимости от сложности случая. Простое лечение может занять 30 минут, сложное – до 90 минут.',
        service_id: serviceCaries.id
      },
      {
        question: 'Как долго прослужит пломба?',
        answer: 'Современные композитные пломбы служат 5–7 лет при правильном уходе. Мы используем материалы премиум-класса с гарантией качества.',
        service_id: serviceCaries.id
      },
      {
        question: 'Нужна ли специальная подготовка?',
        answer: 'Специальная подготовка не требуется. Рекомендуется поесть перед визитом, чтобы снизить чувствительность к анестезии.',
        service_id: serviceCaries.id
      },
      // Вопросы для ЭХО-КГ
      {
        question: 'Нужна ли подготовка к ЭХО-КГ?',
        answer: 'Специальная подготовка не требуется, исследование безопасно и безболезненно. Можно принимать пищу и лекарства как обычно.',
        service_id: serviceEcho.id
      },
      {
        question: 'Сколько длится исследование?',
        answer: 'Исследование занимает 30–40 минут. Время может варьироваться в зависимости от сложности случая.',
        service_id: serviceEcho.id
      },
      {
        question: 'Когда будут готовы результаты?',
        answer: 'Результаты готовы сразу после исследования. Врач проведет консультацию и объяснит результаты.',
        service_id: serviceEcho.id
      },
      // Вопросы для лечения молочных зубов
      {
        question: 'Больно ли лечить молочные зубы?',
        answer: 'Нет, мы используем специальную детскую анестезию и игровую форму приема. Лечение проходит комфортно и безболезненно для ребенка.',
        service_id: serviceMilkTeeth.id
      },
      {
        question: 'Нужн лечить молочные зубы, если они выпадут?',
        answer: 'Да, обязательно. Больные молочные зубы могут повредить зачатки постоянных зубов и вызвать проблемы с прикусом в будущем.',
        service_id: serviceMilkTeeth.id
      },
      {
        question: 'С какого возраста можно лечить зубы ребенку?',
        answer: 'Лечение возможно с момента прорезывания первых зубов. Наши врачи работают с детьми от 1 года.',
        service_id: serviceMilkTeeth.id
      },
      {
        question: 'Как подготовить ребенка к визиту?',
        answer: 'Расскажите ребенку о визите в игровой форме, объясните, что врач поможет зубкам быть здоровыми. Не пугайте ребенка стоматологом.',
        service_id: serviceMilkTeeth.id
      },
      // Вопросы для отбеливания зубов
      {
        question: 'Больно ли отбеливание зубов?',
        answer: 'Процедура безболезненна. Возможна легкая чувствительность после процедуры, которая проходит в течение 24–48 часов.',
        service_id: serviceTeethWhitening.id
      },
      {
        question: 'На сколько тонов можно осветлить зубы?',
        answer: 'За один визит можно осветлить зубы на 3–5 тонов. Результат зависит от исходного цвета зубов и индивидуальных особенностей.',
        service_id: serviceTeethWhitening.id
      },
      {
        question: 'Как долго сохраняется результат?',
        answer: 'Результат сохраняется 2–3 года при соблюдении рекомендаций врача: ограничение курения, кофе, чая, красного вина.',
        service_id: serviceTeethWhitening.id
      },
      {
        question: 'Есть ли противопоказания?',
        answer: 'Противопоказания: беременность, кормление грудью, повышенная чувствительность зубов, наличие пломб на фронтальных зубах.',
        service_id: serviceTeethWhitening.id
      },
      // Вопросы для профессиональной чистки
      {
        question: 'Больно ли делать профессиональную чистку?',
        answer: 'Процедура безболезненна и комфортна. При повышенной чувствительности используется аппликационная анестезия.',
        service_id: serviceProfessionalCleaning.id
      },
      {
        question: 'Как часто нужно делать чистку?',
        answer: 'Рекомендуется делать профессиональную чистку 2 раза в год для поддержания здоровья зубов и десен.',
        service_id: serviceProfessionalCleaning.id
      },
      {
        question: 'Повреждает ли чистка эмаль?',
        answer: 'Нет, процедура безопасна для эмали. Используются мягкие абразивы и современные методики, которые не повреждают зубную эмаль.',
        service_id: serviceProfessionalCleaning.id
      },
      // Вопросы для приема гинеколога
      {
        question: 'Как подготовиться к приему гинеколога?',
        answer: 'За 2 дня до приема исключить половые контакты. Накануне вечером провести гигиену наружных половых органов. Прийти натощак, если планируется УЗИ.',
        service_id: serviceGynecologist.id
      },
      {
        question: 'Что входит в прием?',
        answer: 'В прием входит: осмотр, консультация, взятие анализов (мазки, цитология), назначение лечения или дополнительных обследований.',
        service_id: serviceGynecologist.id
      },
      {
        question: 'Сколько длится прием?',
        answer: 'Прием длится 30–40 минут. Время может варьироваться в зависимости от необходимости дополнительных обследований.',
        service_id: serviceGynecologist.id
      },
      // Вопросы для УЗИ органов малого таза
      {
        question: 'Нужна ли подготовка к УЗИ органов малого таза?',
        answer: 'Да, требуется подготовка: за 2–3 дня исключить газообразующие продукты, накануне вечером легкий ужин, утром натощак. При трансвагинальном УЗИ специальная подготовка не требуется.',
        service_id: servicePelvicUltrasound.id
      },
      {
        question: 'На какой день цикла лучше делать УЗИ?',
        answer: 'Для оценки состояния матки и яичников лучше делать УЗИ на 5–7 день цикла. Для контроля овуляции – на 12–14 день.',
        service_id: servicePelvicUltrasound.id
      },
      {
        question: 'Больно ли делать УЗИ?',
        answer: 'Нет, процедура безболезненна и безопасна. Возможен легкий дискомфорт при трансвагинальном УЗИ.',
        service_id: servicePelvicUltrasound.id
      },
      // Вопросы для УЗИ молочных желез
      {
        question: 'На какой день цикла лучше делать УЗИ молочных желез?',
        answer: 'Лучше делать УЗИ молочных желез на 5–10 день менструального цикла, когда грудь менее чувствительна.',
        service_id: serviceBreastUltrasound.id
      },
      {
        question: 'Нужна ли подготовка к УЗИ молочных желез?',
        answer: 'Специальная подготовка не требуется. Рекомендуется надеть удобную одежду, которую легко снять.',
        service_id: serviceBreastUltrasound.id
      },
      {
        question: 'Как часто нужно делать УЗИ молочных желез?',
        answer: 'Рекомендуется делать УЗИ молочных желез 1 раз в год для профилактики и ранней диагностики заболеваний.',
        service_id: serviceBreastUltrasound.id
      },
      // Вопросы для УЗИ щитовидной железы
      {
        question: 'Нужна ли подготовка к УЗИ щитовидной железы?',
        answer: 'Специальная подготовка не требуется. Можно принимать пищу и лекарства как обычно.',
        service_id: serviceThyroidUltrasound.id
      },
      {
        question: 'Как часто нужно делать УЗИ щитовидной железы?',
        answer: 'Рекомендуется делать УЗИ щитовидной железы 1 раз в год для контроля состояния, при наличии проблем – по назначению врача.',
        service_id: serviceThyroidUltrasound.id
      },
      // Вопросы для лечения пульпита
      {
        question: 'Больно ли лечить пульпит?',
        answer: 'Нет, мы используем современную анестезию, поэтому лечение проходит безболезненно. Пациент не испытывает неприятных ощущений.',
        service_id: servicePulpitis.id
      },
      {
        question: 'Сколько визитов потребуется?',
        answer: 'Обычно лечение пульпита требует 2–3 визитов в зависимости от сложности случая. Первый визит – диагностика и лечение, второй – пломбировка каналов.',
        service_id: servicePulpitis.id
      },
      {
        question: 'Что будет, если не лечить пульпит?',
        answer: 'Если не лечить пульпит, воспаление может перейти на корень зуба, что приведет к периодонтиту и возможной потере зуба.',
        service_id: servicePulpitis.id
      },
      // Вопросы для детского хирурга-стоматолога
      {
        question: 'Больно ли удалять молочные зубы?',
        answer: 'Нет, мы используем современную детскую анестезию, поэтому процедура проходит безболезненно. Врач найдет подход к каждому ребенку.',
        service_id: servicePediatricSurgeon.id
      },
      {
        question: 'С какого возраста можно удалять зубы ребенку?',
        answer: 'Удаление молочных зубов возможно с момента их прорезывания. Врач оценит необходимость удаления и проведет процедуру безопасно.',
        service_id: servicePediatricSurgeon.id
      },
      // Вопросы для детского ортодонта
      {
        question: 'С какого возраста можно ставить брекеты ребенку?',
        answer: 'Ортодонтическое лечение обычно начинается с 7-8 лет, когда начинают прорезываться постоянные зубы. Врач определит оптимальный возраст для начала лечения.',
        service_id: servicePediatricOrthodontist.id
      },
      {
        question: 'Сколько длится ортодонтическое лечение?',
        answer: 'Длительность лечения зависит от сложности случая и обычно составляет 1-2 года. Врач составит индивидуальный план лечения.',
        service_id: servicePediatricOrthodontist.id
      },
      // Вопросы для лечения под наркозом
      {
        question: 'Безопасен ли наркоз для детей?',
        answer: 'Да, мы используем современный безопасный медицинский наркоз. Ребенок находится под постоянным контролем анестезиолога. Процедура полностью безопасна.',
        service_id: serviceMilkTeethAnesthesia.id
      },
      {
        question: 'Как подготовить ребенка к лечению под наркозом?',
        answer: 'За 6 часов до процедуры нельзя есть, за 2 часа - пить. Врач даст подробные инструкции по подготовке. Ребенок должен быть здоров.',
        service_id: serviceMilkTeethAnesthesia.id
      },
      // Вопросы для диагностических исследований
      {
        question: 'Что входит в диагностические исследования?',
        answer: 'В комплекс входит: кольпоскопия, биопсия, цитология, анализы на инфекции. Врач определит необходимый объем исследований индивидуально.',
        service_id: serviceDiagnosticStudies.id
      },
      {
        question: 'Больно ли делать биопсию?',
        answer: 'Биопсия проводится под местной анестезией, поэтому процедура безболезненна. Возможен легкий дискомфорт после процедуры, который быстро проходит.',
        service_id: serviceDiagnosticStudies.id
      },
      // Вопросы для УЗИ органов брюшной полости
      {
        question: 'Нужна ли подготовка к УЗИ органов брюшной полости?',
        answer: 'Да, требуется подготовка: за 2-3 дня исключить газообразующие продукты, накануне вечером легкий ужин, утром натощак. За 2 часа до исследования можно выпить немного воды.',
        service_id: serviceAbdominalUltrasound.id
      },
      {
        question: 'Что показывает УЗИ органов брюшной полости?',
        answer: 'Исследование позволяет оценить состояние печени, желчного пузыря, поджелудочной железы, селезенки, почек, выявить патологические изменения.',
        service_id: serviceAbdominalUltrasound.id
      },
      // Вопросы для УЗИ плода
      {
        question: 'На каком сроке беременности лучше делать УЗИ?',
        answer: 'Рекомендуется делать УЗИ на 11-13 неделе (первый скрининг), 18-22 неделе (второй скрининг) и 32-34 неделе (третий скрининг). Врач определит оптимальные сроки.',
        service_id: serviceFetalUltrasound.id
      },
      {
        question: 'Безопасно ли УЗИ для плода?',
        answer: 'Да, УЗИ абсолютно безопасно для плода и матери. Это стандартный метод диагностики при беременности, не имеющий противопоказаний.',
        service_id: serviceFetalUltrasound.id
      },
      // Вопросы для экспертного УЗИ
      {
        question: 'Чем отличается экспертное УЗИ от обычного?',
        answer: 'Экспертное УЗИ проводится на аппарате экспертного класса с более высоким разрешением. Проводится опытными специалистами, дает более детальную информацию.',
        service_id: serviceExpertUltrasound.id
      },
      // Вопросы для лабораторных анализов
      {
        question: 'Как подготовиться к сдаче анализов?',
        answer: 'Большинство анализов сдается натощак (не есть 8-12 часов). За день до сдачи исключить алкоголь, жирную пищу. Врач даст индивидуальные рекомендации.',
        service_id: serviceAnalyses.id
      },
      {
        question: 'Сколько времени делаются анализы?',
        answer: 'Время выполнения зависит от вида анализа. Обычные анализы готовы в течение 1-2 дней, некоторые - в день сдачи. Результаты можно получить онлайн или в клинике.',
        service_id: serviceAnalyses.id
      },
      // Вопросы для рентгена зубов
      {
        question: 'Безопасен ли рентген зубов?',
        answer: 'Да, современные рентген-аппараты используют минимальную дозу облучения. Один снимок безопасен и не оказывает негативного влияния на здоровье.',
        service_id: serviceToothXray.id
      },
      {
        question: 'Как часто можно делать рентген зубов?',
        answer: 'Рентген можно делать по необходимости. Врач назначает снимки только когда это необходимо для диагностики. Современные аппараты безопасны.',
        service_id: serviceToothXray.id
      },
      // Вопросы для 3D сканирования
      {
        question: 'Зачем нужно 3D сканирование зубов?',
        answer: '3D сканирование необходимо для точной диагностики, планирования имплантации, оценки состояния корней зубов. Дает полную трехмерную картину.',
        service_id: service3DDentalScan.id
      },
      {
        question: 'Безопасно ли 3D сканирование?',
        answer: 'Да, современные аппараты используют минимальную дозу облучения. Процедура безопасна и необходима для точной диагностики и планирования лечения.',
        service_id: service3DDentalScan.id
      },
      // Вопросы для панорамного снимка
      {
        question: 'Что показывает панорамный снимок?',
        answer: 'Панорамный снимок показывает все зубы, челюсти, височно-нижнечелюстные суставы. Необходим для планирования лечения, имплантации, ортодонтии.',
        service_id: servicePanoramicDentalScan.id
      },
      {
        question: 'Как часто нужно делать панорамный снимок?',
        answer: 'Обычно панорамный снимок делается один раз в год или по необходимости при планировании лечения. Врач определит необходимость.',
        service_id: servicePanoramicDentalScan.id
      }
    ]
  });

  // Feedbacks for services
  await prisma.feedback.createMany({
    data: [
      // Отзывы для лечения кариеса
      {
        name: 'Мария Иванова',
        text: 'Отличная клиника! Лечение кариеса прошло быстро и без боли. Врач очень внимательный, всё объяснил. Пломба выглядит отлично, не видно, что она там есть.',
        date: new Date('2024-03-12'),
        grade: 5,
        image_url: '/images/avatars/maria.jpg',
        service_id: serviceCaries.id
      },
      {
        name: 'Дмитрий Петров',
        text: 'Очень доволен лечением. Врач профессионал, использовал микроскоп, что говорит о качестве работы. Безболезненная процедура, рекомендую!',
        date: new Date('2024-03-20'),
        grade: 5,
        image_url: '/images/avatars/dmitry.jpg',
        service_id: serviceCaries.id
      },
      {
        name: 'Елена Смирнова',
        text: 'Пришла с болью, ушла без боли. Лечение прошло быстро, врач всё сделал аккуратно. Спасибо за профессионализм!',
        date: new Date('2024-04-01'),
        grade: 5,
        image_url: '/images/avatars/elena.jpg',
        service_id: serviceCaries.id
      },
      // Отзывы для ЭХО-КГ
      {
        name: 'Алексей Козлов',
        text: 'Грамотный кардиолог, всё подробно объяснила. Результаты исследования готовы сразу, врач провел консультацию. Рекомендую!',
        date: new Date('2024-04-05'),
        grade: 5,
        image_url: '/images/avatars/alexey.jpg',
        service_id: serviceEcho.id
      },
      {
        name: 'Наталья Волкова',
        text: 'Очень профессиональный врач. Исследование провели на современном аппарате, всё объяснили подробно. Чувствую себя в безопасности.',
        date: new Date('2024-04-10'),
        grade: 5,
        image_url: '/images/avatars/natalia.jpg',
        service_id: serviceEcho.id
      },
      // Отзывы для лечения молочных зубов
      {
        name: 'Анна Соколова',
        text: 'Спасибо врачу за терпение и профессионализм! Ребенок не боялся, лечение прошло в игровой форме. Молочные зубы сохранены, всё отлично.',
        date: new Date('2024-03-15'),
        grade: 5,
        image_url: '/images/avatars/anna.jpg',
        service_id: serviceMilkTeeth.id
      },
      {
        name: 'Ольга Морозова',
        text: 'Дочка боялась стоматолога, но врач нашла подход. Лечение прошло без слез, ребенок даже не заметил, когда всё закончилось. Рекомендую!',
        date: new Date('2024-03-25'),
        grade: 5,
        image_url: '/images/avatars/olga.jpg',
        service_id: serviceMilkTeeth.id
      },
      {
        name: 'Ирина Лебедева',
        text: 'Отличный детский стоматолог! Лечение молочных зубов прошло быстро и безболезненно. Врач очень внимательная, всё объяснила ребенку и мне.',
        date: new Date('2024-04-08'),
        grade: 5,
        image_url: '/images/avatars/irina.jpg',
        service_id: serviceMilkTeeth.id
      },
      // Отзывы для отбеливания зубов
      {
        name: 'Виктория Новикова',
        text: 'Результат превзошел ожидания! Зубы стали светлее на несколько тонов. Процедура безболезненна, врач всё объяснил. Очень довольна!',
        date: new Date('2024-03-18'),
        grade: 5,
        image_url: '/images/avatars/viktoria.jpg',
        service_id: serviceTeethWhitening.id
      },
      {
        name: 'Мария Кузнецова',
        text: 'Долго думала об отбеливании, теперь не жалею. Процедура прошла комфортно, результат виден сразу. Зубы стали намного белее!',
        date: new Date('2024-03-28'),
        grade: 5,
        image_url: '/images/avatars/maria_k.jpg',
        service_id: serviceTeethWhitening.id
      },
      // Отзывы для профессиональной чистки
      {
        name: 'Сергей Орлов',
        text: 'Профессиональная чистка Air Flow - это то, что нужно! Зубы стали чище, глаже, исчез налет. Процедура безболезненна, рекомендую делать регулярно.',
        date: new Date('2024-03-22'),
        grade: 5,
        image_url: '/images/avatars/sergey.jpg',
        service_id: serviceProfessionalCleaning.id
      },
      {
        name: 'Татьяна Федорова',
        text: 'Отличная чистка! Зубы стали светлее, исчез зубной камень. Врач всё сделал аккуратно, процедура комфортна. Буду делать регулярно.',
        date: new Date('2024-04-03'),
        grade: 5,
        image_url: '/images/avatars/tatiana.jpg',
        service_id: serviceProfessionalCleaning.id
      },
      // Отзывы для приема гинеколога
      {
        name: 'Екатерина Романова',
        text: 'Очень внимательный и профессиональный врач. Прием прошел комфортно, врач ответил на все вопросы. Рекомендую для всех женщин!',
        date: new Date('2024-03-30'),
        grade: 5,
        image_url: '/images/avatars/ekaterina.jpg',
        service_id: serviceGynecologist.id
      },
      {
        name: 'Анастасия Белова',
        text: 'Отличный гинеколог! Врач очень внимательный, всё объяснил подробно. Прием прошел в комфортной обстановке, без дискомфорта.',
        date: new Date('2024-04-12'),
        grade: 5,
        image_url: '/images/avatars/anastasia.jpg',
        service_id: serviceGynecologist.id
      },
      // Отзывы для УЗИ органов малого таза
      {
        name: 'Юлия Григорьева',
        text: 'УЗИ провели на современном аппарате, врач всё объяснил. Результаты готовы сразу, врач провел консультацию. Очень довольна!',
        date: new Date('2024-04-07'),
        grade: 5,
        image_url: '/images/avatars/yulia.jpg',
        service_id: servicePelvicUltrasound.id
      },
      {
        name: 'Светлана Данилова',
        text: 'Профессиональный врач УЗИ-диагностики. Исследование прошло комфортно, врач всё объяснил подробно. Результаты точные и понятные.',
        date: new Date('2024-04-15'),
        grade: 5,
        image_url: '/images/avatars/svetlana.jpg',
        service_id: servicePelvicUltrasound.id
      },
      // Отзывы для УЗИ молочных желез
      {
        name: 'Ирина Семенова',
        text: 'УЗИ молочных желез провели быстро и профессионально. Врач всё объяснил, ответил на все вопросы. Чувствую себя в безопасности.',
        date: new Date('2024-04-02'),
        grade: 5,
        image_url: '/images/avatars/irina_s.jpg',
        service_id: serviceBreastUltrasound.id
      },
      {
        name: 'Мария Андреева',
        text: 'Очень важно делать УЗИ молочных желез регулярно. Врач профессионал, исследование прошло комфортно. Рекомендую всем женщинам!',
        date: new Date('2024-04-11'),
        grade: 5,
        image_url: '/images/avatars/maria_a.jpg',
        service_id: serviceBreastUltrasound.id
      },
      // Отзывы для УЗИ щитовидной железы
      {
        name: 'Елена Васильева',
        text: 'УЗИ щитовидной железы провели быстро. Врач всё объяснил, результаты готовы сразу. Очень довольна качеством обслуживания.',
        date: new Date('2024-04-06'),
        grade: 5,
        image_url: '/images/avatars/elena_v.jpg',
        service_id: serviceThyroidUltrasound.id
      },
      // Отзывы для лечения пульпита
      {
        name: 'Александр Новиков',
        text: 'Лечение пульпита прошло безболезненно. Врач использовал микроскоп, что говорит о качестве работы. Зуб сохранен, всё отлично!',
        date: new Date('2024-03-25'),
        grade: 5,
        image_url: '/images/avatars/alexander.jpg',
        service_id: servicePulpitis.id
      },
      {
        name: 'Дмитрий Соколов',
        text: 'Пришел с острой болью, ушел без боли. Лечение пульпита прошло быстро, врач всё сделал аккуратно. Рекомендую!',
        date: new Date('2024-04-09'),
        grade: 5,
        image_url: '/images/avatars/dmitry_s.jpg',
        service_id: servicePulpitis.id
      },
      // Отзывы для детского хирурга-стоматолога
      {
        name: 'Ольга Семенова',
        text: 'Отличный детский хирург! Удалил молочный зуб быстро и безболезненно. Ребенок даже не заметил, когда всё закончилось. Спасибо!',
        date: new Date('2024-04-14'),
        grade: 5,
        image_url: '/images/avatars/olga_s.jpg',
        service_id: servicePediatricSurgeon.id
      },
      {
        name: 'Андрей Лебедев',
        text: 'Врач профессионал, нашел подход к ребенку. Удаление прошло без слез и страха. Рекомендую всем родителям!',
        date: new Date('2024-04-18'),
        grade: 5,
        image_url: '/images/avatars/andrey.jpg',
        service_id: servicePediatricSurgeon.id
      },
      // Отзывы для детского ортодонта
      {
        name: 'Татьяна Морозова',
        text: 'Дочке поставили брекеты, врач очень внимательная. Всё объяснила, показала, как ухаживать. Ребенок доволен, лечение идет хорошо.',
        date: new Date('2024-04-10'),
        grade: 5,
        image_url: '/images/avatars/tatiana_m.jpg',
        service_id: servicePediatricOrthodontist.id
      },
      {
        name: 'Игорь Волков',
        text: 'Сын начал ортодонтическое лечение. Врач профессионал, всё делается аккуратно. Уже видны первые результаты. Рекомендую!',
        date: new Date('2024-04-16'),
        grade: 5,
        image_url: '/images/avatars/igor.jpg',
        service_id: servicePediatricOrthodontist.id
      },
      // Отзывы для лечения под наркозом
      {
        name: 'Елена Ковалева',
        text: 'Лечение под наркозом прошло отлично! Ребенок не испугался, всё прошло быстро. Врачи профессионалы, всё под контролем. Спасибо!',
        date: new Date('2024-04-12'),
        grade: 5,
        image_url: '/images/avatars/elena_k.jpg',
        service_id: serviceMilkTeethAnesthesia.id
      },
      {
        name: 'Сергей Новиков',
        text: 'Дочке вылечили все зубы за один раз под наркозом. Безопасно, быстро, качественно. Ребенок не помнит процедуру, что очень хорошо. Рекомендую!',
        date: new Date('2024-04-20'),
        grade: 5,
        image_url: '/images/avatars/sergey_n.jpg',
        service_id: serviceMilkTeethAnesthesia.id
      },
      // Отзывы для диагностических исследований
      {
        name: 'Анна Соколова',
        text: 'Прошла комплексное диагностическое исследование. Врач всё объяснил, процедуры прошли комфортно. Результаты точные, лечение назначено правильно.',
        date: new Date('2024-04-13'),
        grade: 5,
        image_url: '/images/avatars/anna_s.jpg',
        service_id: serviceDiagnosticStudies.id
      },
      {
        name: 'Мария Петрова',
        text: 'Очень довольна диагностикой. Врач внимательный, всё сделал аккуратно. Ранняя диагностика помогла выявить проблему вовремя. Спасибо!',
        date: new Date('2024-04-17'),
        grade: 5,
        image_url: '/images/avatars/maria_p.jpg',
        service_id: serviceDiagnosticStudies.id
      },
      // Отзывы для УЗИ органов брюшной полости
      {
        name: 'Владимир Иванов',
        text: 'УЗИ органов брюшной полости провели быстро и профессионально. Врач всё объяснил, результаты готовы сразу. Очень доволен!',
        date: new Date('2024-04-15'),
        grade: 5,
        image_url: '/images/avatars/vladimir.jpg',
        service_id: serviceAbdominalUltrasound.id
      },
      {
        name: 'Наталья Сидорова',
        text: 'Отличное УЗИ! Врач профессионал, исследование прошло комфортно. Результаты точные, всё объяснили подробно. Рекомендую!',
        date: new Date('2024-04-19'),
        grade: 5,
        image_url: '/images/avatars/natalia_s.jpg',
        service_id: serviceAbdominalUltrasound.id
      },
      // Отзывы для УЗИ плода
      {
        name: 'Юлия Козлова',
        text: 'УЗИ плода провели на современном аппарате. Врач всё показала, объяснила. Видели малыша, это незабываемые эмоции! Очень довольна!',
        date: new Date('2024-04-11'),
        grade: 5,
        image_url: '/images/avatars/yulia_k.jpg',
        service_id: serviceFetalUltrasound.id
      },
      {
        name: 'Екатерина Волкова',
        text: 'Отличное УЗИ при беременности! Врач профессионал, всё объяснила, показала. Ребенок развивается хорошо. Спасибо за внимательность!',
        date: new Date('2024-04-21'),
        grade: 5,
        image_url: '/images/avatars/ekaterina_v.jpg',
        service_id: serviceFetalUltrasound.id
      },
      // Отзывы для экспертного УЗИ
      {
        name: 'Александр Петров',
        text: 'Экспертное УЗИ провели на аппарате экспертного класса. Очень детальное исследование, врач всё объяснил. Результаты точные, рекомендую!',
        date: new Date('2024-04-14'),
        grade: 5,
        image_url: '/images/avatars/alexander_p.jpg',
        service_id: serviceExpertUltrasound.id
      },
      // Отзывы для лабораторных анализов
      {
        name: 'Ольга Новикова',
        text: 'Сдала анализы, всё быстро и качественно. Результаты получила онлайн, очень удобно. Лаборатория современная, результаты точные.',
        date: new Date('2024-04-13'),
        grade: 5,
        image_url: '/images/avatars/olga_n.jpg',
        service_id: serviceAnalyses.id
      },
      {
        name: 'Дмитрий Козлов',
        text: 'Отличная лаборатория! Анализы готовы быстро, результаты точные. Удобная система получения результатов онлайн. Рекомендую!',
        date: new Date('2024-04-17'),
        grade: 5,
        image_url: '/images/avatars/dmitry_k.jpg',
        service_id: serviceAnalyses.id
      },
      // Отзывы для рентгена зубов
      {
        name: 'Ирина Смирнова',
        text: 'Рентген зубов сделали быстро. Современный аппарат, низкая доза облучения. Результаты помогли врачу точно поставить диагноз. Спасибо!',
        date: new Date('2024-04-12'),
        grade: 5,
        image_url: '/images/avatars/irina_sm.jpg',
        service_id: serviceToothXray.id
      },
      // Отзывы для 3D сканирования
      {
        name: 'Андрей Федоров',
        text: '3D сканирование помогло точно спланировать имплантацию. Качественные снимки, врач всё объяснил. Очень доволен результатом!',
        date: new Date('2024-04-15'),
        grade: 5,
        image_url: '/images/avatars/andrey_f.jpg',
        service_id: service3DDentalScan.id
      },
      {
        name: 'Елена Орлова',
        text: 'Отличное 3D сканирование! Трехмерная картина помогла врачу точно диагностировать проблему. Современное оборудование, профессионализм врачей.',
        date: new Date('2024-04-18'),
        grade: 5,
        image_url: '/images/avatars/elena_o.jpg',
        service_id: service3DDentalScan.id
      },
      // Отзывы для панорамного снимка
      {
        name: 'Сергей Морозов',
        text: 'Панорамный снимок сделали быстро. Видно все зубы, челюсти. Помог врачу спланировать лечение. Удобно и информативно!',
        date: new Date('2024-04-16'),
        grade: 5,
        image_url: '/images/avatars/sergey_m.jpg',
        service_id: servicePanoramicDentalScan.id
      },
      {
        name: 'Татьяна Лебедева',
        text: 'Отличный панорамный снимок! Врач всё объяснил, показал проблемные места. Необходим для планирования ортодонтического лечения. Рекомендую!',
        date: new Date('2024-04-19'),
        grade: 5,
        image_url: '/images/avatars/tatiana_l.jpg',
        service_id: servicePanoramicDentalScan.id
      }
    ]
  });

  // Vacancies
  await prisma.vacancy.createMany({
    data: [
      {
        name: 'Медицинская сестра (кардиология)',
        category: 'Кардиология',
        description: 'Помощь врачу-кардиологу в диагностике и лечении пациентов. Подготовка кабинета и оборудования, выполнение инъекций, измерение давления, проведение ЭКГ.',
        payment: 1800,
        experience: 2,
        requirements: 'Среднее медицинское образование, действующий сертификат. Опыт работы от 2 лет. Знание работы с медицинским оборудованием.'
      },
      {
        name: 'Стоматолог-ортопед',
        category: 'Стоматология',
        description: 'Протезирование зубов, работа с имплантами, диагностика и планирование лечения. Изготовление и установка ортопедических конструкций.',
        payment: 3500,
        experience: 5,
        requirements: 'Высшее медицинское образование по специальности "Стоматология", ординатура по ортопедической стоматологии. Опыт работы от 5 лет.'
      },
      {
        name: 'Врач-гинеколог',
        category: 'Гинекология',
        description: 'Консультирование пациентов, проведение гинекологических осмотров, диагностика и лечение заболеваний женской репродуктивной системы.',
        payment: 3200,
        experience: 3,
        requirements: 'Высшее медицинское образование, ординатура по акушерству и гинекологии. Сертификат специалиста. Опыт работы от 3 лет.'
      },
      {
        name: 'Детский стоматолог',
        category: 'Детская стоматология',
        description: 'Лечение молочных и постоянных зубов у детей, профилактика кариеса, обучение правильной гигиене полости рта.',
        payment: 2900,
        experience: 2,
        requirements: 'Высшее медицинское образование по специальности "Стоматология", специализация по детской стоматологии. Умение работать с детьми.'
      },
      {
        name: 'Врач УЗИ-диагностики',
        category: 'УЗИ',
        description: 'Проведение ультразвуковых исследований всех органов и систем организма. Интерпретация результатов, написание заключений.',
        payment: 2700,
        experience: 3,
        requirements: 'Высшее медицинское образование, сертификат по ультразвуковой диагностике. Опыт работы от 3 лет. Знание современного УЗИ-оборудования.'
      },
      {
        name: 'Администратор клиники',
        category: 'Администрация',
        description: 'Работа с пациентами на ресепшене, ведение записи к врачам, консультирование по услугам клиники, оформление документов.',
        payment: 1500,
        experience: 1,
        requirements: 'Высшее образование, грамотная речь, знание ПК. Коммуникабельность, стрессоустойчивость. Опыт работы в медицинских учреждениях приветствуется.'
      },
      {
        name: 'Лаборант',
        category: 'Диагностика',
        description: 'Проведение лабораторных исследований крови, мочи и других биоматериалов. Работа с современным лабораторным оборудованием.',
        payment: 1400,
        experience: 1,
        requirements: 'Среднее специальное медицинское образование, специальность "Лабораторная диагностика". Опыт работы в лаборатории от 1 года.'
      },
      {
        name: 'Врач-эндодонтист',
        category: 'Стоматология',
        description: 'Лечение корневых каналов зубов, эндодонтическая хирургия. Работа с дентальным микроскопом, перелечивание сложных каналов.',
        payment: 3800,
        experience: 4,
        requirements: 'Высшее медицинское образование по стоматологии, специализация по эндодонтии. Опыт работы от 4 лет. Обязательный опыт работы с микроскопом.'
      },
      {
        name: 'Врач-кардиолог',
        category: 'Кардиология',
        description: 'Диагностика и лечение заболеваний сердечно-сосудистой системы. Проведение ЭКГ, ЭХО-КГ, холтеровского мониторирования.',
        payment: 3300,
        experience: 5,
        requirements: 'Высшее медицинское образование, ординатура по кардиологии. Сертификат специалиста. Опыт работы от 5 лет. Знание функциональной диагностики.'
      },
      {
        name: 'Стоматолог-терапевт',
        category: 'Стоматология',
        description: 'Лечение кариеса и его осложнений, реставрация зубов, профессиональная гигиена полости рта, отбеливание зубов.',
        payment: 3000,
        experience: 2,
        requirements: 'Высшее медицинское образование по специальности "Стоматология". Сертификат специалиста. Опыт работы от 2 лет.'
      },
      {
        name: 'Врач-эндокринолог',
        category: 'Эндокринология',
        description: 'Диагностика и лечение заболеваний эндокринной системы. Ведение пациентов с сахарным диабетом, заболеваниями щитовидной железы.',
        payment: 3100,
        experience: 3,
        requirements: 'Высшее медицинское образование, ординатура по эндокринологии. Сертификат специалиста. Опыт работы от 3 лет.'
      },
      {
        name: 'Медицинская сестра (процедурная)',
        category: 'Медицинский персонал',
        description: 'Выполнение внутривенных и внутримышечных инъекций, забор крови на анализы, постановка капельниц.',
        payment: 1600,
        experience: 1,
        requirements: 'Среднее медицинское образование, сертификат. Опыт работы от 1 года. Уверенные навыки постановки инъекций.'
      },
      {
        name: 'Менеджер по работе с клиентами',
        category: 'Администрация',
        description: 'Привлечение новых пациентов, работа с базой клиентов, консультирование по услугам клиники, организация маркетинговых мероприятий.',
        payment: 2000,
        experience: 2,
        requirements: 'Высшее образование, опыт работы в продажах или маркетинге от 2 лет. Коммуникабельность, стрессоустойчивость.'
      },
      {
        name: 'Врач-онколог',
        category: 'Онкология',
        description: 'Диагностика онкологических заболеваний, консультирование пациентов, разработка планов лечения, проведение химиотерапии.',
        payment: 3600,
        experience: 5,
        requirements: 'Высшее медицинское образование, ординатура по онкологии. Сертификат специалиста. Опыт работы от 5 лет в онкологии.'
      },
      {
        name: 'Стоматолог-хирург',
        category: 'Стоматология',
        description: 'Удаление зубов, имплантация, костная пластика, удаление новообразований полости рта.',
        payment: 3400,
        experience: 4,
        requirements: 'Высшее медицинское образование по стоматологии, специализация по хирургической стоматологии. Опыт работы от 4 лет.'
      }
    ]
  });

  // Partners
  await prisma.partner.createMany({
    data: [
      {
        category_id: dentistry.id,
        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        name: 'РНПЦ онкологии',
        description: 'Республиканский научно-практический центр онкологии и медицинской радиологии им. Н.Н. Александрова - ведущее медицинское учреждение Беларуси в области онкологии.',
        number: 1,
        website_url: 'https://oncology.by'
      },
      {
        category_id: dentistry.id,
        image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        name: 'РНПЦ спорта',
        description: 'Республиканский научно-практический центр спорта - специализированное медицинское учреждение, занимающееся спортивной медициной и реабилитацией.',
        number: 2,
        website_url: 'https://rcsport.by'
      },
      {
        category_id: diagnostics.id,
        image_url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&h=300&fit=crop',
        name: 'Helix',
        description: 'Крупнейшая частная сеть лабораторий в России и СНГ. Более 1000 видов исследований, современное оборудование, высокое качество.',
        number: 1,
        website_url: 'https://helix.ru'
      },
      {
        category_id: diagnostics.id,
        image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop',
        name: 'Invitro',
        description: 'Независимая медицинская лаборатория №1 в России. Более 1700 видов исследований. Результаты онлайн в личном кабинете.',
        number: 2,
        website_url: 'https://www.invitro.ru'
      },
      {
        category_id: gynecology.id,
        image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop',
        name: 'Белгосстрах',
        description: 'Крупнейшая страховая компания Беларуси. Полный спектр услуг медицинского страхования. Надежность и опыт с 1921 года.',
        number: 1,
        website_url: 'https://belgosstrakh.by'
      },
      {
        category_id: gynecology.id,
        image_url: 'https://images.unsplash.com/photo-1554224311-beee2c446e58?w=400&h=300&fit=crop',
        name: 'Таск',
        description: 'Страховая компания Таск - один из лидеров белорусского рынка страхования. Добровольное медицинское страхование, страхование от несчастных случаев.',
        number: 2,
        website_url: 'https://www.task.by'
      },
      {
        category_id: ultrasound.id,
        image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop',
        name: 'ДентаЛюкс',
        description: 'Современная зуботехническая лаборатория. Изготовление коронок, мостов, виниров. Цифровое моделирование, высокая точность.',
        number: 1,
        website_url: 'https://dentalux.example.by'
      },
      {
        category_id: ultrasound.id,
        image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop',
        name: 'СмайлТех',
        description: 'Профессиональная зуботехническая лаборатория полного цикла. CAD/CAM технологии, индивидуальный подход, гарантия качества.',
        number: 2,
        website_url: 'https://smiletech.example.by'
      }
    ]
  });

  // Contacts
  await prisma.contacts.create({
    data: {
      address: 'г. Минск, пр. Победителей, д. 119, пом. 504',
      map_geo: '53.9006,27.5590',
      work_hours_main: 'Пн–Сб 09:00–20:00',
      work_hours_sunday: 'Вс 10:00–18:00',
      phone_number: '+375(29)161-01-01',
      phone_number_sec: '+375(29)161-01-02',
      email: 'smartmedical.by@gmail.com'
    }
  });

  // Patients (с хешированными паролями)
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.patient.createMany({
    data: [
      {
        login: 'patient1',
        email: 'patient1@example.com',
        password: hashedPassword,
        name: 'Смирнов Пётр',
        phone: '+79001234567',
        registration_date: new Date('2024-01-15')
      },
      {
        login: 'patient2',
        email: 'patient2@example.com',
        password: hashedPassword,
        name: 'Иванова Мария',
        phone: '+79007654321',
        registration_date: new Date('2024-02-10')
      },
      {
        login: 'patient3',
        email: 'patient3@example.com',
        password: hashedPassword,
        name: 'Козлов Александр Викторович',
        phone: '+79001112233',
        registration_date: new Date('2024-03-05')
      },
      {
        login: 'patient4',
        email: 'patient4@example.com',
        password: hashedPassword,
        name: 'Новикова Елена Сергеевна',
        phone: '+79002223344',
        registration_date: new Date('2024-03-20')
      },
      {
        login: 'patient5',
        email: 'patient5@example.com',
        password: hashedPassword,
        name: 'Федоров Дмитрий Андреевич',
        phone: '+79003334455',
        registration_date: new Date('2024-04-10')
      }
    ]
  });

  // Clinic Reviews (общие отзывы клиники, без привязки к услуге)
  await prisma.feedback.createMany({
    data: [
      {
        name: 'Анна Петрова',
        text: 'Замечательная клиника! Современное оборудование, профессиональные врачи. Особенно хочу отметить детского стоматолога - ребенок впервые не боялся лечить зубы.',
        date: new Date('2025-01-15'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Дмитрий Сидоров',
        text: 'Прошел полное обследование в клинике. Очень доволен качеством услуг и отношением персонала. Все процедуры выполнены на высшем уровне.',
        date: new Date('2025-01-12'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Елена Козлова',
        text: 'Хорошая клиника с современным оборудованием. Врачи профессиональные, но иногда приходится долго ждать приема.',
        date: new Date('2025-01-10'),
        grade: 4,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Максим Иванов',
        text: 'Делал имплантацию зубов. Результат превзошел все ожидания! Врач объяснил каждый этап, процедура прошла безболезненно.',
        date: new Date('2025-01-08'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Ольга Николаева',
        text: 'Отличная гинекология! Врач очень внимательная и деликатная. Современное УЗИ оборудование дало точные результаты.',
        date: new Date('2025-01-05'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Андрей Михайлов',
        text: 'Качественное лечение, но цены немного выше среднего. В целом рекомендую клинику.',
        date: new Date('2025-01-03'),
        grade: 4,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Светлана Федорова',
        text: 'Прекрасная детская урология! Врач нашел подход к ребенку, все прошло спокойно и профессионально.',
        date: new Date('2025-01-01'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Валерий Смирнов',
        text: 'Современная диагностика, точные анализы. Персонал вежливый и профессиональный. Рекомендую!',
        date: new Date('2024-12-29'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Татьяна Белова',
        text: 'Хорошая клиника, но запись только по телефону. Хотелось бы онлайн-запись.',
        date: new Date('2024-12-27'),
        grade: 4,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Роман Тихонов',
        text: 'Отличные условия в дневном стационаре. Все процедуры выполнены качественно, персонал заботливый.',
        date: new Date('2024-12-25'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Мария Орлова',
        text: 'Эндокринолог в клинике - настоящий профессионал! Подобрал эффективное лечение, регулярно контролирует состояние.',
        date: new Date('2024-11-22'),
        grade: 5,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      },
      {
        name: 'Игорь Павлов',
        text: 'Качественная стоматология, но хотелось бы больше парковочных мест возле клиники.',
        date: new Date('2024-11-20'),
        grade: 4,
        image_url: '/images/avatars/default.jpg',
        verified: true,
        service_id: null
      }
    ]
  });

  // Clinic FAQ (общие вопросы-ответы, без привязки к услуге)
  await prisma.question.createMany({
    data: [
      // Детские зубы
      {
        question: 'Нужны ли лечить молочные зубы?',
        answer: 'Да, молочные зубы обязательно нужно лечить. Они служат "держателями места" для постоянных зубов и влияют на правильное формирование прикуса и развитие речи. Кариес молочных зубов может привести к повреждению зачатков постоянных зубов.',
        category: 'children-teeth',
        service_id: null
      },
      {
        question: 'Чем отличается наркоз от седации?',
        answer: 'Наркоз - это полное отключение сознания пациента, при котором он не чувствует боли и не помнит процедуру. Седация - это состояние расслабления и спокойствия, при котором пациент остается в сознании, но чувствует себя комфортно. Седация безопаснее для детей и часто достаточна для стоматологических процедур.',
        category: 'children-teeth',
        service_id: null
      },
      {
        question: 'Какие рекомендации после наркоза?',
        answer: 'После наркоза необходимо: наблюдать за ребенком в течение суток, обеспечить покой, давать легкую пищу, избегать горячих напитков в первые часы, контролировать температуру тела. При любых необычных симптомах следует немедленно обратиться к врачу.',
        category: 'children-teeth',
        service_id: null
      },

      // Гигиена девочек
      {
        question: 'Половое созревание девочек. Первые месячные.',
        answer: 'Половое созревание девочек обычно начинается в 8-13 лет. Первые месячные (менархе) появляются в среднем в 12-13 лет. Важно заранее подготовить девочку к этим изменениям, объяснить, что это нормальный процесс взросления.',
        category: 'girls-hygiene',
        service_id: null
      },
      {
        question: 'Как подмывать новорожденную девочку?',
        answer: 'Подмывать девочку нужно спереди назад, чтобы избежать попадания бактерий из анальной области во влагалище. Использовать теплую воду и специальные детские средства без ароматизаторов. После подмывания аккуратно промокнуть мягким полотенцем.',
        category: 'girls-hygiene',
        service_id: null
      },
      {
        question: 'Белая специальная смазка у новорождённых девочек. Что с ней делать?',
        answer: 'Первородная смазка (vernix caseosa) - это естественное защитное покрытие кожи новорожденного. Ее не нужно активно удалять, она впитается сама в течение первых дней жизни. При необходимости можно аккуратно протереть влажной салфеткой.',
        category: 'girls-hygiene',
        service_id: null
      },
      {
        question: 'Подгузники. Как часто менять? Вредны подгузники или нет?',
        answer: 'Подгузники нужно менять каждые 2-3 часа или сразу после дефекации. Современные качественные подгузники не вредны при правильном использовании. Важно выбирать подгузники по размеру, обеспечивать коже "дыхание" и регулярно проводить воздушные ванны.',
        category: 'girls-hygiene',
        service_id: null
      },
      {
        question: 'Ванночки для новорождённых. Какие лучше?',
        answer: 'Лучше использовать специальные детские ванночки из безопасных материалов. Можно добавлять отвары трав (ромашка, череда) после заживления пупочной ранки. Температура воды должна быть 36-37°C. Первые купания должны быть короткими - 5-10 минут.',
        category: 'girls-hygiene',
        service_id: null
      },
      {
        question: 'Что такое синехии. Нужно ли лечить?',
        answer: 'Синехии - это сращение малых половых губ у девочек. Встречается довольно часто в возрасте до 6 лет. Лечение назначается только при нарушении мочеиспускания или воспалительных процессах. В большинстве случаев синехии разрешаются самостоятельно.',
        category: 'girls-hygiene',
        service_id: null
      },
      {
        question: 'Изолированное телархе у девочек, что это?',
        answer: 'Изолированное телархе - это раннее увеличение молочных желез у девочек (обычно до 8 лет) без других признаков полового созревания. Чаще всего это доброкачественное состояние, которое не требует лечения, но требует наблюдения эндокринолога.',
        category: 'girls-hygiene',
        service_id: null
      },

      // Гигиена мальчиков
      {
        question: 'Фимоз у детей, как вылечить?',
        answer: 'Фимоз у детей до 3-5 лет считается физиологическим и не требует лечения. При патологическом фимозе применяют консервативное лечение (мази с кортикостероидами) или хирургическое (обрезание, пластика крайней плоти). Лечение назначает только уролог.',
        category: 'boys-hygiene',
        service_id: null
      },
      {
        question: 'Когда нужно обратиться к врачу урологу?',
        answer: 'К урологу нужно обратиться при: болезненном мочеиспускании, изменении цвета мочи, отеках, болях в животе или пояснице, нарушениях мочеиспускания, воспалительных процессах в области половых органов, подозрении на крипторхизм или фимоз.',
        category: 'boys-hygiene',
        service_id: null
      },
      {
        question: 'Гигиена мальчиков. Уход за пенисом.',
        answer: 'Ежедневно промывать теплой водой с детским мылом, не оттягивать крайнюю плоть насильно, менять белье ежедневно, следить за чистотой рук ребенка. При появлении покраснений, выделений или неприятного запаха обратиться к врачу.',
        category: 'boys-hygiene',
        service_id: null
      },

      // Половое созревание девочек
      {
        question: 'Первые месячные.',
        answer: 'Первые месячные обычно начинаются в 11-15 лет. Важно заранее подготовить девочку: объяснить, что это нормально, научить пользоваться средствами гигиены, обеспечить психологическую поддержку. В первые годы цикл может быть нерегулярным - это нормально.',
        category: 'girls-puberty',
        service_id: null
      },
      {
        question: 'Детская мастурбация. Что делать родителям?',
        answer: 'Детская мастурбация - нормальное явление в процессе развития. Не нужно ругать или стыдить ребенка. Важно переключить внимание на другие занятия, обеспечить достаточную физическую активность, при необходимости деликатно объяснить вопросы приватности.',
        category: 'girls-puberty',
        service_id: null
      },

      // Кульдоцентез
      {
        question: 'Что ожидать после процедуры кульдоцентеза?',
        answer: 'После кульдоцентеза возможны незначительные мажущие выделения в течение 1-2 дней, слабые боли внизу живота. Необходимо соблюдать покой в день процедуры, избегать физических нагрузок 2-3 дня, не принимать ванну 3-5 дней.',
        category: 'culdocentesis',
        service_id: null
      },
      {
        question: 'Подготовка к кульдоцентезу.',
        answer: 'Перед процедурой необходимо: сдать анализы крови, мочи, мазок на флору, не есть за 4-6 часов до процедуры, опорожнить мочевой пузырь, снять украшения и контактные линзы. Процедура проводится на гинекологическом кресле под местной анестезией.',
        category: 'culdocentesis',
        service_id: null
      },
      {
        question: 'Противопоказания к кульдоцентезу.',
        answer: 'Противопоказания: острые воспалительные заболевания органов малого таза, нарушения свертываемости крови, тяжелое общее состояние пациентки, отсутствие жидкости в малом тазу по данным УЗИ, некоторые анатомические особенности.',
        category: 'culdocentesis',
        service_id: null
      },

      // Стоматология
      {
        question: 'Металлические брекеты эффективнее других ортопедических систем.',
        answer: 'Металлические брекеты действительно являются одними из самых эффективных ортодонтических систем. Они обеспечивают точное перемещение зубов, подходят для лечения сложных патологий прикуса, имеют доступную стоимость и высокую прочность.',
        category: 'stomatology',
        service_id: null
      },
      {
        question: 'Вредны ли металлические брекеты?',
        answer: 'Металлические брекеты изготавливаются из медицинской стали и титана, которые биосовместимы и безопасны. Аллергические реакции крайне редки. Основные неудобства - это необходимость тщательной гигиены и возможные первоначальные дискомфорт и натирание.',
        category: 'stomatology',
        service_id: null
      },
      {
        question: 'Почему брекеты так важны?',
        answer: 'Брекеты исправляют неправильный прикус, что важно для: правильного пережевывания пищи, профилактики заболеваний ЖКТ, предотвращения развития кариеса и пародонтита, улучшения дикции, повышения самооценки и качества жизни.',
        category: 'stomatology',
        service_id: null
      },
      {
        question: 'Виды обесцвечивания зубов?',
        answer: 'Различают внешнее (от кофе, чая, курения, красящих продуктов) и внутреннее (от лекарств, травм, возрастных изменений) окрашивание зубов. Также выделяют врожденные нарушения цвета эмали и приобретенные изменения.',
        category: 'stomatology',
        service_id: null
      },
      {
        question: 'Методы профессионального отбеливания зубов?',
        answer: 'Основные методы: лазерное отбеливание, фотоотбеливание (ZOOM), химическое отбеливание в кабинете врача, домашнее отбеливание под контролем врача с использованием индивидуальных капп и профессиональных гелей.',
        category: 'stomatology',
        service_id: null
      },
      {
        question: 'Профессиональное офисное отбеливание зубов.',
        answer: 'Офисное отбеливание проводится в стоматологическом кабинете с использованием высококонцентрированных отбеливающих гелей и активирующих устройств. Процедура длится 1-2 часа, результат виден сразу, эффект сохраняется 1-3 года при правильном уходе.',
        category: 'stomatology',
        service_id: null
      },

      // Удаление полипов
      {
        question: 'Что мне нужно будет делать после возвращения домой?',
        answer: 'После полипэктомии: соблюдать покой первые 24 часа, избегать физических нагрузок 1-2 недели, не принимать ванну 3-5 дней, использовать прокладки вместо тампонов, принимать назначенные препараты, явиться на контрольный осмотр.',
        category: 'polyp-removal',
        service_id: null
      },
      {
        question: 'Восстановление после полипэктомии и профилактика.',
        answer: 'Полное восстановление занимает 2-4 недели. Для профилактики рецидивов: регулярные гинекологические осмотры, своевременное лечение воспалительных заболеваний, контроль гормонального фона, здоровый образ жизни, отказ от курения.',
        category: 'polyp-removal',
        service_id: null
      },
      {
        question: 'Можно ли предотвратить полипы шейки матки?',
        answer: 'Специфической профилактики нет, но риск можно снизить: регулярные осмотры у гинеколога, своевременное лечение инфекций, использование барьерных контрацептивов, поддержание иммунитета, отказ от курения, контроль веса.',
        category: 'polyp-removal',
        service_id: null
      },

      // УЗИ
      {
        question: 'На каком сроке можно узнать пол будущего ребёнка?',
        answer: 'Пол ребенка можно определить с 15-16 недель беременности, но наиболее достоверно - с 18-20 недель. Точность определения зависит от положения плода, опыта специалиста и качества оборудования.',
        category: 'ultrasound',
        service_id: null
      },
      {
        question: 'УЗИ во время беременности: безопасно и как часто можно делать?',
        answer: 'УЗИ безопасно для матери и плода при соблюдении медицинских показаний. Стандартно проводят 3 плановых УЗИ: в 11-14, 18-22 и 30-34 недели. Дополнительные исследования назначаются только по медицинским показаниям.',
        category: 'ultrasound',
        service_id: null
      },
      {
        question: 'Что входит в органы женского таза?',
        answer: 'К органам малого таза у женщин относятся: матка, яичники, маточные трубы, шейка матки, влагалище, мочевой пузырь, прямая кишка. При УЗИ оценивают их размеры, структуру, положение и патологические изменения.',
        category: 'ultrasound',
        service_id: null
      },
      {
        question: 'Как работает ультразвуковой аппарат?',
        answer: 'УЗИ-аппарат излучает высокочастотные звуковые волны, которые отражаются от тканей организма и возвращаются к датчику. Компьютер обрабатывает эти сигналы и создает изображение внутренних органов в режиме реального времени.',
        category: 'ultrasound',
        service_id: null
      },
      {
        question: 'Что происходит во время детского абдоминального УЗИ?',
        answer: 'Ребенок лежит на кушетке, на живот наносится специальный гель, врач водит датчиком по коже. Процедура безболезненна и длится 15-20 минут. Исследуются печень, желчный пузырь, поджелудочная железа, селезенка, почки.',
        category: 'ultrasound',
        service_id: null
      },
      {
        question: 'Есть ли какие-либо последствия детского УЗИ брюшной полости?',
        answer: 'УЗИ абсолютно безопасно для детей любого возраста, включая новорожденных. Ультразвуковые волны не оказывают вредного воздействия на организм. Процедура не имеет противопоказаний и побочных эффектов.',
        category: 'ultrasound',
        service_id: null
      },

      // Женское здоровье
      {
        question: 'Цитология обычная и жидкостная, в чём разница?',
        answer: 'Обычная цитология - традиционный мазок на стекле. Жидкостная цитология - более современный метод, при котором материал помещается в специальную жидкость. Жидкостная цитология дает более четкие результаты, позволяет дополнительно проводить ВПЧ-тестирование и снижает количество неинформативных результатов.',
        category: 'womens-health',
        service_id: null
      },

      // Выскабливание
      {
        question: 'Противопоказания к проведению раздельного диагностического выскабливания.',
        answer: 'Противопоказания: острые воспалительные заболевания половых органов, подозрение на беременность, тяжелые заболевания сердечно-сосудистой системы, нарушения свертываемости крови, общие инфекционные заболевания в острой стадии.',
        category: 'curettage',
        service_id: null
      },
      {
        question: 'Подготовка к раздельному диагностическому выскабливанию.',
        answer: 'Подготовка включает: анализы крови, мочи, мазок на флору, ЭКГ, консультацию анестезиолога, воздержание от пищи за 8-12 часов до процедуры, гигиенические процедуры, отказ от половой жизни за 3 дня до процедуры.',
        category: 'curettage',
        service_id: null
      },
      {
        question: 'Восстановление после раздельного диагностического выскабливания.',
        answer: 'После процедуры: постельный режим в день операции, исключение физических нагрузок 2 недели, запрет на половую жизнь 3-4 недели, использование прокладок вместо тампонов, прием назначенных препаратов, контрольный осмотр через 2 недели.',
        category: 'curettage',
        service_id: null
      }
    ]
  });

  // Materials (Special Offers)
  await prisma.material.createMany({
    data: [
      {
        title: 'Новогодние скидки на стоматологические услуги',
        content: 'Специальное предложение на все виды стоматологических услуг в январе',
        image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop',
        date: new Date('2025-01-15'),
        year: 2025,
        is_active: true,
      },
      {
        title: 'Комплексная диагностика со скидкой 30%',
        content: 'Полное обследование организма по специальной цене',
        image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
        date: new Date('2025-01-10'),
        year: 2025,
        is_active: true,
      },
      {
        title: 'Акция на вакцинацию',
        content: 'Скидки на все виды вакцинации для взрослых и детей',
        image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        date: new Date('2024-12-20'),
        year: 2024,
        is_active: true,
      },
      {
        title: 'Профилактические осмотры',
        content: 'Бесплатные консультации специалистов в рамках профилактики',
        image_url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop',
        date: new Date('2024-11-15'),
        year: 2024,
        is_active: true,
      },
      {
        title: 'Летние скидки на косметологию',
        content: 'Специальные цены на косметологические процедуры',
        image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
        date: new Date('2023-07-01'),
        year: 2023,
        is_active: true,
      },
      {
        title: 'Скидка 20% на УЗИ диагностику',
        content: 'Пройдите УЗИ диагностику со значительной скидкой до конца месяца',
        image_url: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=300&fit=crop',
        date: new Date('2024-10-05'),
        year: 2024,
        is_active: true,
      },
      {
        title: 'Бесплатная консультация гинеколога',
        content: 'Получите бесплатную первичную консультацию гинеколога',
        image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop',
        date: new Date('2025-02-01'),
        year: 2025,
        is_active: true,
      },
      {
        title: 'Детская стоматология: скидка 15%',
        content: 'Специальное предложение для детей до 12 лет на все стоматологические услуги',
        image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop',
        date: new Date('2024-09-10'),
        year: 2024,
        is_active: true,
      },
    ],
  });

  console.log('✅ Seed data has been inserted successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });