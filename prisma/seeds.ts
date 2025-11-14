import { PrismaClient } from '@prisma/client';

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

  // Specialists
  const specialistIvanov = await prisma.specialist.create({
    data: {
      category_id: dentistry.id,
      name: 'Иванов Иван Иванович',
      specialization: 'Стоматолог-терапевт',
      qualification: 'Врач высшей категории',
      experience: 10,
      grade: 5,
      image_url: '/images/doctor_ivanov.jpg',
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
            '/images/services/caries_1.jpg',
            '/images/services/caries_2.jpg'
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
      image_url: '/images/doctor_petrova.jpg',
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
      image_url: '/images/doctor_sidorova.jpg',
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
      image_url: '/images/doctor_kozlov.jpg',
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
      image_url: '/images/doctor_volkova.jpg',
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
      image_url: '/images/doctor_sokolov.jpg',
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
      image_url: '/images/doctor_mikhailov.jpg',
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
      image_url: '/images/doctor_novikova.jpg',
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
      image_url: '/images/services/caries_main.jpg',
      image_url_1: '/images/services/caries_1.jpg',
      image_url_2: '/images/services/caries_2.jpg',
      image_url_3: '/images/services/caries_3.jpg',
      image_url_4: '/images/services/caries_4.jpg',
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
      image_url: '/images/services/echo_main.jpg',
      image_url_1: '/images/services/echo_1.jpg',
      image_url_2: '/images/services/echo_2.jpg',
      image_url_3: '/images/services/echo_3.jpg',
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
      image_url: '/images/services/milk_teeth_main.jpg',
      image_url_1: '/images/services/milk_teeth_1.jpg',
      image_url_2: '/images/services/milk_teeth_2.jpg',
      image_url_3: '/images/services/milk_teeth_3.jpg',
      image_url_4: '/images/services/milk_teeth_4.jpg',
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
      image_url: '/images/services/whitening_main.jpg',
      image_url_1: '/images/services/whitening_1.jpg',
      image_url_2: '/images/services/whitening_2.jpg',
      image_url_3: '/images/services/whitening_3.jpg',
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
      image_url: '/images/services/cleaning_main.jpg',
      image_url_1: '/images/services/cleaning_1.jpg',
      image_url_2: '/images/services/cleaning_2.jpg',
      image_url_3: '/images/services/cleaning_3.jpg',
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
      image_url: '/images/services/gynecologist_main.jpg',
      image_url_1: '/images/services/gynecologist_1.jpg',
      image_url_2: '/images/services/gynecologist_2.jpg',
      image_url_3: '/images/services/gynecologist_3.jpg',
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
      image_url: '/images/services/pelvic_ultrasound_main.jpg',
      image_url_1: '/images/services/pelvic_ultrasound_1.jpg',
      image_url_2: '/images/services/pelvic_ultrasound_2.jpg',
      image_url_3: '/images/services/pelvic_ultrasound_3.jpg',
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
      image_url: '/images/services/breast_ultrasound_main.jpg',
      image_url_1: '/images/services/breast_ultrasound_1.jpg',
      image_url_2: '/images/services/breast_ultrasound_2.jpg',
      image_url_3: '/images/services/breast_ultrasound_3.jpg',
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
      image_url: '/images/services/thyroid_ultrasound_main.jpg',
      image_url_1: '/images/services/thyroid_ultrasound_1.jpg',
      image_url_2: '/images/services/thyroid_ultrasound_2.jpg',
      image_url_3: '/images/services/thyroid_ultrasound_3.jpg',
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
      image_url: '/images/services/pulpitis_main.jpg',
      image_url_1: '/images/services/pulpitis_1.jpg',
      image_url_2: '/images/services/pulpitis_2.jpg',
      image_url_3: '/images/services/pulpitis_3.jpg',
      image_url_4: '/images/services/pulpitis_4.jpg',
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
      image_url: '/images/services/pediatric_surgeon_main.jpg',
      image_url_1: '/images/services/pediatric_surgeon_1.jpg',
      image_url_2: '/images/services/pediatric_surgeon_2.jpg',
      image_url_3: '/images/services/pediatric_surgeon_3.jpg',
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
      image_url: '/images/services/pediatric_orthodontist_main.jpg',
      image_url_1: '/images/services/pediatric_orthodontist_1.jpg',
      image_url_2: '/images/services/pediatric_orthodontist_2.jpg',
      image_url_3: '/images/services/pediatric_orthodontist_3.jpg',
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
      image_url: '/images/services/milk_teeth_anesthesia_main.jpg',
      image_url_1: '/images/services/milk_teeth_anesthesia_1.jpg',
      image_url_2: '/images/services/milk_teeth_anesthesia_2.jpg',
      image_url_3: '/images/services/milk_teeth_anesthesia_3.jpg',
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
      image_url: '/images/services/diagnostic_studies_main.jpg',
      image_url_1: '/images/services/diagnostic_studies_1.jpg',
      image_url_2: '/images/services/diagnostic_studies_2.jpg',
      image_url_3: '/images/services/diagnostic_studies_3.jpg',
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
      image_url: '/images/services/abdominal_ultrasound_main.jpg',
      image_url_1: '/images/services/abdominal_ultrasound_1.jpg',
      image_url_2: '/images/services/abdominal_ultrasound_2.jpg',
      image_url_3: '/images/services/abdominal_ultrasound_3.jpg',
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
      image_url: '/images/services/fetal_ultrasound_main.jpg',
      image_url_1: '/images/services/fetal_ultrasound_1.jpg',
      image_url_2: '/images/services/fetal_ultrasound_2.jpg',
      image_url_3: '/images/services/fetal_ultrasound_3.jpg',
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
      image_url: '/images/services/expert_ultrasound_main.jpg',
      image_url_1: '/images/services/expert_ultrasound_1.jpg',
      image_url_2: '/images/services/expert_ultrasound_2.jpg',
      image_url_3: '/images/services/expert_ultrasound_3.jpg',
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
      image_url: '/images/services/analyses_main.jpg',
      image_url_1: '/images/services/analyses_1.jpg',
      image_url_2: '/images/services/analyses_2.jpg',
      image_url_3: '/images/services/analyses_3.jpg',
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
      image_url: '/images/services/tooth_xray_main.jpg',
      image_url_1: '/images/services/tooth_xray_1.jpg',
      image_url_2: '/images/services/tooth_xray_2.jpg',
      image_url_3: '/images/services/tooth_xray_3.jpg',
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
      image_url: '/images/services/3d_dental_scan_main.jpg',
      image_url_1: '/images/services/3d_dental_scan_1.jpg',
      image_url_2: '/images/services/3d_dental_scan_2.jpg',
      image_url_3: '/images/services/3d_dental_scan_3.jpg',
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
      image_url: '/images/services/panoramic_scan_main.jpg',
      image_url_1: '/images/services/panoramic_scan_1.jpg',
      image_url_2: '/images/services/panoramic_scan_2.jpg',
      image_url_3: '/images/services/panoramic_scan_3.jpg',
      image_url_4: null,
      questions_id: 0,
      reviews_id: 0,
      category_id: diagnostics.id
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
        question: 'Нужно ли лечить молочные зубы, если они выпадут?',
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
        description: 'Помощь врачу-кардиологу, подготовка кабинета и оборудования.',
        payment: 65000,
        experience: 2,
        requirements: 'Среднее мед. образование, действующий сертификат.'
      },
      {
        name: 'Стоматолог-ортопед',
        category: 'Стоматология',
        description: 'Протезирование, работа с имплантами, диагностика.',
        payment: 120000,
        experience: 5,
        requirements: 'Высшее мед. образование, ординатура по ортопедии.'
      }
    ]
  });

  // Contacts
  await prisma.contacts.create({
    data: {
      address: 'г. Москва, ул. Ленина, д. 10',
      map_geo: '55.7558,37.6173',
      work_hours_main: 'Пн–Сб 09:00–20:00',
      work_hours_sunday: 'Вс 10:00–18:00',
      phone_number: '+7 (495) 123-45-67',
      phone_number_sec: '+7 (495) 765-43-21',
      email: 'info@smartmedical.example.com'
    }
  });

  // Patients
  await prisma.patient.createMany({
    data: [
      {
        login: 'patient1',
        email: 'patient1@example.com',
        password: 'password123',
        name: 'Смирнов Пётр',
        phone: '+79001234567',
        registration_date: new Date('2024-01-15')
      },
      {
        login: 'patient2',
        email: 'patient2@example.com',
        password: 'password123',
        name: 'Иванова Мария',
        phone: '+79007654321',
        registration_date: new Date('2024-02-10')
      }
    ]
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