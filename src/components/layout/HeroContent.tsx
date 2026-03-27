'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

type BookingBarModule = typeof import('@/features/booking/BookingBar');
type BookingBarComponent = BookingBarModule['default'];

function BookingBarLazy({ onSearch }: { onSearch: (data: { checkIn: string; checkOut: string; guests: number }) => void }) {
  const [BookingBar, setBookingBar] = useState<BookingBarComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };

    const load = () => {
      import('@/features/booking/BookingBar').then((mod) => {
        if (!cancelled) setBookingBar(() => mod.default);
      });
    };

    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(load, { timeout: 1500 });
    } else {
      const t = window.setTimeout(load, 800);
      return () => window.clearTimeout(t);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (!BookingBar) {
    return <div className="h-[72px] rounded-sm bg-white/10 animate-pulse" />;
  }

  return <BookingBar onSearch={onSearch} />;
}

interface HeroContentProps {
  title?: string;
  subtitle?: string;
}

export default function HeroContent({ title, subtitle }: HeroContentProps) {
  const { locale } = useLanguage();

  const handleSearch = (_data: { checkIn: string; checkOut: string; guests: number }) => {};

  return (
    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight">
        {title || (locale === 'ua' ? 'Готель' : 'Hotel')}
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
        {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
      </p>

      <BookingBarLazy onSearch={handleSearch} />
    </div>
  );
}
