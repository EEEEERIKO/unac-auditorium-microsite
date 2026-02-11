'use client';

import { useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const t = useTranslations('common.nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Remove the locale from pathname to get the base path
  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Navigate to the new locale path
      window.location.href = getLocalizedPath(newLocale);
    });
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 transition-opacity ${isPending ? 'opacity-75' : 'opacity-100'}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center">
            <Image 
              src="/logo-unac.png" 
              alt="Logo UNAC" 
              width={48} 
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-primary">UNAC</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
              Auditorio GW Chapman
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-sm font-semibold text-primary" href={`/${locale}`} prefetch={true}>
              {t('home')}
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href={`/${locale}/auditorium`} prefetch={true}>
              {t('auditorium')}
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href={`/${locale}/services`} prefetch={true}>
              {t('services')}
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href={`/${locale}/gallery`} prefetch={true}>
              {t('gallery')}
            </Link>
            <Link
              className="bg-primary text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              href={`/${locale}/quote`}
              prefetch={true}
            >
              {t('quote')}
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center border-l border-slate-200 dark:border-slate-700 pl-8 gap-4 text-[11px] font-bold tracking-wider uppercase">
            <Link
              className={`cursor-pointer transition-all ${locale === 'es' ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-slate-400 hover:text-primary'}`}
              href={getLocalizedPath('es')}
              prefetch={true}
              title="Español"
            >
              ES
            </Link>
            <Link
              className={`cursor-pointer transition-all ${locale === 'en' ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-slate-400 hover:text-primary'}`}
              href={getLocalizedPath('en')}
              prefetch={true}
              title="English"
            >
              EN
            </Link>
            <Link
              className={`cursor-pointer transition-all ${locale === 'pt' ? 'text-primary border-b-2 border-primary pb-0.5' : 'text-slate-400 hover:text-primary'}`}
              href={getLocalizedPath('pt')}
              prefetch={true}
              title="Português"
            >
              PT
            </Link>
          </div>
          
          <button className="lg:hidden text-slate-600">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
