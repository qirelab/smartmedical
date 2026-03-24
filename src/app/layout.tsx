import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { MenuProvider } from "@/components/SMMenuContext/SMMenuContext";
import { Router } from "@/components/SMRouter/SMRouter";
import { Footer } from "@/components/Footer/Footer";
import { Providers } from "./providers";
import { AIAssistant } from "@/components/AIAssistant/AIAssistant";
import { AnalyticsLoader, CookieConsent } from "@/components/common/CookieConsent";
import { LetterNotifications } from "@/components/LetterNotifications/LetterNotifications";
import { ChatNotifications } from "@/components/ChatNotifications/ChatNotifications";
import { Onboarding } from "@/components/Onboarding";
import { ScrollToTop } from "@/components/common/ScrollToTop/ScrollToTop";

const DEFAULT_SITE_URL = "https://doctorfamily.by";
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXTAUTH_URL ??
  DEFAULT_SITE_URL;

const SITE_ORIGIN = (() => {
  try {
    return new URL(RAW_SITE_URL).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
})();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "Doctor Family | Медицинский центр",
    template: "Doctor Family | %s",
  },
  description: "Doctor Family - медицинский центр нового поколения. Профессиональная медицина, квалифицированные врачи, современное оборудование.",
  keywords: ["Doctor Family", "медицинский центр", "клиника", "врачи", "медицина", "здоровье"],
  robots: {
    index: true,
    follow: true,
  },
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
        <Providers>
          <MenuProvider>
            <Router>
              <AnalyticsLoader />
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
