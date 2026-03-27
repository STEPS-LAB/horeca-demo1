'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useEffect } from 'react';
import { useHeader } from '@/components/layout/HeaderContext';

export default function ContactsPage() {
  const { locale } = useLanguage();
  const { setVariant } = useHeader();
  const isUA = locale === 'ua';

  useEffect(() => {
    setVariant('dark');
    return () => setVariant('light');
  }, [setVariant]);

  const contactInfo = {
    reception: {
      title: isUA ? 'РЕЦЕПЦІЯ' : 'RECEPTION',
      phone: '099 999 99 99',
      email: 'info@horeca-demo.com',
      href: 'tel:+380999999999',
    },
    restaurant: {
      title: isUA ? 'РЕСТОРАН' : 'RESTAURANT',
      phone: '099 999 99 99',
      href: 'tel:+380999999999',
    },
    pool: {
      title: isUA ? 'БАСЕЙН' : 'POOL',
      phone: '099 999 99 99',
      href: 'tel:+380999999999',
    },
  };

  const address = {
    title: isUA ? 'АДРЕСА' : 'ADDRESS',
    text: isUA ? 'Карпати, Буковель' : 'Carpathians, Bukovel',
  };

  const directions = { title: isUA ? 'ЛОКАЦІЯ' : 'LOCATION', text: isUA ? 'Карпати, Буковель' : 'Carpathians, Bukovel' };

  return (
    <main className="pt-2">
      {/* Contact Information Section */}
      <section className="section-padding bg-[#1A2F2A]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Reception */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2 tracking-wide">
                  {contactInfo.reception.title}
                </h3>
                <a
                  href={contactInfo.reception.href}
                  className="text-3xl font-light text-white hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.reception.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.reception.email}`}
                  className="block mt-2 text-neutral-400 hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.reception.email}
                </a>
              </div>

              <div />
            </div>

            {/* Restaurant */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2 tracking-wide">
                  {contactInfo.restaurant.title}
                </h3>
                <a
                  href={contactInfo.restaurant.href}
                  className="text-3xl font-light text-white hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.restaurant.phone}
                </a>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3 tracking-wide">
                  {address.title}
                </h3>
                <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                  {address.text}
                </p>
              </div>
            </div>

            {/* Pool */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2 tracking-wide">
                  {contactInfo.pool.title}
                </h3>
                <a
                  href={contactInfo.pool.href}
                  className="text-3xl font-light text-white hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.pool.phone}
                </a>
              </div>

              {/* Directions */}
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3 tracking-wide">
                  {directions.title}
                </h3>
                <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                  {directions.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
