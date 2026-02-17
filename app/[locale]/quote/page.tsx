'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

export default function QuotePage() {
  const t = useTranslations('quote');
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    attendees: '',
    duration: '',
    sound: false,
    lighting: false,
    streaming: false,
    projection: false,
    recording: false,
    itSupport: false,
    fullName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Integrar con servicio de email
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
      {/* Left side - Image */}
      <div className="relative w-full lg:w-5/12 xl:w-1/2 min-h-[400px] lg:min-h-[calc(100vh-80px)] overflow-hidden">
        <img 
          alt="Auditorio GW Chapman" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASSWt-D112SbZf2z5AKWcIgqItVBqrofzm4-LQvcXU6IPZg-TpqROmD07agwrrxwGmnbnBGCYBaB7pGeOgr-vdEzFyVDAOfBQPczfDYgwvM39CyZJiUuRAJ41UqfY55ep-ADJtgkNOnKe99Xc1XB6Ui2anu1jqqoRqTS2AW59QYsrqDwMl63_0FSMyGfNnry4yAswiYeNi-qfjcQzygWr61jt0xXkEvA7lBVkvlGdaZqEHSi0k89DXG9itevoK6HApgkU-N817TB87"
        />
        <div className="absolute inset-0 bg-[#295787]/30 mix-blend-multiply transition-opacity duration-700 hover:opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 lg:p-16 text-white max-w-2xl">
          <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-[#295787]/20 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider">
            {t('title')}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">Auditorio<br/>GW Chapman</h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-md">
            {t('description')}
          </p>
          <div className="mt-8 flex gap-4">
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[#295787]/40 text-sm">check_circle</span>
              <span className="text-sm font-medium">500+ Capacidad</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-[#295787]/40 text-sm">check_circle</span>
              <span className="text-sm font-medium">4K Streaming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col items-center justify-center p-6 lg:p-16 pt-24 lg:pt-16 bg-white dark:bg-slate-900">
        <div className="w-full max-w-xl">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('title')}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t('description')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#295787]/10 flex items-center justify-center text-[#295787]">
                  <span className="material-icons-outlined text-sm">event</span>
                </span>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{t('eventDetails.title')}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('eventDetails.eventType')}</label>
                  <select 
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                  >
                    <option value="">{t('eventDetails.eventType')}</option>
                    <option value="conference">{t('eventDetails.eventTypeOptions.conference')}</option>
                    <option value="gala">{t('eventDetails.eventTypeOptions.gala')}</option>
                    <option value="workshop">{t('eventDetails.eventTypeOptions.workshop')}</option>
                    <option value="graduation">{t('eventDetails.eventTypeOptions.graduation')}</option>
                    <option value="meeting">{t('eventDetails.eventTypeOptions.meeting')}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('eventDetails.tentativeDate')}</label>
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('eventDetails.attendees')}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      name="attendees"
                      value={formData.attendees}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                    />
                    <span className="absolute right-4 top-2.5 text-slate-400 text-sm">{t('eventDetails.attendeesMax')}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('eventDetails.duration')}</label>
                  <input 
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder={t('eventDetails.durationPlaceholder')}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Technical Requirements */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#295787]/10 flex items-center justify-center text-[#295787]">
                  <span className="material-icons-outlined text-sm">settings_input_component</span>
                </span>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{t('technicalRequirements.title')}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'sound', label: t('technicalRequirements.sound') },
                  { name: 'lighting', label: t('technicalRequirements.lighting') },
                  { name: 'streaming', label: t('technicalRequirements.streaming') },
                  { name: 'projection', label: t('technicalRequirements.projection') },
                  { name: 'recording', label: t('technicalRequirements.recording') },
                  { name: 'itSupport', label: t('technicalRequirements.itSupport') }
                ].map(req => (
                  <label key={req.name} className="flex items-center p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#295787]/50 cursor-pointer transition-colors group">
                    <input 
                      type="checkbox"
                      name={req.name}
                      checked={formData[req.name as keyof typeof formData] as boolean}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#295787] border-slate-300 rounded focus:ring-[#295787] cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-[#295787] transition-colors">{req.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#295787]/10 flex items-center justify-center text-[#295787]">
                  <span className="material-icons-outlined text-sm">person</span>
                </span>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{t('contactRepresentative.title')}</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contactRepresentative.fullName')}</label>
                  <input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('contactRepresentative.fullNamePlaceholder')}
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contactRepresentative.email')}</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contactRepresentative.emailPlaceholder')}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('contactRepresentative.phone')}</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contactRepresentative.phonePlaceholder')}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-white focus:border-[#295787] focus:ring-2 focus:ring-[#295787]/20 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <button 
                type="submit"
                className="w-full bg-[#295787] hover:bg-[#1f3f5f] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#295787]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{t('submit')}</span>
                <span className="material-icons-outlined text-lg">send</span>
              </button>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium dark:text-slate-400">
                  <span className="material-icons-outlined text-[#295787] text-base">verified_user</span>
                  <span>{t('confidential')}</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="h-[1px] w-8 bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex items-center gap-2">
                    <Image 
                      src="/logo-unac-official.png" 
                      alt="UNAC" 
                      width={24}
                      height={24}
                      className="rounded-full object-contain w-auto h-auto"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t('officialVenue')}</span>
                  </div>
                  <div className="h-[1px] w-8 bg-slate-300 dark:bg-slate-700"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
