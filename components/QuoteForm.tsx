'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const quoteSchema = z.object({
  eventType: z.string().min(1, 'Event type is required'),
  eventDurationType: z.string().min(1, 'Duration type is required'),
  tentativeDate: z.string().min(1, 'Date is required'),
  selectedDates: z.array(z.string()).optional(),
  attendees: z.string().refine((v) => !isNaN(parseInt(v)) && parseInt(v) >= 1),
  duration: z.string().refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) >= 1),
  services: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  phone: z.string().min(7, 'Phone must be at least 7 digits'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const t = useTranslations('quote.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: t('success') });
        reset();
      } else {
        setMessage({ type: 'error', text: t('error') });
      }
    } catch {
      setMessage({ type: 'error', text: t('error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Proyección',
    'Audio profesional',
    'Iluminación',
    'Catering',
    'Estacionamiento',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t('eventType')}
        </label>
        <input
          {...register('eventType')}
          type="text"
          placeholder="Conferencia, Concierto, etc."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        />
        {errors.eventType && (
          <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t('tentativeDate')}
        </label>
        <input
          {...register('tentativeDate')}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        />
        {errors.tentativeDate && (
          <p className="mt-1 text-sm text-red-600">{errors.tentativeDate.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {t('attendees')}
          </label>
          <input
            {...register('attendees')}
            type="number"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          />
          {errors.attendees && (
            <p className="mt-1 text-sm text-red-600">{errors.attendees.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {t('duration')}
          </label>
          <input
            {...register('duration')}
            type="number"
            min="1"
            step="0.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          {t('services')}
        </label>
        <div className="space-y-2">
          {services.map((service) => (
            <label key={service} className="flex items-center">
              <input
                {...register('services')}
                type="checkbox"
                value={service}
                className="w-4 h-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
              />
              <span className="ml-2 text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t('name')}
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t('email')}
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t('phone')}
        </label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Enviando...' : t('submit')}
      </button>
    </form>
  );
}
