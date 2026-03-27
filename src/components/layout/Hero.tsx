'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

const BookingBar = dynamic(() => import('@/features/booking/BookingBar'), {
  ssr: false,
  loading: () => <div className="h-[72px] rounded-sm bg-white/10 animate-pulse" />,
});

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

  const handleSearch = (_data: { checkIn: string; checkOut: string; guests: number }) => {};

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
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
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/60" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight">
            {title || (locale === 'ua' ? 'Готель' : 'Hotel')}
          </h1>
        </div>

        <div className="animate-fade-in [animation-delay:100ms]">
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
            {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
          </p>
        </div>

        <div className="animate-fade-in [animation-delay:200ms]">
          <BookingBar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
