// Конфигурация для автоматической генерации breadcrumbs из URL
export const breadcrumbLabels: Record<string, string> = {
  // Основные разделы
  'services': 'Услуги',
  'doctors': 'Врачи',
  'clinic': 'Клиника',
  'contacts': 'Контакты',
  'patient': 'Пациенту',
  'account': 'Личный кабинет',
  'admin': 'Админ-панель',

  // Услуги и Врачи - категории (используются в URL как /services/dentistry или /doctors/dentistry)
  'dentistry': 'Стоматология',
  'pediatric-dentistry': 'Детская стоматология',
  'gynecology': 'Гинекология',
  'dermatology': 'Дерматология',
  'dermatovenerologist-appointment': 'Приём врача-дерматовенеролога',
  'skin-dermoscopy': 'Дермоскопия кожи',
  'pediatric-gynecology': 'Детская гинекология',
  'pediatric-urology': 'Детская урология',
  'ultrasound': 'УЗИ',
  'thyroid-ultrasound': 'УЗИ щитовидной железы',
  'abdominal-ultrasound': 'УЗИ органов брюшной полости',
  'breast-ultrasound': 'УЗИ молочных желез',
  'pelvic-ultrasound': 'УЗИ органов малого таза',
  'ultrasound-heart': 'УЗИ сердца',
  'ultrasound-bc-arteries': 'УЗИ БЦА',
  'ultrasound-kidneys-adrenals-bladder':
    'УЗИ почек, надпочечников, мочевого пузыря',
  'ultrasound-prostate': 'УЗИ предстательной железы',
  'ultrasound-scrotum-penis': 'УЗИ мошонки, полового члена',
  'ultrasound-transrectal': 'Трансректальное УЗИ',
  'fetal-ultrasound': 'УЗИ плода',
  'gender-party': 'Гендер пати',
  'diagnostics': 'Диагностика',
  'cardiology': 'Кардиология',
  'cardiologist-appointment': 'Приём врача-кардиолога',
  'ecg': 'Электрокардиография (ЭКГ)',
  'echo-kg': 'Эхокардиография (УЗИ сердца)',
  'holter-monitoring': 'Холтеровское мониторирование',
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
  'endocrinology': 'Эндокринология',
  'oncology': 'Онкология',
  'day-hospital': 'Дневной стационар',

  // Подразделы услуг (второй уровень в меню)
  'therapeutic-dentistry': 'Терапевтическая стоматология',
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
  'orthodontics': 'Ортодонтия',
  'surgery': 'Хирургия',
  'dental-therapist-consultation': 'Консультация стоматолога-терапевта',
  'caries-treatment': 'Лечение кариеса',
  'professional-cleaning': 'Профессиональная чистка зубов',
  'tooth-restoration': 'Реставрация зубов',
  'teeth-treatment-microscope': 'Лечение зубов под микроскопом',
  'pulpitis-treatment': 'Лечение пульпита',
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

  // Клиника - разделы
  'licenses': 'Лицензии',
  'partners': 'Партнёры',
  'reviews': 'Отзывы',
  'requisites': 'Реквизиты',
  'faq': 'Вопрос-ответ',
  'vacancies': 'Вакансии',

  // Партнеры (используются как /clinic/partners/medical-labs)
  'medical-labs': 'Медицинские лаборатории',
  'insurance': 'Страховые компании',
  'dental-labs': 'Зуботехнические лаборатории',

  // FAQ темы
  'children-teeth': 'Детские зубы',
  'girls-hygiene': 'Гигиена девочек',
  'boys-hygiene': 'Гигиена мальчиков',
  'girls-puberty': 'Половое созревание девочек',
  'culdocentesis': 'Кульдоцентез',
  'stomatology': 'Стоматология',
  'polyp-removal': 'Удаления полипов | Полипэктомия',
  'womens-health': 'Женское здоровье',
  'curettage': 'Раздельное диагностическое выскабливание',

  // Админка (используются как /admin/specialists, /admin/feedbacks, etc.)
  'specialists': 'Специалисты',
  'materials': 'Материалы',
  'letters': 'Письма',
  'questions': 'Вопросы (FAQ)',
  'users': 'Пользователи',
};

/**
 * Делает первую букву строки заглавной
 */
function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateBreadcrumbsFromUrl(pathname: string): Array<{ label: string; href: string }> {
  // Убираем начальный и конечный слеш, разбиваем на части
  const parts = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

  if (parts.length === 0) {
    return [];
  }

  const breadcrumbs: Array<{ label: string; href: string }> = [];
  let currentPath = '';

  parts.forEach((part, index) => {
    currentPath += `/${part}`;

    // Получаем название из конфига - показываем только если есть русское название
    const label = breadcrumbLabels[part];

    if (label) {
      // Используем русское название с заглавной буквы
      breadcrumbs.push({
        label: capitalizeFirstLetter(label),
        href: currentPath,
      });
    }
    // Если нет русского названия - пропускаем этот элемент
  });

  return breadcrumbs;
}
