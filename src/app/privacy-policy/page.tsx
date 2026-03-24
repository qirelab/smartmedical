import { Metadata } from "next";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Политика по обработке персональных данных",
  description:
    "Политика по обработке персональных данных медицинского центра Doctor Family в соответствии с законодательством Республики Беларусь.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <h1 className="mb-6 text-3xl font-semibold text-[#2E2E2E] md:text-4xl">
        Политика по обработке персональных данных ООО "Доктор Фемели"
      </h1>

      <div className="space-y-6 text-sm leading-7 text-gray-700 md:text-base">
        <h2 className="text-2xl font-semibold text-[#2E2E2E]">ГЛАВА 1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>

        <ol className="space-y-5">
          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">1.</span>
            <span>
              Издание настоящей Политики является одной из обязательных принимаемых ООО "Доктор Фемели"
              (далее — Оператор) мер по обеспечению защиты персональных данных, предусмотренных статьей 17 Закона
              Республики Беларусь от 7 мая 2021 г. № 99-З "О защите персональных данных" (далее — Закон о защите
              персональных данных).
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">2.</span>
            <span>
              Пользователь — субъект персональных данных, который является физическим лицом, чьи персональные
              данные обрабатываются Оператором в рамках одной или нескольких целей обработки персональных данных,
              подробная информация о которых содержится в настоящей Политике.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">3.</span>
            <div>
              <p className="mb-2">Настоящая Политика разъясняет Пользователям интернет-сайта Оператора:</p>
              <ul className="list-disc space-y-1 pl-5 marker:text-[#18A36C]">
                <li>каким образом и для каких целей их персональные данные собираются, используются и обрабатываются;</li>
                <li>сколько времени их персональные данные хранятся;</li>
                <li>какие права есть у Пользователя как субъекта персональных данных и как их можно реализовать.</li>
              </ul>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">4.</span>
            <div>
              <p>
                Для целей настоящей Политики под файлами cookie понимаются текстовые файлы, сохраняемые в
                интернет-браузере пользовательского устройства (компьютер, мобильный телефон и т.д.) при посещении
                сайта для отражения и (или) запоминания действий Пользователя.
              </p>
              <p className="mt-2">
                Иные термины используются в настоящей Политике в значениях, определенных Законом о защите
                персональных данных.
              </p>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">5.</span>
            <div>
              <p className="mb-1 font-semibold">Контактные данные Оператора:</p>
              <ul className="list-disc space-y-1 pl-5 marker:text-[#18A36C]">
                <li>наименование: ООО "Доктор Фемели";</li>
                <li>юридический и почтовый адрес: г. Минск, пр. Победителей, д. 119, пом. 504;</li>
                <li>телефон: +375 29 161-01-01;</li>
                <li>адрес электронной почты: smartmedical.by@gmail.com;</li>
                <li>интернет-сайт: doctorfamily.by.</li>
              </ul>
            </div>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">6.</span>
            <span>
              Действие настоящей Политики распространяется на отношения по защите персональных данных, связанные
              с обработкой файлов cookie, сохраняемых в интернет-браузере пользовательского устройства при
              посещении сайта Оператора.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">7.</span>
            <span>
              Актуальная версия настоящей Политики размещается в общем свободном доступе на интернет-сайте
              Оператора и предусматривает возможность ознакомления с ней любых лиц.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">8.</span>
            <span>
              Оператор вправе при необходимости в одностороннем порядке вносить изменения и дополнения в настоящую
              Политику в случае изменения особенностей обработки персональных данных, в том числе в связи
              с изменением законодательства Республики Беларусь.
            </span>
          </li>
        </ol>

        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-[#2E2E2E]">ГЛАВА 2. КАТЕГОРИИ ОБРАБАТЫВАЕМЫХ ФАЙЛОВ COOKIE</h2>
        </div>

        <div className="flex gap-3">
          <span className="font-semibold text-[#18A36C]">9.</span>
          <div>
            <p className="mb-2">
              На интернет-сайте doctorfamily.by обрабатываются следующие категории файлов cookie
              в установленные сроки (сроки хранения):
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-[#18A36C]">
              <li>
                технические (предназначены для корректного функционирования интернет-сайта) — не дольше
                13 месяцев с момента их установки в браузере;
              </li>
              <li>
                целевые/маркетинговые (включают аналитику, функционирование сторонних сервисов, инструменты
                ретаргетинга и иные необязательные технологии) — не дольше 2 лет с момента их установки
                в браузере.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-[#2E2E2E]">ГЛАВА 3. ПРАВОВЫЕ ОСНОВАНИЯ ОБРАБОТКИ ФАЙЛОВ COOKIE</h2>
        </div>

        <ol className="space-y-5">
          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">10.</span>
            <span>
              Технические файлы cookie используются для обеспечения полноценного и корректного функционирования
              интернет-сайта doctorfamily.by и обрабатываются без согласия Пользователя.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">11.</span>
            <span>
              Целевые/маркетинговые файлы cookie обрабатываются на основании согласия Пользователя
              на обработку персональных данных. При первом посещении интернет-сайта Пользователю в окне
              настройки cookie предлагается дать согласие на использование соответствующих категорий файлов
              cookie либо отказаться от их использования.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">12.</span>
            <span className="inline-flex items-center gap-1 flex-wrap">
              Пользователь может в любой момент изменить настройки использования файлов cookie, в том числе
              отозвать ранее предоставленное согласие на их обработку, посредством нажатия на иконку
              <Cookie className="inline-block h-4 w-4 text-[#18A36C]" aria-hidden />
              в нижнем левом углу экрана интернет-сайта.
            </span>
          </li>
        </ol>

        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-[#2E2E2E]">ГЛАВА 4. ТРАНСГРАНИЧНАЯ ПЕРЕДАЧА ФАЙЛОВ COOKIE</h2>
        </div>

        <ol className="space-y-5">
          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">13.</span>
            <span>
              ООО "Доктор Фемели" при использовании сторонних целевых сервисов для обработки файлов cookie
              может осуществлять трансграничную передачу данных, связанных с файлами cookie, третьим лицам
              (поставщикам соответствующих сервисов).
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">14.</span>
            <div>
              <p>
                Трансграничная передача персональных данных может осуществляться как в государства,
                обеспечивающие надлежащий уровень защиты прав субъектов персональных данных, так и в государства,
                не обеспечивающие такой уровень защиты.
              </p>
              <p className="mt-2">
                При трансграничной передаче персональных данных в государства, не обеспечивающие надлежащий
                уровень защиты прав субъектов персональных данных, могут иметь место следующие потенциальные
                риски:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-[#18A36C]">
                <li>
                  отсутствие единого законодательства о защите персональных данных либо эффективной практики
                  его соблюдения;
                </li>
                <li>
                  отсутствие независимого надзорного органа, уполномоченного на защиту прав субъектов
                  персональных данных;
                </li>
                <li>
                  могут быть не предусмотрены как отдельные, так и любые права субъектов персональных данных
                  либо может не обеспечиваться защита прав субъектов персональных данных на уровне, сопоставимом
                  с уровнем в Республике Беларусь;
                </li>
                <li>
                  иностранное законодательство может относить к персональным данным лишь ограниченный перечень
                  сведений о физическом лице.
                </li>
              </ul>
            </div>
          </li>
        </ol>

        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-[#2E2E2E]">
            ГЛАВА 5. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ И ПОРЯДОК ИХ РЕАЛИЗАЦИИ
          </h2>
        </div>

        <ol className="space-y-5">
          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">15.</span>
            <span>
              Перечень прав субъектов персональных данных, а также их содержание и порядок реализации
              определяются законодательством Республики Беларусь и настоящей Политикой. Пользователь вправе
              реализовать право на отзыв согласия на обработку персональных данных (в рамках обработки файлов
              cookie), в том числе способом, предусмотренным пунктом 12 настоящей Политики.
            </span>
          </li>
        </ol>

        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-[#2E2E2E]">
            ГЛАВА 6. ОТКЛЮЧЕНИЕ ФАЙЛОВ COOKIE В НАСТРОЙКАХ БРАУЗЕРА
          </h2>
        </div>

        <ol className="space-y-5">
          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">16.</span>
            <span>
              Большинство браузеров изначально настроены на прием файлов cookie. Пользователь может удалить
              ранее сохраненные файлы cookie, выбрав соответствующую опцию в настройках браузера. Кроме того,
              некоторые браузеры позволяют посещать сайты в режиме инкогнито, чтобы ограничить хранимый
              на пользовательском устройстве объем информации и автоматически удалять некоторые типы файлов cookie.
            </span>
          </li>

          <li className="flex gap-3">
            <span className="font-semibold text-[#18A36C]">17.</span>
            <div>
              <p>
                Пользователь также может отключить использование файлов cookie путем изменения настроек своего
                браузера. Подробнее с параметрами управления файлами cookie можно ознакомиться на официальных
                интернет-сайтах браузеров:
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[#18A36C]">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Google Chrome
                </a>
                <a
                  href="https://support.mozilla.org/ru/kb/uluchshennaya-zashita-ot-otslezhivaniya-v-firefox-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Mozilla Firefox
                </a>
                <a
                  href="https://support.apple.com/ru-ru/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Safari
                </a>
                <a
                  href="https://help.opera.com/ru/latest/web-preferences/#cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Opera
                </a>
                <a
                  href="https://support.microsoft.com/ru-ru/microsoft-edge/удаление-файлов-cookie-в-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  Microsoft Edge
                </a>
              </div>
            </div>
          </li>
        </ol>

        <div className="my-2 h-px w-28 bg-gray-300" />

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#2E2E2E]">
            Перечень третьих лиц, участвующих в обработке файлов cookie
          </h3>

          <div className="space-y-4">
            <div>
              <p className="font-medium text-[#2E2E2E]">Google LLC</p>
              <p>
                Адрес: 1600 Amphitheatre Parkway, Mountain View, California 94043, USA.
              </p>
              <p className="text-sm text-gray-600">
                Используется для аналитики сайта (Google Analytics через Google Tag Manager) при наличии
                согласия Пользователя на целевые/маркетинговые файлы cookie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
