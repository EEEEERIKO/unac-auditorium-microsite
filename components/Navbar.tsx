'use client';

import { useTransition, useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight text-primary uppercase leading-tight">Auditorio GW Chapman</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">UNAC - Corporación Universitaria</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Desktop Navigation */}
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
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            aria-label="Toggle menu"
            title="Menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          
          <div className="flex items-center border-l border-slate-200 dark:border-slate-700 ml-2 lg:ml-4 pl-4 lg:pl-8">
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

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            <Link 
              className={`block px-4 py-2 rounded transition-colors ${pathname === `/${locale}` || pathname === `/${locale}/` ? 'bg-primary text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              href={`/${locale}`}
              onClick={closeMobileMenu}
              prefetch={true}
            >
              {t('home')}
            </Link>
            <Link 
              className={`block px-4 py-2 rounded transition-colors ${pathname.includes('/auditorium') ? 'bg-primary text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              href={`/${locale}/auditorium`}
              onClick={closeMobileMenu}
              prefetch={true}
            >
              {t('auditorium')}
            </Link>
            <Link 
              className={`block px-4 py-2 rounded transition-colors ${pathname.includes('/services') ? 'bg-primary text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              href={`/${locale}/services`}
              onClick={closeMobileMenu}
              prefetch={true}
            >
              {t('services')}
            </Link>
            <Link 
              className={`block px-4 py-2 rounded transition-colors ${pathname.includes('/gallery') ? 'bg-primary text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              href={`/${locale}/gallery`}
              onClick={closeMobileMenu}
              prefetch={true}
            >
              {t('gallery')}
            </Link>
            <Link
              className={`block px-4 py-2 rounded font-bold transition-all ${pathname.includes('/quote') ? 'bg-primary text-white shadow-lg' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white hover:shadow-lg'}`}
              href={`/${locale}/quote`}
              onClick={closeMobileMenu}
              prefetch={true}
            >
              {t('quote')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
