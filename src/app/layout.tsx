import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { MenuProvider } from "@/components/SMMenuContext/SMMenuContext";
import { Router } from "@/components/SMRouter/SMRouter";
import { Footer } from "@/components/Footer/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Медицинский центр Doctor Family",
  description: "Профессиональная медицина нового уровня",
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
              <Header />
              <main>{children}</main>
              <Footer />
            </Router>
          </MenuProvider>
        </Providers>
      </body>
    </html>
  );
}
