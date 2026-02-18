'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import { galleryImages } from '@/lib/gallery-config';

export default function GalleryPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const filterOptions = [
    { key: 'all', label: t('gallery.filters.all') },
    { key: 'events-ceremonies', label: t('gallery.filters.eventsCeremonies') },
    { key: 'setups', label: t('gallery.filters.setups') },
    { key: 'interior', label: t('gallery.filters.interior') },
    { key: 'exteriors', label: t('gallery.filters.exteriors') }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {t('gallery.title')}
        </h2>
        <div className="w-20 h-1.5 bg-[#295787] rounded-full mb-6 md:mx-0 mx-auto"></div>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
          {t('gallery.description')}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-12">
        {filterOptions.map(option => (
          <button
            key={option.key}
            onClick={() => setFilter(option.key)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === option.key
                ? 'bg-[#295787] text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-[#295787]/10 hover:text-[#295787] border border-slate-200 dark:border-slate-700'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
        {filteredImages.map(image => (
          <div
            key={image.id}
            className={`relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 group cursor-pointer ${
              image.size === 'large' ? 'md:row-span-2 md:col-span-2' : ''
            } ${image.size === 'wide' ? 'md:col-span-2' : ''}`}
          >
            {/* Optimized Next.js Image with Lazy Loading */}
            <Image
              alt={`Gallery image ${image.id}`}
              src={image.webp}
              width={600}
              height={400}
              loading="lazy"
              quality={75}
              className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#295787]/0 group-hover:bg-[#295787]/90 transition-colors duration-300 flex items-center justify-center">
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold mb-2">
                  <span className="material-icons-outlined text-yellow-300">image</span>
                  {t(`gallery.categories.${image.category}`)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#295787] to-[#1a3a54] rounded-2xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">
            {t('gallery.cta.title')}
          </h3>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {t('gallery.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-[#295787] px-8 py-3 rounded-lg font-bold hover:bg-opacity-95 transition-all shadow-lg hover:shadow-xl">
              {t('gallery.cta.button1')}
            </button>
            <button className="bg-[#295787] border border-white/30 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all">
              {t('gallery.cta.button2')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
