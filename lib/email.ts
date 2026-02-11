/**
 * Email utility functions
 * Configure with actual email provider (Nodemailer, Resend, etc.)
 */

import nodemailer from 'nodemailer';
import type { QuoteFormData } from './validations';

export async function sendQuoteEmail(data: QuoteFormData): Promise<boolean> {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Email not configured - quote stored locally only');
      return true; // Return success but log warning
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = formatQuoteHTML(data);

    // Send to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Nueva Solicitud de Cotización - ${data.name}`,
      html: htmlContent,
      replyTo: data.email,
    });

    // Send confirmation to client
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: data.email,
      subject: 'Solicitud de Cotización Recibida - Auditorio GW Chapman',
      html: getConfirmationEmail(data.name),
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

function formatQuoteHTML(data: QuoteFormData): string {
  const services = data.services?.length ? data.services.join(', ') : 'Ninguno';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #001f3f; color: white; padding: 20px; border-radius: 4px; }
          .content { margin: 20px 0; }
          .field { margin: 15px 0; }
          .label { font-weight: bold; color: #001f3f; }
          .divider { border-top: 1px solid #ddd; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nueva Solicitud de Cotización</h2>
          </div>
          
          <div class="content">
            <h3>Detalles del Evento</h3>
            <div class="field">
              <span class="label">Tipo de Evento:</span> ${data.eventType}
            </div>
            <div class="field">
              <span class="label">Fecha Tentativa:</span> ${new Date(data.tentativeDate).toLocaleDateString('es-CO')}
            </div>
            <div class="field">
              <span class="label">Número de Asistentes:</span> ${data.attendees}
            </div>
            <div class="field">
              <span class="label">Duración:</span> ${data.duration} horas
            </div>
            <div class="field">
              <span class="label">Servicios Requeridos:</span> ${services}
            </div>

            <div class="divider"></div>

            <h3>Información de Contacto</h3>
            <div class="field">
              <span class="label">Nombre:</span> ${data.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
            </div>
            <div class="field">
              <span class="label">Teléfono:</span> ${data.phone}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function getConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #001f3f; color: white; padding: 20px; border-radius: 4px; }
          .content { margin: 20px 0; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>¡Solicitud Recibida!</h2>
          </div>
          
          <div class="content">
            <p>Estimado(a) ${name},</p>
            
            <p>Agradecemos tu interés en el Auditorio GW Chapman de la Universidad Adventista de Colombia.</p>
            
            <p>Hemos recibido tu solicitud de cotización. Nuestro equipo revisará los detalles y se contactará contigo en breve con una propuesta personalizada.</p>
            
            <p>Si tienes alguna pregunta en el interim, no dudes en contactarnos.</p>
            
            <p>Cordialmente,<br/>
            Equipo del Auditorio GW Chapman<br/>
            Universidad Adventista de Colombia</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
