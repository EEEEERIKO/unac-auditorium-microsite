'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations('common.footer');
  const locale = useLocale();
  
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 flex items-center justify-center">
                <Image 
                  src="/logo-unac.png" 
                  alt="Logo UNAC" 
                  width={48} 
                  height={48}
                  className="object-contain w-auto h-auto"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">UNAC</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('description')}
            </p>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">{t('navigation.title')}</h5>
            <ul className="space-y-4 text-sm">
              <li><Link className="hover:text-primary transition-colors" href={`/${locale}/auditorium`}>{t('navigation.about')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" href={`/${locale}/services`}>{t('navigation.services')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" href={`/${locale}/gallery`}>{t('navigation.events')}</Link></li>
              <li><Link className="hover:text-primary transition-colors" href={`/${locale}/quote`}>{t('navigation.pricing')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">{t('contact.title')}</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">phone</span> {t('contact.phone')}
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">email</span> {t('contact.email')}
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">schedule</span> {t('contact.schedule')}
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">{t('certifications.title')}</h5>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                <span className="text-[10px] font-bold">ISO</span>
              </div>
              <div className="w-12 h-12 bg-slate-800 rounded border border-slate-700 flex items-center justify-center">
                <span className="text-[10px] font-bold">AAC</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">{t('copyright')}</p>
          <div className="flex gap-6">
            <a className="text-slate-500 hover:text-white transition-colors" href="https://www.facebook.com/Corporacionuniversitariaadventista/?locale=es_LA" target="_blank" rel="noopener noreferrer" title="Facebook">
              <span className="material-icons text-xl">facebook</span>
            </a>
            <a className="text-slate-500 hover:text-white transition-colors" href="https://www.instagram.com/unaccolombia/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <span className="material-icons text-xl">photo_camera</span>
            </a>
            <a className="text-slate-500 hover:text-white transition-colors" href="https://www.youtube.com/@canalunac" target="_blank" rel="noopener noreferrer" title="YouTube">
              <span className="material-icons text-xl">play_circle_filled</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
