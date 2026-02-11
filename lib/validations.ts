/**
 * Validation schemas for quote form
 */
import { z } from 'zod';

export const quoteValidationSchema = z.object({
  eventType: z.string().min(1, 'Tipo de evento requerido'),
  tentativeDate: z.string().min(1, 'Fecha requerida'),
  attendees: z.coerce.number().min(1, 'Mínimo 1 asistente'),
  duration: z.coerce.number().min(0.5, 'Duración mínima: 30 minutos'),
  services: z.array(z.string()).optional().default([]),
  name: z.string().min(2, 'Nombre mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'Teléfono inválido'),
});

export type QuoteFormData = z.infer<typeof quoteValidationSchema>;
