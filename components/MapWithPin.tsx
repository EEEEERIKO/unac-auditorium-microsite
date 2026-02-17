'use client';

export function MapWithPin() {
  const lat = 6.241243939156348;
  const lng = -75.60904182032434;
  const googleMapsUrl = `https://www.google.com/maps/place/Auditorio+G.W+Chapman/@6.2413499,-75.6096573,17.66z/data=!4m10!1m2!2m1!1sAuditorio+G.W+Chapman!3m6!1s0x8e44293a8de3422f:0x64e772a18d54c281!8m2!3d6.2412207!4d-75.6089676!15sChVBdWRpdG9yaW8gRy5XIENoYXBtYW6SAQphdWRpdG9yaXVt4AEA!16s%2Fg%2F11qgjqr2wg?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D`;

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl relative">
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.005},${lat - 0.005},${lng + 0.005},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`}
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
        loading="lazy"
      />
      {/* Pin Info Card - Clickeable */}
      <a 
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-200 dark:border-slate-700 z-20 max-w-xs hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <span className="material-icons text-red-600 text-2xl flex-shrink-0 mt-1">location_on</span>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm hover:text-primary transition-colors">Auditorio G.W Chapman</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Cra. 84 #33 AA-1</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">Medellín, Antioquia</p>
            <p className="text-xs text-primary font-semibold mt-2">Ver en Google Maps →</p>
          </div>
        </div>
      </a>
    </div>
  );
}
