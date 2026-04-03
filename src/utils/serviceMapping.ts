/**
 * Маппинг между serviceId из меню и названиями услуг в БД
 * Это необходимо для точного сопоставления URL из меню с данными в базе
 */
export const serviceIdToTitleMapping: Record<string, Record<string, string>> = {
  // Стоматология (корневая; подразделы терапии — отдельные slug категорий ниже)
  'dentistry': {},
  // Терапевтическая стоматология — листовые категории (URL /services/{slug}/…)
  'dental-therapist-consultation': {
    'dental-therapist-consultation': 'Консультация стоматолога-терапевта',
  },
  'caries-treatment': {
    'caries-treatment': 'Лечение кариеса',
  },
  'professional-cleaning': {
    'professional-cleaning': 'Профессиональная чистка зубов',
  },
  'tooth-restoration': {
    'tooth-restoration': 'Реставрация зубов',
  },
  'teeth-treatment-microscope': {
    'teeth-treatment-microscope': 'Лечение зубов под микроскопом',
  },
  'pulpitis-treatment': {
    'pulpitis-treatment': 'Лечение пульпита',
  },
  // Имплантация (листовые категории)
  'implantation-general': {
    'implantation-general': 'Имплантация',
  },
  'immediate-dental-implantation': {
    'immediate-dental-implantation': 'Одномоментная дентальная имплантация',
  },
  'all-on-4-6': {
    'all-on-4-6': 'Имплантация по протоколу All-on-4/6',
  },
  'sinus-lift-implantation': {
    'sinus-lift-implantation': 'Синус-лифтинг',
  },
  'straumann-implants': {
    'straumann-implants': 'Имплантация зубов системой Straumann',
  },
  'neodent-implants': {
    'neodent-implants': 'Имплантация зубов системой Neodent',
  },
  'osstem-implants': {
    'osstem-implants': 'Имплантация зубов системой Osstem Implant',
  },
  'megagen-anyone-implants': {
    'megagen-anyone-implants': 'Имплантация зубов системой MegaGen AnyOne',
  },
  'megagen-implants': {
    'megagen-implants': 'Имплантация зубов системой MegaGen AnyRidge',
  },
  // Ортопедия
  'prosthetics-general': {
    'prosthetics-general': 'Протезирование',
  },
  'temporary-crowns': {
    'temporary-crowns': 'Временные коронки',
  },
  'digital-prosthetics': {
    'digital-prosthetics': 'Цифровое протезирование',
  },
  'metal-ceramic-crowns': {
    'metal-ceramic-crowns': 'Металлокерамические коронки',
  },
  'veneers': {
    'veneers': 'Виниры',
  },
  'zirconia-crowns': {
    'zirconia-crowns': 'Коронки из диоксида циркония',
  },
  'dental-bridges': {
    'dental-bridges': 'Мостовидные протезы',
  },
  'dental-onlays': {
    'dental-onlays': 'Накладки',
  },
  'implant-supported-prosthetics': {
    'implant-supported-prosthetics': 'Протезирование на имплантах',
  },
  // Ортодонтия
  'orthodontist-consultation': {
    'orthodontist-consultation': 'Консультация стоматолога-ортодонта',
  },
  'orthodontic-diagnostics': {
    'orthodontic-diagnostics': 'Ортодонтическая диагностика',
  },
  'braces-installation': {
    'braces-installation': 'Установка брекетов',
  },
  'orthodontic-retention-period': {
    'orthodontic-retention-period': 'Ретенционный период',
  },
  'pediatric-orthodontics': {
    'pediatric-orthodontics': 'Детская ортодонтия',
  },
  // Хирургия
  'oral-surgery-general': {
    'oral-surgery-general': 'Хирургия',
  },
  'single-tooth-extraction': {
    'single-tooth-extraction': 'Удаление зуба',
  },
  'wisdom-tooth-extraction': {
    'wisdom-tooth-extraction': 'Удаление зуба мудрости',
  },
  'gingival-plasty': {
    'gingival-plasty': 'Пластика десны',
  },
  'periostotomy-pericoronotomy': {
    'periostotomy-pericoronotomy': 'Периостотомия, перикоронаротомия',
  },
  // Детская стоматология
  'pediatric-dentistry': {
    'milk-teeth-treatment': 'Лечение молочных зубов',
    'pediatric-surgeon': 'Детский хирург-стоматолог',
    'pediatric-orthodontist': 'Детский ортодонт',
    'milk-teeth-anesthesia': 'Лечение молочных зубов под наркозом',
  },
  // Гинекология (листовые категории)
  'gynecologist-appointment': {
    'gynecologist-appointment': 'Приём врача-гинеколога',
  },
  'colposcopy': {
    'colposcopy': 'Кольпоскопия шейки матки',
  },
  'vulvoscopy': {
    'vulvoscopy': 'Вульвоскопия',
  },
  'diagnostic-studies': {
    'diagnostic-studies': 'Диагностические исследования',
  },
  'prp-plasma-therapy': {
    'prp-plasma-therapy': 'Плазмотерапия или PRP-терапия',
  },
  'intimate-contouring': {
    'intimate-contouring': 'Интимная контурная пластика',
  },
  'radiofrequency-cervical-conization': {
    'radiofrequency-cervical-conization': 'Радиоволновая конизация шейки матки',
  },
  'radiofrequency-cervical-coagulation': {
    'radiofrequency-cervical-coagulation': 'Радиоволновая коагуляция шейки матки',
  },
  'cervical-canal-polypectomy': {
    'cervical-canal-polypectomy': 'Полипэктомия цервикального канала',
  },
  'intrauterine-device': {
    'intrauterine-device': 'Внутриматочная спираль',
  },
  'aspiration-cervical-biopsy': {
    'aspiration-cervical-biopsy': 'Аспирационная биопсия шейки матки',
  },
  'targeted-cervical-biopsy': {
    'targeted-cervical-biopsy': 'Прицельная биопсия шейки матки',
  },
  'gynecology-pelvic-ultrasound': {
    'gynecology-pelvic-ultrasound': 'УЗИ органов малого таза',
  },
  'gynecology-breast-ultrasound': {
    'gynecology-breast-ultrasound': 'УЗИ молочных желез',
  },
  // Дерматология
  'dermatovenerologist-appointment': {
    'dermatovenerologist-appointment': 'Приём врача-дерматовенеролога',
  },
  'skin-dermoscopy': {
    'skin-dermoscopy': 'Дермоскопия кожи',
  },
  // УЗИ (листовые категории)
  'thyroid-ultrasound': {
    'thyroid-ultrasound': 'УЗИ щитовидной железы',
  },
  'abdominal-ultrasound': {
    'abdominal-ultrasound': 'УЗИ органов брюшной полости',
  },
  'breast-ultrasound': {
    'breast-ultrasound': 'УЗИ молочных желез',
  },
  'pelvic-ultrasound': {
    'pelvic-ultrasound': 'УЗИ органов малого таза',
  },
  'ultrasound-heart': {
    'ultrasound-heart': 'УЗИ сердца',
  },
  'ultrasound-bc-arteries': {
    'ultrasound-bc-arteries': 'УЗИ БЦА',
  },
  'ultrasound-kidneys-adrenals-bladder': {
    'ultrasound-kidneys-adrenals-bladder':
      'УЗИ почек, надпочечников, мочевого пузыря',
  },
  'ultrasound-prostate': {
    'ultrasound-prostate': 'УЗИ предстательной железы',
  },
  'ultrasound-scrotum-penis': {
    'ultrasound-scrotum-penis': 'УЗИ мошонки, полового члена',
  },
  'ultrasound-transrectal': {
    'ultrasound-transrectal': 'Трансректальное УЗИ',
  },
  // Кардиология (листовые категории)
  'cardiologist-appointment': {
    'cardiologist-appointment': 'Приём врача-кардиолога',
  },
  'ecg': {
    'ecg': 'Электрокардиография (ЭКГ)',
  },
  'echo-kg': {
    'echo-kg': 'Эхокардиография (УЗИ сердца)',
  },
  // Неврология
  'neurologist-appointment': {
    'neurologist-appointment': 'Приём врача-невролога',
  },
  'therapeutic-nerve-blocks': {
    'therapeutic-nerve-blocks': 'Лечебные блокады',
  },
  'brachiocephalic-artery-ultrasound': {
    'brachiocephalic-artery-ultrasound': 'УЗИ БЦА',
  },
  // Урология
  'urologist-appointment': {
    'urologist-appointment': 'Приём врача-уролога',
  },
  'prostate-rectal-examination': {
    'prostate-rectal-examination': 'Ректальный осмотр простаты',
  },
  'prostate-massage': {
    'prostate-massage': 'Массаж предстательной железы',
  },
  'prostatic-secretion-collection': {
    'prostatic-secretion-collection': 'Получение секрета',
  },
  'therapeutic-prostate-massage': {
    'therapeutic-prostate-massage': 'Лечебный массаж предстательной железы',
  },
  'hydrocele-puncture': {
    'hydrocele-puncture': 'Пункция гидроцеле',
  },
  'urethral-polyp-electroresection': {
    'urethral-polyp-electroresection': 'Электрорезекция полипа уретры',
  },
  'condyloma-electroresection': {
    'condyloma-electroresection': 'Электрорезекция остроконечных кондилом',
  },
  'frenulotomy': {
    'frenulotomy': 'Рассечение короткой уздечки',
  },
  'urology-us-kidneys-adrenals': {
    'urology-us-kidneys-adrenals': 'Почки, надпочечники',
  },
  'urology-us-bladder-residual': {
    'urology-us-bladder-residual':
      'Мочевой пузырь (в т.ч. с определением остаточной мочи)',
  },
  'urology-us-prostate-bladder-transabdominal': {
    'urology-us-prostate-bladder-transabdominal':
      'Предстательная железа с мочевым пузырем и остаточной мочью (трансабдоминально)',
  },
  'urology-us-scrotum': {
    'urology-us-scrotum': 'Мошонка',
  },
  'urology-us-penis': {
    'urology-us-penis': 'Половой член',
  },
  'urology-us-transrectal': {
    'urology-us-transrectal': 'Трансректальное УЗИ',
  },
  // Детская гинекология (подраздел гинекологии + услуги)
  'pediatric-gynecology': {
    'pediatric-gynecology': 'Детская гинекология',
    'pediatric-gynecologist': 'Детский гинеколог',
    'pelvic-ultrasound-girls': 'УЗИ органов малого таза для девочек',
    'adolescent-gynecologist': 'Подростковый гинеколог',
  },
  // Эндокринология
  'endocrinology': {
    'endocrinologist-consultation': 'Консультация врача-эндокринолога',
  },
  // Онкология
  'oncology': {
    'oncologist-appointment': 'Приём врача онколога',
  },
  // Дневной стационар
  'day-hospital': {
    'procedure-room': 'Процедурный кабинет',
  },
  // Диагностика
  'diagnostics': {
    'expert-ultrasound': 'Экспертное УЗИ',
    'analyses': 'Лабораторные анализы',
    'tooth-xray': 'Рентген зубов',
    '3d-dental-scan': '3D сканирование зубов',
    'panoramic-dental-scan': 'Панорамный снимок зубов',
  },
};

/**
 * Получить название услуги по serviceId и categorySlug
 */
export function getServiceTitleByServiceId(
  categorySlug: string,
  serviceId: string
): string | null {
  const categoryMapping = serviceIdToTitleMapping[categorySlug];
  if (!categoryMapping) {
    return null;
  }
  return categoryMapping[serviceId] || null;
}

/**
 * Получить serviceId (slug) по названию услуги и categorySlug
 * Обратный маппинг для поиска
 */
export function getServiceSlugByTitle(
  categorySlug: string,
  serviceTitle: string
): string | null {
  const categoryMapping = serviceIdToTitleMapping[categorySlug];
  if (!categoryMapping) {
    return null;
  }

  // Ищем serviceId по названию
  for (const [serviceId, title] of Object.entries(categoryMapping)) {
    if (title.toLowerCase() === serviceTitle.toLowerCase()) {
      return serviceId;
    }
  }

  return null;
}

/**
 * Получить ключевые слова для поиска услуги по serviceId
 */
export function getServiceKeywords(serviceId: string): string[] {
  const keywordMap: Record<string, string[]> = {
    'breast-ultrasound': ['молочных', 'желез', 'груди', 'молочные', 'грудь'],
    'pelvic-ultrasound': ['малого', 'таза', 'органов', 'малый', 'таз', 'малого таза'],
    'pelvic-ultrasound-girls': ['малого', 'таза', 'органов', 'малый', 'таз', 'малого таза', 'девочек'],
    'thyroid-ultrasound': ['щитовидной', 'железы', 'щитовидная'],
    'caries-treatment': ['кариеса', 'лечение', 'кариес'],
    'dental-therapist-consultation': ['консультация', 'терапевт', 'стоматолог', 'осмотр'],
    'professional-cleaning': ['чистка', 'зубов', 'профессиональная', 'чистка зубов', 'гигиена'],
    'tooth-restoration': ['реставрация', 'зубов', 'композит'],
    'teeth-treatment-microscope': ['микроскоп', 'лечение', 'зубов', 'микроскопом'],
    'pulpitis-treatment': ['пульпита', 'лечение', 'пульпит'],
    'implantation-general': ['имплантация', 'имплант', 'импланты', 'зубов'],
    'immediate-dental-implantation': ['одномоментная', 'имплантация', 'дентальная'],
    'all-on-4-6': ['all-on-4', 'all-on-6', 'протокол', 'имплантация'],
    'sinus-lift-implantation': ['синус', 'лифтинг', 'синус-лифтинг'],
    'straumann-implants': ['straumann', 'штрауман', 'имплантация'],
    'neodent-implants': ['neodent', 'неодент', 'имплантация'],
    'osstem-implants': ['osstem', 'осстем', 'имплантация'],
    'megagen-anyone-implants': ['megagen', 'мегаген', 'anyone', 'имплантация'],
    'megagen-implants': ['megagen', 'мегаген', 'anyridge', 'имплантация'],
    'prosthetics-general': ['протезирование', 'протез', 'зубы'],
    'temporary-crowns': ['временные', 'коронки', 'коронка'],
    'digital-prosthetics': ['цифровое', 'протезирование', 'cad', 'cam'],
    'metal-ceramic-crowns': ['металлокерамика', 'коронки', 'коронка'],
    'veneers': ['виниры', 'винир', 'фасетки'],
    'zirconia-crowns': ['цирконий', 'диоксид', 'циркония', 'коронки'],
    'dental-bridges': ['мост', 'мостовидный', 'протез'],
    'dental-onlays': ['накладки', 'onlay', 'инлей', 'онлей'],
    'implant-supported-prosthetics': ['импланты', 'протезирование', 'на имплантах'],
    'orthodontist-consultation': ['ортодонт', 'консультация', 'прикус'],
    'orthodontic-diagnostics': ['ортодонтия', 'диагностика', 'телерентген'],
    'braces-installation': ['брекеты', 'установка', 'брекет'],
    'orthodontic-retention-period': ['ретенция', 'ретейнер', 'шина'],
    'pediatric-orthodontics': ['детская', 'ортодонтия', 'ребёнок'],
    'oral-surgery-general': ['хирургия', 'стоматологическая', 'операция'],
    'single-tooth-extraction': ['удаление', 'зуба', 'экстракция'],
    'wisdom-tooth-extraction': ['мудрости', 'восьмёрка', 'удаление'],
    'gingival-plasty': ['десна', 'пластика', 'gingiva'],
    'periostotomy-pericoronotomy': ['периостотомия', 'перикоронаротомия', 'коронка', 'мудрости'],
    'milk-teeth-treatment': ['молочных', 'зубов', 'лечение', 'молочные зубы'],
    'pediatric-surgeon': ['детский', 'хирург', 'стоматолог', 'удаление'],
    'pediatric-orthodontist': ['детский', 'ортодонт', 'брекеты', 'прикус'],
    'milk-teeth-anesthesia': ['молочных', 'зубов', 'наркоз', 'лечение под наркозом'],
    'gynecologist-appointment': ['гинеколога', 'приём', 'гинеколог', 'врач'],
    'colposcopy': ['кольпоскопия', 'шейки', 'матки'],
    'vulvoscopy': ['вульвоскопия', 'вульва'],
    'diagnostic-studies': ['диагностические', 'исследования', 'кольпоскопия', 'биопсия'],
    'prp-plasma-therapy': ['prp', 'плазма', 'плазмотерапия'],
    'intimate-contouring': ['интимная', 'пластика', 'контурная'],
    'radiofrequency-cervical-conization': ['конизация', 'радиоволновая', 'шейки'],
    'radiofrequency-cervical-coagulation': ['коагуляция', 'радиоволновая', 'шейки'],
    'cervical-canal-polypectomy': ['полипэктомия', 'цервикальный', 'канал'],
    'intrauterine-device': ['спираль', 'вмс', 'внутриматочная'],
    'aspiration-cervical-biopsy': ['аспирационная', 'биопсия', 'шейки'],
    'targeted-cervical-biopsy': ['прицельная', 'биопсия', 'шейки'],
    'gynecology-pelvic-ultrasound': ['узи', 'малого', 'таза', 'гинекология'],
    'gynecology-breast-ultrasound': ['узи', 'молочных', 'желез', 'гинекология'],
    'pediatric-gynecology': ['детская', 'гинекология', 'подросток', 'девочка'],
    'abdominal-ultrasound': ['брюшной', 'полости', 'брюшная', 'органов брюшной полости'],
    'ultrasound-heart': ['сердца', 'узи', 'сердце'],
    'ultrasound-bc-arteries': ['бца', 'узи', 'сосуды', 'брахиоцефальные'],
    'ultrasound-kidneys-adrenals-bladder': ['почки', 'надпочечники', 'пузырь', 'мочевой', 'узи'],
    'ultrasound-prostate': ['простата', 'предстательной', 'узи'],
    'ultrasound-scrotum-penis': ['мошонка', 'половой', 'член', 'узи'],
    'ultrasound-transrectal': ['трансректальное', 'узи', 'простата'],
    'dermatovenerologist-appointment': ['дерматолог', 'дерматовенеролог', 'приём', 'кожа'],
    'skin-dermoscopy': ['дермоскопия', 'кожа', 'диагностика'],
    'fetal-ultrasound': ['плода', 'беременности', 'плод', 'узи плода'],
    'echo-kg': ['эхо', 'кг', 'сердца', 'эхокардиография'],
    'ecg': ['экг', 'электрокардиография', 'кардиограмма'],
    'cardiologist-appointment': ['кардиолог', 'приём', 'сердце'],
    'neurologist-appointment': ['невролог', 'приём', 'неврология'],
    'therapeutic-nerve-blocks': ['блокада', 'блокады', 'лечебные'],
    'brachiocephalic-artery-ultrasound': ['бца', 'узи', 'сосуды', 'брахиоцефальные'],
    'urologist-appointment': ['уролог', 'приём', 'урология'],
    'prostate-rectal-examination': ['простата', 'ректальный', 'осмотр'],
    'prostate-massage': ['простата', 'массаж'],
    'prostatic-secretion-collection': ['секрет', 'простата'],
    'therapeutic-prostate-massage': ['простата', 'лечебный', 'массаж'],
    'hydrocele-puncture': ['гидроцеле', 'пункция'],
    'urethral-polyp-electroresection': ['уретра', 'полип', 'резекция'],
    'condyloma-electroresection': ['кондиломы', 'остроконечные', 'резекция'],
    'frenulotomy': ['уздечка', 'френулотомия'],
    'urology-us-kidneys-adrenals': ['почки', 'надпочечники', 'узи'],
    'urology-us-bladder-residual': ['пузырь', 'остаточная', 'моча'],
    'urology-us-prostate-bladder-transabdominal': ['простата', 'пузырь', 'трансабдоминально'],
    'urology-us-scrotum': ['мошонка', 'узи'],
    'urology-us-penis': ['половой', 'член', 'узи'],
    'urology-us-transrectal': ['трансректальное', 'узи', 'простата'],
    'expert-ultrasound': ['экспертное', 'узи', 'экспертный'],
    'analyses': ['лабораторные', 'анализы', 'анализ'],
    'tooth-xray': ['рентген', 'зубов', 'снимок'],
    '3d-dental-scan': ['3d', 'сканирование', 'зубов', 'томография'],
    'panoramic-dental-scan': ['панорамный', 'снимок', 'зубов', 'ортопантомограмма'],
  };
  
  return keywordMap[serviceId] || [];
}

