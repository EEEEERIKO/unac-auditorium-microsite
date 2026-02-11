'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
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
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">UNAC</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Universidad Adventista de Colombia - Formando para la eternidad. Auditorio GW Chapman es nuestra ventana al mundo académico.
            </p>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Navegación</h5>
            <ul className="space-y-4 text-sm">
              <li><Link className="hover:text-primary transition-colors" href="/auditorium">Sobre el Auditorio</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/services">Servicios Técnicos</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/gallery">Calendario de Eventos</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/quote">Tarifas Corporativas</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Contacto Directo</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">phone</span> +57 (4) 250 8328
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">email</span> auditorio@unac.edu.co
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">schedule</span> Lun - Vie: 08:00 - 18:00
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Certificaciones</h5>
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
          <p className="text-xs text-slate-500">© 2024 Universidad Adventista de Colombia. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-icons">facebook</span>
            </a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-icons">camera_alt</span>
            </a>
            <a className="text-slate-500 hover:text-white transition-colors" href="#">
              <span className="material-icons">youtube_searched_for</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
