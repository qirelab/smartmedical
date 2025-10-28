import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Providers from './providers';
import Footer from '@/components/Footer/Footer';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Smart Medical - Современная медицинская клиника",
  description: "Профессиональная медицина нового уровня в Минске",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={montserrat.className}>
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
