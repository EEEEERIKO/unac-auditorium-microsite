'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const galleryImages = [
  {
    id: 'mainHall',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGobukvzy8XHHzrjNTLjdev-ATSLatRprIsuNG1v-h9I3I1NgU9wwh7U1thHoG2mMTBN-5I8og3FrQ6V2mT2DOMRB0sw7ysIxVJoDSEGQDjkzl86MOHEzAtZBQFjuNhh_YPMrTmMXaeQmIlaQoNyYtFjFKRF_7JJrVVPkhew5nLIJi0-g7RgfXT7VPQg5bYItxjoRDjop5cRsvx5N3ENnabRha8QprTxUJfzAzb5FwxRx0WlojlcVHI56SnA2rHY0dqI29hV5MsKsb',
    category: 'architecture',
    large: true,
    wide: false
  },
  {
    id: 'symposia',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYeyjHEKMJnp160KvTlDyYztsLcHhBu6dy91Jh95J4KwQDqi2IBJ6EZhmELvuGh5gFeJT2I4Nhrt9Fw5XWTHwC52FZb7Nzi-75MjqTy5N4MF4rlcGa-1yh8T9XWPZIFW2rZ4tXdfqjySv6QX2l6imUVDMcMI0EPQpVWQ1raPJsxe9sECcVGJBF6an0m5REd-NZcI7xTuKT4G5g2pjPtEMXbC6y6KCR_jZLoU6gSZb-DY6y7hgTmbNJsf5aNLEEq_dJCwhEtomMvxjT',
    category: 'events',
    large: false,
    wide: true
  },
  {
    id: 'plaza',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJkVfhHbmIfA4RuuVTuYV-COS_sWJezyKPScXTCK4IWFRKnqgE3LJtC3IG6yAjkkshJW_vqbfhNxDWS5AYUHaT37XJRh7t37EWuJqFDI7IIXspom5i4gK-mU0v4CLxwTCKroRo5tjJ3btaiF2N_bZTmAQnZiJAgK0QidVCRKzA5TiaFN9HpPyy2Oy1ox3guevjV88fhJFiydPB_RepaBKQOhjEvHNoXQDGBGWSdAw59qs8zBax5TVu_n_JZWbMfVXen_BU0JeTImQW',
    category: 'exteriors',
    large: false,
    wide: false
  },
  {
    id: 'keynote',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuB2v2Z959hmPcwx1M11eYTxl71rwRVz2NpaX3JY0A-AvTWhnMvy_vSRpDno2fJYuNzxWWmo8Y6oPCB9MeWv7hzbWPBI5CVYZAL4eamdRnAY0jxSUfueBheX85cleKQmei3imkdLuImrihdBNlFcZm4dp-yL5AL_OMOALVNJameck0iBTep8m8vgnAXiY7Z0ywRaSiOWu-KpSDKO3T3ztWpRJrz1Fzdt_MhqXu7tsWrKZyRlu83c__zEcnWirH-6Vv5GpmkqCDv7Jb',
    category: 'setups',
    large: false,
    wide: false
  },
  {
    id: 'banquets',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvg5xcqXGymkRBhJ7XC8sULzba1Juyu9Q_Qt1n_NBXHCO6LfJ2_bLreaJ4lWRlXBAVBhDqIyufz4ijWGp3aFa4ivurW-XcBLE2FAkGLgk7rx9Zpvmk8k7qWd_RMqUsA-1-qn9fMfof8MyCJhY3QuDIW_28Nnr8CNJDpMcwXegwz7j1_CpIKAY8j3yd6AXFlHVqxJRFxXtgr6AUkHmIMKIoOg0JQe_A08fBEKodviIDd5Qo2ZQ3GM80HIIIq6K1cKgph-4pYP2dyrjT',
    category: 'setups',
    large: false,
    wide: true
  },
  {
    id: 'seating',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDTRDJxfh4ozmmexl_4GfTIjoHWIE6KuHIISa9j3q4JwKW5CV6vP19jp_SNeEgL2qrmalxcLA91rjhP9TM-jJ-13un-jv8tYS2O8HYXrJ6r8YAl5nEyPafw1hej7S6fEWs6LQ3wYtTQpDslLvHaLTwZ-waO9cQzpCjzyPAzDhK1EEVaWtDTSLdqfSyG_Dc5Ol2BC4ILOqbN4p67ShbJ1S5Vt3TLUO8vUTQEzybnkz-WzIqfX7y2i5tPhTveLUHOrkQYa4e5I0s8qMn',
    category: 'architecture',
    large: true,
    wide: false
  },
  {
    id: 'evening',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5_7SgJS-7W3K5DicF2iKo4ikDepIHvo7ju88GQ5tqMn3_-wR47z22E6Hg2N4MCoWY22RG56cy_8z3Qg_ikRLdtjlBabDLtmY32hQDC-ih-8bEroTFRFekd__urIT4Nqjc-7gPmZgxjfJ0OhKdiL0_jfO5YG4vYIbZ7HzFsLVckSHgtCgS9oZEogipn3Qhbifg7L-y2EHsgBreLwC4YPbjrJ7xvGBsfvF3sACAArIk8MnWVMLFpYLDRuk96USMIHFHGSOVm7BkNw51',
    category: 'exteriors',
    large: false,
    wide: false
  },
  {
    id: 'technology',
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCSkD2IJXhZysduyiLGqHTnmKrl7mmU8blvF8FZ8eDpQZSS7eGmihWxavEmTXsRWIGrFiZNAISSZ490qC1lTyFEK-MpK32MPG9PhRz64lSibbgwHxpgsjCQZ_C3d97flnS91aGnzaMXf5nFXZA3Hy-PA8yMqJfJRUAjtxlN07J0JgrmGENO7NpnHV7FVBWVTmdAKlmU0uUz8E1CXPxzchHZ4kx4XcjsyQ8Mozggygy8xvucGHX2yO1G93bFjZR34B8KyqWCaW0imLm',
    category: 'technology',
    large: false,
    wide: false
  }
];

export default function GalleryPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const filterOptions = [
    { key: 'all', label: t('gallery.filters.all') },
    { key: 'architecture', label: t('gallery.filters.architecture') },
    { key: 'events', label: t('gallery.filters.events') },
    { key: 'setups', label: t('gallery.filters.setups') },
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
      <div className="gallery-grid gap-6">
        {filteredImages.map(image => (
          <div
            key={image.id}
            className={`gallery-item relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 group ${
              image.large ? 'row-span-2' : ''
            } ${image.wide ? 'col-span-2' : ''}`}
          >
            <img
              alt={t(`gallery.items.${image.id}.title`)}
              className="w-full h-full object-cover"
              src={image.src}
            />
            <div className="hover-overlay absolute inset-0 bg-[#295787]/90 flex flex-col justify-end p-6 md:p-8 text-white">
              <span className="text-xs uppercase tracking-widest font-bold opacity-80 mb-2">
                {t(`gallery.items.${image.id}.category`)}
              </span>
              <h3 className={`font-bold mb-2 ${image.large || image.wide ? 'text-2xl' : 'text-lg'}`}>
                {t(`gallery.items.${image.id}.title`)}
              </h3>
              {(() => {
                const description = t(`gallery.items.${image.id}.description`);
                return description && description.trim() ? (
                  <p className="text-sm text-white/80">
                    {description}
                  </p>
                ) : null;
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-20 bg-[#295787] rounded-2xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">
            {t('gallery.cta.title')}
          </h3>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            {t('gallery.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-[#295787] px-8 py-3 rounded-lg font-bold hover:bg-opacity-95 transition-all">
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
