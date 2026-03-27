'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import BookingBar from '@/features/booking/BookingBar';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = '/images/hero.webp',
}: HeroProps) {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (_data: { checkIn: string; checkOut: string; guests: number }) => {
    // Redirect to rooms or handle search
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with priority for LCP optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover bg-center bg-no-repeat"
          sizes="100vw"
          quality={60}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight">
            {title || (locale === 'ua' ? 'Готель' : 'Hotel')}
          </h1>
        </div>

        <div className="animate-fade-in [animation-delay:120ms] [animation-fill-mode:both]">
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
            {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
          </p>
        </div>

        {/* Booking Bar */}
        <div className="animate-fade-in [animation-delay:240ms] [animation-fill-mode:both]">
          <BookingBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
