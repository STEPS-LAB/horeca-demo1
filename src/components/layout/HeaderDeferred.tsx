'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Header = dynamic(() => import('@/components/layout/Header'));

export default function HeaderDeferred() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    const onFirstInteraction = () => setMounted(true);
    window.addEventListener('pointerdown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', onFirstInteraction, { once: true, passive: true });

    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => setMounted(true), { timeout: 15000 });
    } else {
      const timer = window.setTimeout(() => setMounted(true), 15000);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('pointerdown', onFirstInteraction);
        window.removeEventListener('keydown', onFirstInteraction);
        window.removeEventListener('touchstart', onFirstInteraction);
      };
    }

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <header className="fixed inset-x-0 top-0 z-50 h-[4.5rem] min-h-[4.5rem] bg-transparent backdrop-blur-md">
        <div className="container flex items-center justify-between h-[4.5rem] min-h-[4.5rem]">
          <span className="font-display text-xl sm:text-2xl uppercase tracking-[0.32em] text-white">HOTEL</span>
          <span className="h-10 w-10 rounded md:hidden" aria-hidden="true" />
        </div>
      </header>
    );
  }

  return <Header />;
}
