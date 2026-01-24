import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "BUX&TAXES — бухгалтерия для ИП и ТОО в Казахстане",
  description: "Ведём учёт, налоги, ЭСФ и СНТ. Берём на себя отчёты и общение с налоговой.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://buxtaxes.kz'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BUX&TAXES',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-777-123-4567',
      contactType: 'customer service',
      areaServed: 'KZ',
      availableLanguage: ['Russian', 'Kazakh'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'пр. Аль-Фараби 17, БЦ Нурлы Тау',
      addressLocality: 'Алматы',
      addressCountry: 'KZ',
    },
  }

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-manrope antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
