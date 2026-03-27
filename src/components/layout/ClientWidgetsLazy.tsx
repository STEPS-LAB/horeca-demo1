'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AIConcierge = dynamic(() => import('@/features/ai-concierge/AIConcierge'), { ssr: false });
const MobileBookingBar = dynamic(() => import('@/features/booking/MobileBookingBar'), { ssr: false });

export default function ClientWidgetsLazy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };

    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => setMounted(true), { timeout: 1500 });
      return;
    }

    const t = window.setTimeout(() => setMounted(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AIConcierge />
      <MobileBookingBar />
    </>
  );
}

