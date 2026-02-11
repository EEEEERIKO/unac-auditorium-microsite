import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('services');

  const services = [
    {
      name: 'Proyección',
      description: 'Sistemas de proyección HD y 4K',
    },
    {
      name: 'Audio Profesional',
      description: 'Equipamiento de sonido de clase mundial',
    },
    {
      name: 'Iluminación',
      description: 'Sistemas de iluminación programables',
    },
    {
      name: 'Catering',
      description: 'Servicios de alimentación y bebidas',
    },
    {
      name: 'Estacionamiento',
      description: 'Amplio estacionamiento para asistentes',
    },
    {
      name: 'Apoyo Técnico',
      description: 'Personal técnico disponible durante el evento',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-12">{t('description')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.name}
            className="border border-gray-200 rounded-lg p-8 hover:border-blue-900 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              {service.name}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
