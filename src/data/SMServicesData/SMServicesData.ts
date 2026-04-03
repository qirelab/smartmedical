export interface ServiceData {
  title: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  videoUrl?: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  fullDescription: string;
  faq: Array<{ question: string; answer: string }>;
  gallery: string[];
  specialists: Array<{
    id: number;
    name: string;
    specialization: string;
    qualification: string;
    experience: number;
    grade: number;
    image_url: string;
    category?: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    text: string;
    date: string;
    image_url?: string;
  }>;
}

const serviceCategories: Record<string, string> = {
  'pediatric-dentistry': 'Детская стоматология',
  'dentistry': 'Стоматология',
  'therapeutic-dentistry': 'Терапевтическая стоматология',
  'dental-therapist-consultation': 'Консультация стоматолога-терапевта',
  'caries-treatment': 'Лечение кариеса',
  'professional-cleaning': 'Профессиональная чистка зубов',
  'tooth-restoration': 'Реставрация зубов',
  'teeth-treatment-microscope': 'Лечение зубов под микроскопом',
  'pulpitis-treatment': 'Лечение пульпита',
  'implantation': 'Имплантация',
  'implantation-general': 'Имплантация',
  'immediate-dental-implantation': 'Одномоментная дентальная имплантация',
  'all-on-4-6': 'Имплантация по протоколу All-on-4/6',
  'sinus-lift-implantation': 'Синус-лифтинг',
  'straumann-implants': 'Имплантация зубов системой Straumann',
  'neodent-implants': 'Имплантация зубов системой Neodent',
  'osstem-implants': 'Имплантация зубов системой Osstem Implant',
  'megagen-anyone-implants': 'Имплантация зубов системой MegaGen AnyOne',
  'megagen-implants': 'Имплантация зубов системой MegaGen AnyRidge',
  'orthopedics': 'Ортопедия',
  'prosthetics-general': 'Протезирование',
  'temporary-crowns': 'Временные коронки',
  'digital-prosthetics': 'Цифровое протезирование',
  'metal-ceramic-crowns': 'Металлокерамические коронки',
  'veneers': 'Виниры',
  'zirconia-crowns': 'Коронки из диоксида циркония',
  'dental-bridges': 'Мостовидные протезы',
  'dental-onlays': 'Накладки',
  'implant-supported-prosthetics': 'Протезирование на имплантах',
  'orthodontics': 'Ортодонтия',
  'orthodontist-consultation': 'Консультация стоматолога-ортодонта',
  'orthodontic-diagnostics': 'Ортодонтическая диагностика',
  'braces-installation': 'Установка брекетов',
  'orthodontic-retention-period': 'Ретенционный период',
  'pediatric-orthodontics': 'Детская ортодонтия',
  'surgery': 'Хирургия',
  'oral-surgery-general': 'Хирургия',
  'single-tooth-extraction': 'Удаление зуба',
  'wisdom-tooth-extraction': 'Удаление зуба мудрости',
  'gingival-plasty': 'Пластика десны',
  'periostotomy-pericoronotomy': 'Периостотомия, перикоронаротомия',
  'gynecology': 'Гинекология',
  'gynecologist-appointment': 'Приём врача-гинеколога',
  'colposcopy': 'Кольпоскопия шейки матки',
  'vulvoscopy': 'Вульвоскопия',
  'diagnostic-studies': 'Диагностические исследования',
  'prp-plasma-therapy': 'Плазмотерапия или PRP-терапия',
  'intimate-contouring': 'Интимная контурная пластика',
  'radiofrequency-cervical-conization': 'Радиоволновая конизация шейки матки',
  'radiofrequency-cervical-coagulation': 'Радиоволновая коагуляция шейки матки',
  'cervical-canal-polypectomy': 'Полипэктомия цервикального канала',
  'intrauterine-device': 'Внутриматочная спираль',
  'aspiration-cervical-biopsy': 'Аспирационная биопсия шейки матки',
  'targeted-cervical-biopsy': 'Прицельная биопсия шейки матки',
  'gynecology-pelvic-ultrasound': 'УЗИ органов малого таза',
  'gynecology-breast-ultrasound': 'УЗИ молочных желез',
  'pediatric-gynecology': 'Детская гинекология',
  'pediatric-urology': 'Детская урология',
  'endocrinology': 'Эндокринология',
  'oncology': 'Онкология',
  'dermatology': 'Дерматология',
  'dermatovenerologist-appointment': 'Приём врача-дерматовенеролога',
  'skin-dermoscopy': 'Дермоскопия кожи',
  'ultrasound': 'УЗИ',
  'diagnostics': 'Диагностика',
  'day-hospital': 'Дневной стационар',
  'cardiology': 'Кардиология',
  'cardiologist-appointment': 'Приём врача-кардиолога',
  'ecg': 'Электрокардиография (ЭКГ)',
  'echo-kg': 'Эхокардиография (УЗИ сердца)',
  'neurology': 'Неврология',
  'neurologist-appointment': 'Приём врача-невролога',
  'therapeutic-nerve-blocks': 'Лечебные блокады',
  'brachiocephalic-artery-ultrasound': 'УЗИ БЦА',
  'urology': 'Урология',
  'urologist-appointment': 'Приём врача-уролога',
  'urology-diagnostic-manipulations':
    'Манипуляции и исследования для диагностики и лечения урологических заболеваний',
  'prostate-rectal-examination': 'Ректальный осмотр простаты',
  'prostate-massage': 'Массаж предстательной железы',
  'prostatic-secretion-collection': 'Получение секрета',
  'therapeutic-prostate-massage': 'Лечебный массаж предстательной железы',
  'urological-surgery': 'Урологические операции',
  'hydrocele-puncture': 'Пункция гидроцеле',
  'urethral-polyp-electroresection': 'Электрорезекция полипа уретры',
  'condyloma-electroresection': 'Электрорезекция остроконечных кондилом',
  'frenulotomy': 'Рассечение короткой уздечки',
  'urology-ultrasound': 'УЗИ',
  'urology-us-kidneys-adrenals': 'Почки, надпочечники',
  'urology-us-bladder-residual':
    'Мочевой пузырь (в т.ч. с определением остаточной мочи)',
  'urology-us-prostate-bladder-transabdominal':
    'Предстательная железа с мочевым пузырем и остаточной мочью (трансабдоминально)',
  'urology-us-scrotum': 'Мошонка',
  'urology-us-penis': 'Половой член',
  'urology-us-transrectal': 'Трансректальное УЗИ',
  'pelvic-ultrasound': 'УЗИ органов малого таза',
  'breast-ultrasound': 'УЗИ молочных желез',
  'thyroid-ultrasound': 'УЗИ щитовидной железы',
  'abdominal-ultrasound': 'УЗИ органов брюшной полости',
  'ultrasound-heart': 'УЗИ сердца',
  'ultrasound-bc-arteries': 'УЗИ БЦА',
  'ultrasound-kidneys-adrenals-bladder':
    'УЗИ почек, надпочечников, мочевого пузыря',
  'ultrasound-prostate': 'УЗИ предстательной железы',
  'ultrasound-scrotum-penis': 'УЗИ мошонки, полового члена',
  'ultrasound-transrectal': 'Трансректальное УЗИ',
};

const serviceTitles: Record<string, string> = {
  'milk-teeth-treatment': 'Лечение молочных зубов',
  'pediatric-surgeon': 'Детский хирург-стоматолог',
  'pediatric-orthodontist': 'Детский ортодонт',
  'milk-teeth-anesthesia': 'Лечение молочных зубов под наркозом',
  'dental-therapist-consultation': 'Консультация стоматолога-терапевта',
  'caries-treatment': 'Лечение кариеса',
  'professional-cleaning': 'Профессиональная чистка зубов',
  'tooth-restoration': 'Реставрация зубов',
  'teeth-treatment-microscope': 'Лечение зубов под микроскопом',
  'pulpitis-treatment': 'Лечение пульпита',
  'implantation-general': 'Имплантация',
  'immediate-dental-implantation': 'Одномоментная дентальная имплантация',
  'all-on-4-6': 'Имплантация по протоколу All-on-4/6',
  'sinus-lift-implantation': 'Синус-лифтинг',
  'straumann-implants': 'Имплантация зубов системой Straumann',
  'neodent-implants': 'Имплантация зубов системой Neodent',
  'osstem-implants': 'Имплантация зубов системой Osstem Implant',
  'megagen-anyone-implants': 'Имплантация зубов системой MegaGen AnyOne',
  'megagen-implants': 'Имплантация зубов системой MegaGen AnyRidge',
  'prosthetics-general': 'Протезирование',
  'temporary-crowns': 'Временные коронки',
  'digital-prosthetics': 'Цифровое протезирование',
  'metal-ceramic-crowns': 'Металлокерамические коронки',
  'veneers': 'Виниры',
  'zirconia-crowns': 'Коронки из диоксида циркония',
  'dental-bridges': 'Мостовидные протезы',
  'dental-onlays': 'Накладки',
  'implant-supported-prosthetics': 'Протезирование на имплантах',
  'orthodontist-consultation': 'Консультация стоматолога-ортодонта',
  'orthodontic-diagnostics': 'Ортодонтическая диагностика',
  'braces-installation': 'Установка брекетов',
  'orthodontic-retention-period': 'Ретенционный период',
  'pediatric-orthodontics': 'Детская ортодонтия',
  'oral-surgery-general': 'Хирургия',
  'single-tooth-extraction': 'Удаление зуба',
  'wisdom-tooth-extraction': 'Удаление зуба мудрости',
  'gingival-plasty': 'Пластика десны',
  'periostotomy-pericoronotomy': 'Периостотомия, перикоронаротомия',
  'gynecologist-appointment': 'Приём врача-гинеколога',
  'colposcopy': 'Кольпоскопия шейки матки',
  'vulvoscopy': 'Вульвоскопия',
  'diagnostic-studies': 'Диагностические исследования',
  'prp-plasma-therapy': 'Плазмотерапия или PRP-терапия',
  'intimate-contouring': 'Интимная контурная пластика',
  'radiofrequency-cervical-conization': 'Радиоволновая конизация шейки матки',
  'radiofrequency-cervical-coagulation': 'Радиоволновая коагуляция шейки матки',
  'cervical-canal-polypectomy': 'Полипэктомия цервикального канала',
  'intrauterine-device': 'Внутриматочная спираль',
  'aspiration-cervical-biopsy': 'Аспирационная биопсия шейки матки',
  'targeted-cervical-biopsy': 'Прицельная биопсия шейки матки',
  'gynecology-pelvic-ultrasound': 'УЗИ органов малого таза',
  'gynecology-breast-ultrasound': 'УЗИ молочных желез',
  'pediatric-gynecology': 'Детская гинекология',
  'pelvic-ultrasound': 'УЗИ органов малого таза',
  'breast-ultrasound': 'УЗИ молочных желез',
  'thyroid-ultrasound': 'УЗИ щитовидной железы',
  'cardiologist-appointment': 'Приём врача-кардиолога',
  'ecg': 'Электрокардиография (ЭКГ)',
  'echo-kg': 'Эхокардиография (УЗИ сердца)',
  'neurologist-appointment': 'Приём врача-невролога',
  'therapeutic-nerve-blocks': 'Лечебные блокады',
  'brachiocephalic-artery-ultrasound': 'УЗИ БЦА',
  'urologist-appointment': 'Приём врача-уролога',
  'prostate-rectal-examination': 'Ректальный осмотр простаты',
  'prostate-massage': 'Массаж предстательной железы',
  'prostatic-secretion-collection': 'Получение секрета',
  'therapeutic-prostate-massage': 'Лечебный массаж предстательной железы',
  'hydrocele-puncture': 'Пункция гидроцеле',
  'urethral-polyp-electroresection': 'Электрорезекция полипа уретры',
  'condyloma-electroresection': 'Электрорезекция остроконечных кондилом',
  'frenulotomy': 'Рассечение короткой уздечки',
  'urology-us-kidneys-adrenals': 'Почки, надпочечники',
  'urology-us-bladder-residual':
    'Мочевой пузырь (в т.ч. с определением остаточной мочи)',
  'urology-us-prostate-bladder-transabdominal':
    'Предстательная железа с мочевым пузырем и остаточной мочью (трансабдоминально)',
  'urology-us-scrotum': 'Мошонка',
  'urology-us-penis': 'Половой член',
  'urology-us-transrectal': 'Трансректальное УЗИ',
  'dermatovenerologist-appointment': 'Приём врача-дерматовенеролога',
  'skin-dermoscopy': 'Дермоскопия кожи',
  'abdominal-ultrasound': 'УЗИ органов брюшной полости',
  'ultrasound-heart': 'УЗИ сердца',
  'ultrasound-bc-arteries': 'УЗИ БЦА',
  'ultrasound-kidneys-adrenals-bladder':
    'УЗИ почек, надпочечников, мочевого пузыря',
  'ultrasound-prostate': 'УЗИ предстательной железы',
  'ultrasound-scrotum-penis': 'УЗИ мошонки, полового члена',
  'ultrasound-transrectal': 'Трансректальное УЗИ',
};

function getServicePrice(categoryId: string, serviceId: string): string {
  const prices: Record<string, Record<string, string>> = {
    'pediatric-dentistry': {
      'milk-teeth-treatment': 'от 45 BYN',
      'pediatric-surgeon': 'от 80 BYN',
      'pediatric-orthodontist': 'от 60 BYN',
      'milk-teeth-anesthesia': 'от 120 BYN'
    },
    'dentistry': {
      'default': 'от 60 BYN',
    },
    'dental-therapist-consultation': {
      default: 'от 40 BYN',
    },
    'caries-treatment': {
      default: 'от 55 BYN',
    },
    'professional-cleaning': {
      default: 'от 70 BYN',
    },
    'tooth-restoration': {
      default: 'от 60 BYN',
    },
    'teeth-treatment-microscope': {
      default: 'от 85 BYN',
    },
    'pulpitis-treatment': {
      default: 'от 90 BYN',
    },
    'implantation-general': {
      default: 'от 200 BYN',
    },
    'immediate-dental-implantation': {
      default: 'от 350 BYN',
    },
    'all-on-4-6': {
      default: 'от 2500 BYN',
    },
    'sinus-lift-implantation': {
      default: 'от 400 BYN',
    },
    'straumann-implants': {
      default: 'от 450 BYN',
    },
    'neodent-implants': {
      default: 'от 380 BYN',
    },
    'osstem-implants': {
      default: 'от 320 BYN',
    },
    'megagen-anyone-implants': {
      default: 'от 340 BYN',
    },
    'megagen-implants': {
      default: 'от 300 BYN',
    },
    'prosthetics-general': { default: 'от 120 BYN' },
    'temporary-crowns': { default: 'от 80 BYN' },
    'digital-prosthetics': { default: 'от 150 BYN' },
    'metal-ceramic-crowns': { default: 'от 200 BYN' },
    'veneers': { default: 'от 180 BYN' },
    'zirconia-crowns': { default: 'от 250 BYN' },
    'dental-bridges': { default: 'от 220 BYN' },
    'dental-onlays': { default: 'от 160 BYN' },
    'implant-supported-prosthetics': { default: 'от 400 BYN' },
    'orthodontist-consultation': { default: 'от 45 BYN' },
    'orthodontic-diagnostics': { default: 'от 60 BYN' },
    'braces-installation': { default: 'от 90 BYN' },
    'orthodontic-retention-period': { default: 'от 50 BYN' },
    'pediatric-orthodontics': { default: 'от 85 BYN' },
    'oral-surgery-general': { default: 'от 40 BYN' },
    'single-tooth-extraction': { default: 'от 55 BYN' },
    'wisdom-tooth-extraction': { default: 'от 95 BYN' },
    'gingival-plasty': { default: 'от 120 BYN' },
    'periostotomy-pericoronotomy': { default: 'от 70 BYN' },
    'gynecologist-appointment': { default: 'от 50 BYN' },
    'colposcopy': { default: 'от 55 BYN' },
    'vulvoscopy': { default: 'от 50 BYN' },
    'diagnostic-studies': { default: 'от 65 BYN' },
    'prp-plasma-therapy': { default: 'от 120 BYN' },
    'intimate-contouring': { default: 'от 200 BYN' },
    'radiofrequency-cervical-conization': { default: 'от 180 BYN' },
    'radiofrequency-cervical-coagulation': { default: 'от 150 BYN' },
    'cervical-canal-polypectomy': { default: 'от 140 BYN' },
    'intrauterine-device': { default: 'от 90 BYN' },
    'aspiration-cervical-biopsy': { default: 'от 75 BYN' },
    'targeted-cervical-biopsy': { default: 'от 80 BYN' },
    'gynecology-pelvic-ultrasound': { default: 'от 45 BYN' },
    'gynecology-breast-ultrasound': { default: 'от 40 BYN' },
    'pediatric-gynecology': {
      default: 'от 55 BYN'
    },
    'pediatric-urology': {
      'default': 'от 60 BYN'
    },
    'endocrinology': {
      'default': 'от 50 BYN'
    },
    'oncology': {
      'default': 'от 80 BYN'
    },
    'ultrasound': {
      'breast-ultrasound': 'от 40 BYN',
      'thyroid-ultrasound': 'от 35 BYN',
      default: 'от 45 BYN',
    },
    'dermatology': { default: 'от 50 BYN' },
    'dermatovenerologist-appointment': { default: 'от 50 BYN' },
    'skin-dermoscopy': { default: 'от 45 BYN' },
    'abdominal-ultrasound': { default: 'от 45 BYN' },
    'ultrasound-heart': { default: 'от 55 BYN' },
    'ultrasound-bc-arteries': { default: 'от 45 BYN' },
    'ultrasound-kidneys-adrenals-bladder': { default: 'от 45 BYN' },
    'ultrasound-prostate': { default: 'от 45 BYN' },
    'ultrasound-scrotum-penis': { default: 'от 40 BYN' },
    'ultrasound-transrectal': { default: 'от 50 BYN' },
    'pelvic-ultrasound': { default: 'от 45 BYN' },
    'breast-ultrasound': { default: 'от 40 BYN' },
    'thyroid-ultrasound': { default: 'от 35 BYN' },
    'diagnostics': {
      'default': 'от 35 BYN'
    },
    'day-hospital': {
      'default': 'от 100 BYN'
    },
    'cardiology': { default: 'от 50 BYN' },
    'cardiologist-appointment': { default: 'от 50 BYN' },
    'ecg': { default: 'от 25 BYN' },
    'echo-kg': { default: 'от 55 BYN' },
    'neurology': { default: 'от 50 BYN' },
    'neurologist-appointment': { default: 'от 50 BYN' },
    'therapeutic-nerve-blocks': { default: 'от 80 BYN' },
    'brachiocephalic-artery-ultrasound': { default: 'от 45 BYN' },
    'urology': { default: 'от 50 BYN' },
    'urologist-appointment': { default: 'от 50 BYN' },
    'urology-diagnostic-manipulations': { default: 'от 40 BYN' },
    'prostate-rectal-examination': { default: 'от 35 BYN' },
    'prostate-massage': { default: 'от 40 BYN' },
    'prostatic-secretion-collection': { default: 'от 30 BYN' },
    'therapeutic-prostate-massage': { default: 'от 45 BYN' },
    'urological-surgery': { default: 'от 120 BYN' },
    'hydrocele-puncture': { default: 'от 90 BYN' },
    'urethral-polyp-electroresection': { default: 'от 150 BYN' },
    'condyloma-electroresection': { default: 'от 100 BYN' },
    'frenulotomy': { default: 'от 120 BYN' },
    'urology-ultrasound': { default: 'от 45 BYN' },
    'urology-us-kidneys-adrenals': { default: 'от 40 BYN' },
    'urology-us-bladder-residual': { default: 'от 40 BYN' },
    'urology-us-prostate-bladder-transabdominal': { default: 'от 45 BYN' },
    'urology-us-scrotum': { default: 'от 40 BYN' },
    'urology-us-penis': { default: 'от 40 BYN' },
    'urology-us-transrectal': { default: 'от 50 BYN' },
  };
  
  return prices[categoryId]?.[serviceId] || prices[categoryId]?.['default'] || 'от 50 BYN';
}

export function getServiceData(serviceId: string, categoryId: string): ServiceData {
  const category = serviceCategories[categoryId] || 'Услуги';
  const title = serviceTitles[serviceId] || 'Медицинская услуга';
  
  // Base service data
  const baseData: ServiceData = {
    title,
    category,
    description: `Профессиональная медицинская услуга ${title.toLowerCase()} в клинике Doctor Family с использованием современного оборудования и методов.`,
    image: getServiceImage(categoryId, serviceId),
    price: getServicePrice(categoryId, serviceId),
    breadcrumbs: [
      { label: 'Услуги', path: '/' },
      { label: category, path: `/services/${categoryId}` },
      { label: title }
    ],
    fullDescription: getServiceDescription(categoryId, serviceId),
    faq: getServiceFaq(categoryId, serviceId),
    gallery: getServiceGallery(categoryId, serviceId),
    specialists: [], // Fallback данные не должны показывать специалистов, так как привязка идет через БД
    reviews: getServiceReviews(categoryId, serviceId)
  };

  return baseData;
}

const GYNECOLOGY_LEAF_SLUGS = new Set([
  'gynecologist-appointment',
  'colposcopy',
  'vulvoscopy',
  'diagnostic-studies',
  'prp-plasma-therapy',
  'intimate-contouring',
  'radiofrequency-cervical-conization',
  'radiofrequency-cervical-coagulation',
  'cervical-canal-polypectomy',
  'intrauterine-device',
  'aspiration-cervical-biopsy',
  'targeted-cervical-biopsy',
  'gynecology-pelvic-ultrasound',
  'gynecology-breast-ultrasound',
  'pediatric-gynecology',
]);

const CARDIOLOGY_LEAF_SLUGS = new Set([
  'cardiologist-appointment',
  'ecg',
  'echo-kg',
]);

const NEUROLOGY_LEAF_SLUGS = new Set([
  'neurologist-appointment',
  'therapeutic-nerve-blocks',
  'brachiocephalic-artery-ultrasound',
]);

const UROLOGY_SLUGS = new Set([
  'urology',
  'urologist-appointment',
  'urology-diagnostic-manipulations',
  'prostate-rectal-examination',
  'prostate-massage',
  'prostatic-secretion-collection',
  'therapeutic-prostate-massage',
  'urological-surgery',
  'hydrocele-puncture',
  'urethral-polyp-electroresection',
  'condyloma-electroresection',
  'frenulotomy',
  'urology-ultrasound',
  'urology-us-kidneys-adrenals',
  'urology-us-bladder-residual',
  'urology-us-prostate-bladder-transabdominal',
  'urology-us-scrotum',
  'urology-us-penis',
  'urology-us-transrectal',
]);

const DERMATOLOGY_LEAF_SLUGS = new Set([
  'dermatology',
  'dermatovenerologist-appointment',
  'skin-dermoscopy',
]);

const ULTRASOUND_LEAF_SLUGS = new Set([
  'thyroid-ultrasound',
  'abdominal-ultrasound',
  'breast-ultrasound',
  'pelvic-ultrasound',
  'ultrasound-heart',
  'ultrasound-bc-arteries',
  'ultrasound-kidneys-adrenals-bladder',
  'ultrasound-prostate',
  'ultrasound-scrotum-penis',
  'ultrasound-transrectal',
]);

function getServiceImage(categoryId: string, serviceId: string): string {
  const images: Record<string, string> = {
    'pediatric-dentistry': 'https://images.unsplash.com/photo-1758205308172-fc864545dcf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'dentistry': 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'gynecology': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'ultrasound': 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'cardiology': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'neurology': 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'urology': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    'dermatology': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
  };

  if (GYNECOLOGY_LEAF_SLUGS.has(categoryId)) {
    return images['gynecology'];
  }
  if (CARDIOLOGY_LEAF_SLUGS.has(categoryId)) {
    return images['cardiology'];
  }
  if (NEUROLOGY_LEAF_SLUGS.has(categoryId)) {
    return images['neurology'];
  }
  if (UROLOGY_SLUGS.has(categoryId)) {
    return images['urology'];
  }
  if (DERMATOLOGY_LEAF_SLUGS.has(categoryId)) {
    return images['dermatology'];
  }
  if (ULTRASOUND_LEAF_SLUGS.has(categoryId)) {
    return images['ultrasound'];
  }

  return images[categoryId] || images['dentistry'];
}

function getServiceDescription(categoryId: string, serviceId: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    'pediatric-dentistry': {
      'milk-teeth-treatment': `
        Лечение молочных зубов в клинике Doctor Family проводится с особой осторожностью и вниманием к маленьким пациентам. 
        Мы используем современные методы обезболивания и создаем комфортную атмосферу для детей.
        
        Наши детские стоматологи имеют большой опыт работы с детьми разного возраста и знают, как найти подход к каждому ребенку.
        Мы применяем только безопасные материалы и современное оборудование.
      `,
      'pediatric-surgeon': `
        Детская хирургическая стоматология в Doctor Family включает весь спектр оперативных вмешательств для маленьких пациентов.
        Наши специалисты проводят операции с максимальной осторожностью, используя щадящие методики и современное оборудование.
        
        Мы обеспечиваем безболезненное проведение всех процедур и создаем комфортную атмосферу для ребенка и родителей.
      `
    },
    'dentistry': {},
    'dental-therapist-consultation': {
      'dental-therapist-consultation': `
        Первичная консультация стоматолога-терапевта: осмотр, диагностика, план лечения.
        Врач оценивает состояние зубов и дёсен, при необходимости назначает дополнительные исследования.
      `,
    },
    'caries-treatment': {
      'caries-treatment': `
        Лечение кариеса современными материалами с сохранением максимума здоровых тканей зуба.
        Подбираем методику в зависимости от глубины поражения и локализации.
      `,
    },
    'professional-cleaning': {
      'professional-cleaning': `
        Профессиональная гигиена полости рта: удаление мягкого и твёрдого налёта, полировка.
        Рекомендуется регулярно для профилактики кариеса и заболеваний дёсен.
      `,
    },
    'tooth-restoration': {
      'tooth-restoration': `
        Реставрация зубов композитными материалами: восстановление формы, цвета и функции зуба после кариеса или травмы.
      `,
    },
    'teeth-treatment-microscope': {
      'teeth-treatment-microscope': `
        Лечение зубов с использованием стоматологического микроскопа для высокой точности и контроля на всех этапах терапии.
      `,
    },
    'pulpitis-treatment': {
      'pulpitis-treatment': `
        Лечение пульпита и воспаления пульпы: диагностика, обезболивание, эндодонтическое лечение с сохранением зуба где это возможно.
      `,
    },
  };
  
  return descriptions[categoryId]?.[serviceId] || `
    Качественная медицинская услуга в клинике Doctor Family. Наши специалисты используют современные методы 
    диагностики и лечения, обеспечивая высокий уровень медицинской помощи.
    
    Мы применяем индивидуальный подход к каждому пациенту и используем только проверенные, безопасные методики.
  `;
}

function getServiceFaq(categoryId: string, serviceId: string) {
  const faqs: Record<string, Record<string, Array<{ question: string; answer: string }>>> = {
    'pediatric-dentistry': {
      'milk-teeth-treatment': [
        {
          question: 'Больно ли лечить молочные зубы?',
          answer: 'Нет, современные методы анестезии позволяют проводить лечение абсолютно безболезненно. Мы используем специальные детские анестетики и техники отвлечения внимания.'
        },
        {
          question: 'Нужно ли лечить молочные зубы, если они всё равно выпадут?',
          answer: 'Да, обязательно. Больные молочные зубы могут повредить зачатки постоянных зубов и вызвать серьёзные проблемы с прикусом в будущем.'
        },
        {
          question: 'С какого возраста можно лечить зубы ребенку?',
          answer: 'Лечение возможно с момента прорезывания первых зубов. Наши врачи работают с детьми от 1 года.'
        }
      ]
    }
  };
  
  return faqs[categoryId]?.[serviceId] || [];
}

function getServiceGallery(categoryId: string, serviceId: string): string[] {
  return [];
}

function getServiceSpecialists(categoryId: string, serviceId: string) {
  const specialists: Record<string, Array<any>> = {
    'pediatric-dentistry': [
      {
        id: 1,
        name: 'Анна Петрова',
        specialization: 'Детский стоматолог',
        qualification: 'Врач высшей категории',
        experience: 8,
        grade: 5,
        image_url: 'https://images.unsplash.com/photo-1685022036259-04cf91a89af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200'
      },
      {
        id: 2,
        name: 'Михаил Козлов',
        specialization: 'Детский хирург-стоматолог',
        qualification: 'Врач высшей категории',
        experience: 12,
        grade: 5,
        image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200'
      },
      {
        id: 3,
        name: 'Екатерина Смирнова',
        specialization: 'Детский ортодонт',
        qualification: 'Врач первой категории',
        experience: 6,
        grade: 5,
        image_url: 'https://images.unsplash.com/photo-1685022036259-04cf91a89af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200'
      }
    ],
    'dentistry': [
      {
        id: 4,
        name: 'Дмитрий Волков',
        specialization: 'Стоматолог-терапевт',
        qualification: 'Врач высшей категории',
        experience: 10,
        grade: 5,
        image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200'
      },
      {
        id: 5,
        name: 'Ольга Морозова',
        specialization: 'Стоматолог-хирург',
        qualification: 'Врач высшей категории',
        experience: 15,
        grade: 5,
        image_url: 'https://images.unsplash.com/photo-1685022036259-04cf91a89af1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200'
      }
    ]
  };

  return specialists[categoryId] || specialists['dentistry'];
}

function getServiceReviews(categoryId: string, serviceId: string) {
  return [];
}