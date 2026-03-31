'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

const footerLinks = {
  navigation: [
    { href: '/', key: 'home' },
    { href: '/#about', key: 'about' },
    { href: '/#rooms', key: 'rooms' },
    { href: '/restaurant', key: 'restaurant' },
    { href: '/activities', key: 'activities' },
    { href: '/#pool', key: 'pool' },
  ],
};

export default function Footer() {
  const { locale } = useLanguage();
  const t = useTranslations();

  const isUA = locale === 'ua';

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button onClick={scrollToTop} className="mb-6" aria-label="Scroll to top">
              <span className="font-display text-2xl uppercase tracking-[0.32em] text-white">HOTEL</span>
            </button>
            <p className="text-neutral-400 mb-6 max-w-sm">
              {t('footer.description')}
            </p>

          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display font-medium text-white mb-6">
              {t('footer.navigation')}
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3" role="list">
              {footerLinks.navigation.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {t(`common.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display font-medium text-white mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="text-neutral-400 not-italic">
                  {isUA ? 'Карпати, Буковель' : 'Carpathians, Bukovel'}
                </address>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+380999999999"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  099 999 99 99
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@horeca-demo.com"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  info@horeca-demo.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-neutral-400">
                  09:00 — 21:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400 text-center md:text-left">
              {t('footer.copyright')}
            </p>
            <p className="text-sm text-neutral-400">
              Developed by{' '}
              <a
                href="https://stepslab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline underline-offset-4 decoration-white/40 hover:decoration-white/70 hover:text-white transition-colors"
              >
                STEPS LAB
              </a>
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto md:justify-end space-y-2 md:space-y-0 md:space-x-6">
              <span className="text-sm text-neutral-300 min-h-[48px] inline-flex items-center">
                {isUA ? 'Політика конфіденційності' : 'Privacy Policy'}
              </span>
              <span className="text-sm text-neutral-300 min-h-[48px] inline-flex items-center">
                {isUA ? 'Умови використання' : 'Terms of Use'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
