import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Auditorio GW Chapman | UNAC - Excelencia Institucional',
  description: 'Un espacio de vanguardia diseñado para la difusión del conocimiento, el arte y el protocolo institucional en la Universidad Adventista de Colombia.',
  viewport: 'width=device-width, initial-scale=1',
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
