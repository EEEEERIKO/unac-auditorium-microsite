'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { MapWithPin } from '@/components/MapWithPin';
import { Viewer360 } from '@/components/Viewer360';

export default function AuditoriumPage() {
  const t = useTranslations('auditorium');
  const locale = useLocale();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">
            {t('badge')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-8">
            {t('mainTitle').split('de').map((part, i) => (
              i === 0 ? (
                <span key={i}>{part.trim()} de</span>
              ) : (
                <span key={i}><span className="text-primary"> Excelencia Institucional</span></span>
              )
            ))}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            {t('mainDescription')}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-xl h-80 bg-slate-200">
            <picture>
              <source srcSet="/gallery/events-ceremonies/events-ceremonies_22.webp" type="image/webp" />
              <source srcSet="/gallery/events-ceremonies/events-ceremonies_22.jpg" type="image/jpeg" />
              <img
                alt={t('gallery.internationalEvents')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="/gallery/events-ceremonies/events-ceremonies_22.jpg"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-medium">{t('gallery.internationalEvents')}</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl h-80 bg-slate-200">
            <picture>
              <source srcSet="/gallery/setups/setups_02.webp" type="image/webp" />
              <source srcSet="/gallery/setups/setups_02.jpg" type="image/jpeg" />
              <img
                alt={t('gallery.seating')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="/gallery/setups/setups_02.jpg"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-medium">{t('gallery.seating')}</span>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl h-80 bg-slate-200">
            <picture>
              <source srcSet="/gallery/exteriors/exteriors_03.webp" type="image/webp" />
              <source srcSet="/gallery/exteriors/exteriors_03.jpg" type="image/jpeg" />
              <img
                alt={t('gallery.exteriorNatural')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="/gallery/exteriors/exteriors_03.jpg"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-white font-medium">{t('gallery.exteriorNatural')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="bg-white dark:bg-slate-900 py-24 px-6 border-y border-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('virtualTour.title')}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {t('virtualTour.description')}
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <span className="material-icons text-primary flex-shrink-0">check_circle</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {t('virtualTour.feature1')}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-icons text-primary flex-shrink-0">check_circle</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {t('virtualTour.feature2')}
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-icons text-primary flex-shrink-0">check_circle</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {t('virtualTour.feature3')}
                  </p>
                </div>
              </div>
              <button className="mt-8 flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all group">
                <span className="material-icons group-hover:rotate-12 transition-transform">360</span>
                {t('virtualTour.button')}
              </button>
            </div>

            <div className="w-full lg:w-1/2 aspect-video bg-slate-800 rounded-2xl relative overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <Viewer360
                imageSrc="/auditorium-360-dji.jpg"
                alt="Recorrido Virtual 360° Auditorio GW Chapman"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-24 px-6 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('specs.title')}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Capacity Card */}
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-icons text-primary group-hover:text-white transition-colors">groups</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('specs.capacity.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{t('specs.capacity.description')}</p>
              <ul className="text-sm space-y-2 text-slate-500 dark:text-slate-400">
                <li>• {t('specs.capacity.item1')}</li>
                <li>• {t('specs.capacity.item2')}</li>
                <li>• {t('specs.capacity.item3')}</li>
              </ul>
            </div>

            {/* Location Card */}
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-icons text-primary group-hover:text-white transition-colors">location_on</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('specs.location.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{t('specs.location.description')}</p>
              <ul className="text-sm space-y-2 text-slate-500 dark:text-slate-400">
                <li>• {t('specs.location.item1')}</li>
                <li>• {t('specs.location.item2')}</li>
                <li>• {t('specs.location.item3')}</li>
              </ul>
            </div>

            {/* Technology Card */}
            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-icons text-primary group-hover:text-white transition-colors">settings_input_component</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{t('specs.technology.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{t('specs.technology.description')}</p>
              <ul className="text-sm space-y-2 text-slate-500 dark:text-slate-400">
                <li>• {t('specs.technology.item1')}</li>
                <li>• {t('specs.technology.item2')}</li>
                <li>• {t('specs.technology.item3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl font-bold mb-4">{t('location.title')}</h2>
            <p className="text-slate-600 dark:text-slate-400">{t('location.description')}</p>
          </div>

          <div className="w-full">
            <MapWithPin />
          </div>
        </div>
      </section>
    </main>
  );
}
