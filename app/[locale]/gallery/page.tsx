import { useTranslations } from 'next-intl';

export default function GalleryPage() {
  const t = useTranslations('gallery');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-12">{t('description')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-gray-300 rounded-lg h-64 flex items-center justify-center hover:shadow-lg transition"
          >
            <p className="text-gray-600">[Imagen {item}]</p>
          </div>
        ))}
      </div>
    </div>
  );
}
