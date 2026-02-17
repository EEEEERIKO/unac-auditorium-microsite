import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Auditorio GW Chapman | UNAC - Excelencia Institucional',
  description: 'Un espacio de vanguardia diseñado para la difusión del conocimiento, el arte y el protocolo institucional en la Universidad Adventista de Colombia.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="light">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-unac.png?v=2" />
        <meta name="theme-color" content="#295787" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
