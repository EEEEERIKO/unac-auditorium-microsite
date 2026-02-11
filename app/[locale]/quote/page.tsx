import { useTranslations } from 'next-intl';
import { QuoteForm } from '@/components/QuoteForm';

export default function QuotePage() {
  const t = useTranslations('quote');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-600">
            [Imagen interactiva del auditorio - Placeholder]
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Complete el formulario
          </h2>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
