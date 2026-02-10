import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { getPayload } from "payload";
import config from "@/payload.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })
    const siteSettings = await payload.findGlobal({
      slug: 'siteSettings',
    })

    return {
      title: (siteSettings as any).siteName || "BUX&TAXES — бухгалтерия для ИП и ТОО в Казахстане",
      description: (siteSettings as any).siteDescription || "Ведём учёт, налоги, ЭСФ и СНТ.",
    }
  } catch {
    return {
      title: "BUX&TAXES — бухгалтерия для ИП и ТОО в Казахстане",
      description: "Ведём учёт, налоги, ЭСФ и СНТ.",
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://buxtaxes.kz'

  let siteSettings: any = null
  try {
    const payload = await getPayload({ config })
    siteSettings = await payload.findGlobal({
      slug: 'siteSettings',
    })
  } catch {
    // Use defaults if globals not available
  }

  const phone = (siteSettings as any)?.phone || '+7 (777) 123-45-67'
  const address = (siteSettings as any)?.address || 'г. Алматы'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BUX&TAXES',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phone.replace(/\s/g, ''),
      contactType: 'customer service',
      areaServed: 'KZ',
      availableLanguage: ['Russian', 'Kazakh'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
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
