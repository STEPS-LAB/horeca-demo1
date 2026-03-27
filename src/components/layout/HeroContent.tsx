'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

type BookingBarModule = typeof import('@/features/booking/BookingBar');
type BookingBarComponent = BookingBarModule['default'];

function BookingBarLazy({ onSearch }: { onSearch: (data: { checkIn: string; checkOut: string; guests: number }) => void }) {
  const [BookingBar, setBookingBar] = useState<BookingBarComponent | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };

    const load = () => {
      import('@/features/booking/BookingBar').then((mod) => {
        if (!cancelled) setBookingBar(() => mod.default);
      });
    };

    if (typeof w.requestIdleCallback === 'function') {
      // Avoid impacting initial Lighthouse run; load strictly when user asked.
      w.requestIdleCallback(load);
    } else {
      const t = window.setTimeout(load, 0);
      return () => window.clearTimeout(t);
    }

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  if (!BookingBar) {
    return (
      <button
        type="button"
        onClick={() => setShouldLoad(true)}
        className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-sm bg-white/10 text-white/95 border border-white/30 backdrop-blur
                   hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-neutral-900/20"
      >
        Перевірити доступність
      </button>
    );
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
      <h1 className="md:animate-fade-in font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight">
        {title || (locale === 'ua' ? 'Готель' : 'Hotel')}
      </h1>

      <p className="md:animate-fade-in md:[animation-delay:120ms] text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
        {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
      </p>

      <div className="md:animate-fade-in md:[animation-delay:240ms]">
        <BookingBarLazy onSearch={handleSearch} />
      </div>
    </div>
  );
}
