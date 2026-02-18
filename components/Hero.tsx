'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('home.hero');
  
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Gran Auditorio"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          src="/gallery/exteriors/exteriors_04.jpg"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-primary/90 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl text-white">
          <span className="inline-block py-1 px-3 bg-white/20 backdrop-blur-md rounded text-xs font-bold uppercase tracking-widest mb-4">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1]">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="bg-white text-primary px-8 py-4 rounded font-bold text-sm uppercase tracking-wide hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              {t('cta1')} <span className="material-icons text-sm">arrow_forward</span>
            </Link>
            <Link
              href="/auditorium"
              className="border border-white/40 hover:border-white text-white bg-white/10 backdrop-blur-sm px-8 py-4 rounded font-bold text-sm uppercase tracking-wide transition-all flex items-center gap-2"
            >
              {t('cta2')} <span className="material-icons text-sm">videocam</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
