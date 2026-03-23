import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { MenuProvider } from "@/components/SMMenuContext/SMMenuContext";
import { Router } from "@/components/SMRouter/SMRouter";
import { Footer } from "@/components/Footer/Footer";
import { Providers } from "./providers";
import { AIAssistant } from "@/components/AIAssistant/AIAssistant";
import { CookieConsent } from "@/components/common/CookieConsent";
import { LetterNotifications } from "@/components/LetterNotifications/LetterNotifications";
import { ChatNotifications } from "@/components/ChatNotifications/ChatNotifications";
import { Onboarding } from "@/components/Onboarding";
import { ScrollToTop } from "@/components/common/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Doctor Family | Медицинский центр",
    template: "Doctor Family | %s",
  },
  description: "Doctor Family - медицинский центр нового поколения. Профессиональная медицина, квалифицированные врачи, современное оборудование.",
  keywords: ["Doctor Family", "медицинский центр", "клиника", "врачи", "медицина", "здоровье"],
  openGraph: {
    title: "Doctor Family | Медицинский центр",
    description: "Doctor Family - медицинский центр нового поколения. Профессиональная медицина, квалифицированные врачи, современное оборудование.",
    type: "website",
    locale: "ru_RU",
  },
  other: {
    "google-site-verification": "NUjY_sKrw9bPqT6Ikj1ZfnKlGoBCyeOLf8cyZKcbh3g",
    "yandex-verification": "24d4124c8d0eaaed",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'var(--font-inter)' }}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRGCJ744"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MRGCJ744');`,
          }}
        />

        <Providers>
          <MenuProvider>
            <Router>
              <ScrollToTop />
              <Header />
              <main>{children}</main>
              <Footer />
              <AIAssistant />
              <CookieConsent />
              <LetterNotifications />
              <ChatNotifications />
              <Onboarding />
            </Router>
          </MenuProvider>
        </Providers>
      </body>
    </html>
  );
}
