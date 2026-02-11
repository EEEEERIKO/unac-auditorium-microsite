'use client';

import { lazy, Suspense } from 'react';
import { Hero } from '@/components/Hero';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();
  
  return (
    <div>
      <Hero />
      
      {/* Un Legado de Compromiso Académico */}
      <section className="py-24 bg-white dark:bg-background-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <h3 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">
              {t('legacy.title')}
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              {t('legacy.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Eventos Soportados */}
      <section className="py-24 bg-background-light dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">
                {t('events.badge')}
              </h4>
              <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
                {t('events.title')}
              </h3>
            </div>
            <p className="max-w-md text-slate-600 dark:text-slate-400">
              {t('events.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-background-dark p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons text-3xl">school</span>
              </div>
              <h5 className="text-xl font-bold mb-4">{t('events.conference.title')}</h5>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t('events.conference.description')}
              </p>
              <Link className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href={`/${locale}/services`}>
                {t('events.conference.link')} <span className="material-icons text-sm">chevron_right</span>
              </Link>
            </div>
            
            <div className="group bg-white dark:bg-background-dark p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons text-3xl">music_note</span>
              </div>
              <h5 className="text-xl font-bold mb-4">{t('events.concert.title')}</h5>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t('events.concert.description')}
              </p>
              <Link className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href={`/${locale}/services`}>
                {t('events.concert.link')} <span className="material-icons text-sm">chevron_right</span>
              </Link>
            </div>
            
            <div className="group bg-white dark:bg-background-dark p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons text-3xl">workspace_premium</span>
              </div>
              <h5 className="text-xl font-bold mb-4">{t('events.graduation.title')}</h5>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t('events.graduation.description')}
              </p>
              <Link className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all" href={`/${locale}/services`}>
                {t('events.graduation.link')} <span className="material-icons text-sm">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Infraestructura de Clase Mundial */}
      <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-3xl font-bold mb-16">{t('infrastructure.title')}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex gap-6 p-8 rounded-xl bg-background-light dark:bg-slate-900/30 items-start border border-primary/5">
              <span className="material-icons text-primary text-4xl">location_on</span>
              <div>
                <h6 className="font-bold text-lg mb-2">{t('infrastructure.location.title')}</h6>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t('infrastructure.location.description')}
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 p-8 rounded-xl bg-background-light dark:bg-slate-900/30 items-start border border-primary/5">
              <span className="material-icons text-primary text-4xl">groups</span>
              <div>
                <h6 className="font-bold text-lg mb-2">{t('infrastructure.capacity.title')}</h6>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t('infrastructure.capacity.description')}
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 p-8 rounded-xl bg-background-light dark:bg-slate-900/30 items-start border border-primary/5">
              <span className="material-icons text-primary text-4xl">settings_input_component</span>
              <div>
                <h6 className="font-bold text-lg mb-2">{t('infrastructure.technical.title')}</h6>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t('infrastructure.technical.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa / Ubicación */}
      <section className="relative h-[400px]">
        <img
          alt="Ubicación UNAC"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRLMQjBD_d6ACKtKRk8awpXvULOxCx0XviBhlO8-d0eF0sazjVhSoeWvL50BaQ59HIxlD0hUPmkNzY0yFP14M3cqaIR3mdoN5-IOiqhXOTlMKlWPzHkJSagCl9t9Ej8SCqe-bnJKqIx6h3NvnEPThZ68xTyf5AriYxILvNnFUxBmF9GNl1A1lO2g86QFFaglAhJQbVl773hG7LRljYAhxcAVQxQRPhSLJtZj6r1T4gANl2OfBd2fvJyE0zaRmtijMEYpuKexUEJqEw"
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white dark:bg-background-dark p-8 rounded-xl shadow-2xl max-w-sm text-center">
            <span className="material-icons text-primary text-5xl mb-4">place</span>
            <h4 className="text-xl font-bold mb-2">{t('map.title')}</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
              {t('map.address')}
            </p>
            <a
              className="text-primary font-bold hover:underline"
              href="https://maps.google.com/?q=Universidad+Adventista+de+Colombia"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('map.link')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
