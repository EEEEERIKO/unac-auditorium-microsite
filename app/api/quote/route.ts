import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const quoteSchema = z.object({
  eventType: z.string().min(1),
  tentativeDate: z.string().min(1),
  attendees: z.number().min(1),
  duration: z.number().min(1),
  services: z.array(z.string()).optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
});

type QuoteData = z.infer<typeof quoteSchema>;

/**
 * Email transporter configuration
 * TODO: Configure with actual email service (Nodemailer, Resend, etc.)
 */
function createTransporter() {
  // Placeholder configuration - Update with real credentials
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Format quote data into HTML email
 */
function formatQuoteEmail(data: QuoteData): string {
  const services = data.services?.join(', ') || 'Ninguno';

  return `
    <h2>Nueva Solicitud de Cotización</h2>
    <p><strong>Tipo de Evento:</strong> ${data.eventType}</p>
    <p><strong>Fecha Tentativa:</strong> ${data.tentativeDate}</p>
    <p><strong>Número de Asistentes:</strong> ${data.attendees}</p>
    <p><strong>Duración:</strong> ${data.duration} horas</p>
    <p><strong>Servicios Requeridos:</strong> ${services}</p>
    
    <hr />
    
    <h3>Información de Contacto</h3>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.phone}</p>
  `;
}

/**
 * POST /api/quote
 * Handle quote request submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = quoteSchema.parse(body);

    // TODO: Implement actual email sending logic
    // For now, this is a placeholder that logs to console
    console.log('Quote request received:', validatedData);

    // Uncomment when email is properly configured:
    /*
    const transporter = createTransporter();
    
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nueva Solicitud de Cotización - ${validatedData.name}`,
      html: formatQuoteEmail(validatedData),
    });

    // Optionally send confirmation email to client
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: validatedData.email,
      subject: 'Solicitud de Cotización Recibida',
      html: `<p>Hemos recibido su solicitud de cotización. Nos contactaremos pronto.</p>`,
    });
    */

    return NextResponse.json(
      { message: 'Solicitud procesada correctamente' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error processing quote:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
