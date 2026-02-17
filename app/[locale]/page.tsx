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

      {/* CTA Section - Cotización */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-primary to-blue-800 overflow-hidden">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2">
              <span className="material-icons-outlined text-white text-lg">event</span>
              <span className="text-white text-sm font-semibold">{t('cta.badge')}</span>
            </div>
          </div>

          {/* Título Principal */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t('cta.title')} <span className="text-yellow-300">{t('cta.titleHighlight')}</span>
          </h2>

          {/* Descripción */}
          <p className="text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>

          {/* Beneficios rápidos */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <span className="material-icons text-yellow-300 text-3xl block mb-2">check_circle</span>
              <p className="text-white text-sm font-semibold">{t('cta.benefits.tech')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <span className="material-icons text-yellow-300 text-3xl block mb-2">group</span>
              <p className="text-white text-sm font-semibold">{t('cta.benefits.capacity')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <span className="material-icons text-yellow-300 text-3xl block mb-2">support_agent</span>
              <p className="text-white text-sm font-semibold">{t('cta.benefits.support')}</p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={`/${locale}/quote`}
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold py-4 px-12 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            {t('cta.buttonText')}
          </Link>

          {/* Texto secundario */}
          <p className="text-white/70 text-sm mt-8">
            {t('cta.footer')}
          </p>
        </div>
      </section>
    </div>
  );
}
