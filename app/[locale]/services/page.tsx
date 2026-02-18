'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-background-dark py-16 lg:py-24 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">{t('badge')}</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">{t('title')}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">{t('description')}</p>
          </div>
          <div className="relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
            <picture>
              <source srcSet="/gallery/events-ceremonies/events-ceremonies_16.webp" type="image/webp" />
              <source srcSet="/gallery/events-ceremonies/events-ceremonies_16.jpg" type="image/jpeg" />
              <img
                alt="Auditorium View"
                className="w-full h-full object-cover"
                src="/gallery/events-ceremonies/events-ceremonies_16.jpg"
                loading="lazy"
              />
            </picture>
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* Included Services Section */}
      <section className="bg-white dark:bg-background-dark py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-4 border-primary pl-6">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('included.title')}</h3>
              <p className="text-slate-600 dark:text-slate-400">{t('included.subtitle')}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-icons-outlined text-primary">check_circle</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('included.auditorium.title')}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t('included.auditorium.description')}</p>
            </div>
            <div className="group p-8 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-icons-outlined text-primary">chair</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('included.seating.title')}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t('included.seating.description')}</p>
            </div>
            <div className="group p-8 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-icons-outlined text-primary">layers</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('included.stage.title')}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t('included.stage.description')}</p>
            </div>
            <div className="group p-8 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-icons-outlined text-primary">groups</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('included.staff.title')}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t('included.staff.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Add-ons Section */}
      <section className="bg-neutral-light dark:bg-slate-900/30 py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('addons.title')}</h3>
            <p className="text-slate-600 dark:text-slate-400">{t('addons.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-white dark:bg-background-dark p-8 rounded-xl shadow-lg border border-transparent hover:border-primary transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-outlined">surround_sound</span>
              </div>
              <div className="pt-6 text-center">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('addons.sound.title')}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{t('addons.sound.description')}</p>
                <ul className="text-left space-y-3">
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-icons-outlined text-xs text-primary">add</span>
                    {t('addons.sound.feature1')}
                  </li>
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-icons-outlined text-xs text-primary">add</span>
                    {t('addons.sound.feature2')}
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative bg-white dark:bg-background-dark p-8 rounded-xl shadow-lg border border-transparent hover:border-primary transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-outlined">settings_input_component</span>
              </div>
              <div className="pt-6 text-center">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('addons.projection.title')}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{t('addons.projection.description')}</p>
                <ul className="text-left space-y-3">
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-icons-outlined text-xs text-primary">add</span>
                    {t('addons.projection.feature1')}
                  </li>
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-icons-outlined text-xs text-primary">add</span>
                    {t('addons.projection.feature2')}
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative bg-white dark:bg-background-dark p-8 rounded-xl shadow-lg border border-transparent hover:border-primary transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-outlined">engineering</span>
              </div>
              <div className="pt-6 text-center">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('addons.technical.title')}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{t('addons.technical.description')}</p>
                <ul className="text-left space-y-3">
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-icons-outlined text-xs text-primary">add</span>
                    {t('addons.technical.feature1')}
                  </li>
                  <li className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="material-icons-outlined text-xs text-primary">add</span>
                    {t('addons.technical.feature2')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Logistics Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl overflow-hidden grid lg:grid-cols-5 items-stretch">
          <div className="lg:col-span-2 p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('location.title')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{t('location.description')}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-icons-outlined text-primary">place</span>
                <span className="text-sm font-medium">{t('location.campus')}</span>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-icons-outlined text-primary">local_parking</span>
                <span className="text-sm font-medium">{t('location.parking')}</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 min-h-[300px] relative">
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
              <picture>
                <source srcSet="/gallery/campus/campus-aerial.webp" type="image/webp" />
                <source srcSet="/gallery/campus/campus-aerial.jpg" type="image/jpeg" />
                <img
                  className="w-full h-full object-cover"
                  src="/gallery/campus/campus-aerial.jpg"
                  alt="Campus Map"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA Section */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hidden md:block">
            <p className="text-slate-900 dark:text-white font-bold">{t('cta.title')}</p>
            <p className="text-xs text-slate-500">{t('cta.subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/quote`}
            prefetch={true}
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group"
          >
            {t('cta.button')}
            <span className="material-icons-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Spacing for fixed bottom section */}
      <div className="h-24"></div>
    </main>
  );
}
