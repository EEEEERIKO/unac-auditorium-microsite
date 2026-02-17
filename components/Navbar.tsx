'use client';

import { useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export function Navbar() {
  const t = useTranslations('common.nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Remove the locale from pathname to get the base path
  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Navigate to the new locale path without scrolling
      router.replace(getLocalizedPath(newLocale), { scroll: false });
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 flex items-center justify-center">
            <Image 
              src="/logo-unac.png" 
              alt="Logo UNAC" 
              width={48} 
              height={48}
              className="object-contain w-auto h-auto"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary uppercase leading-tight">Auditorio GW Chapman</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">UNAC - Corporación Universitaria</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link 
              className={`transition-colors ${pathname === `/${locale}` || pathname === `/${locale}/` ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
              href={`/${locale}`} 
              prefetch={true}
            >
              {t('home')}
            </Link>
            <Link 
              className={`transition-colors ${pathname.includes('/auditorium') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
              href={`/${locale}/auditorium`} 
              prefetch={true}
            >
              {t('auditorium')}
            </Link>
            <Link 
              className={`transition-colors ${pathname.includes('/services') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
              href={`/${locale}/services`} 
              prefetch={true}
            >
              {t('services')}
            </Link>
            <Link 
              className={`transition-colors ${pathname.includes('/gallery') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
              href={`/${locale}/gallery`} 
              prefetch={true}
            >
              {t('gallery')}
            </Link>
            <Link
              className={`transition-all px-4 py-2 rounded-lg font-bold ${pathname.includes('/quote') ? 'bg-primary text-white shadow-lg' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-lg'}`}
              href={`/${locale}/quote`}
              prefetch={true}
            >
              {t('quote')}
            </Link>
          </nav>
          
          <div className="flex items-center border-l border-slate-200 dark:border-slate-700 ml-4 pl-8">
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
              <button
                onClick={() => handleLanguageChange('es')}
                disabled={isPending}
                className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider transition-all cursor-pointer ${
                  locale === 'es'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:bg-white hover:shadow-sm hover:text-primary'
                }`}
                title="Español"
              >
                ES
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                disabled={isPending}
                className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider transition-all cursor-pointer ${
                  locale === 'en'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:bg-white hover:shadow-sm hover:text-primary'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('pt')}
                disabled={isPending}
                className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider transition-all cursor-pointer ${
                  locale === 'pt'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-400 hover:bg-white hover:shadow-sm hover:text-primary'
                }`}
                title="Português"
              >
                PT
              </button>
            </div>
            <div className="ml-3 text-primary">
              <span className="material-icons text-lg">language</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
