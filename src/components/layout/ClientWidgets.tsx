'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AIConcierge = dynamic(() => import('@/features/ai-concierge/AIConcierge'), { ssr: false });
const MobileBookingBar = dynamic(() => import('@/features/booking/MobileBookingBar'), { ssr: false });

export default function ClientWidgets() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };

    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => setEnabled(true), { timeout: 2500 });
      return;
    }

    const t = window.setTimeout(() => setEnabled(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <AIConcierge />
      <MobileBookingBar />
    </>
  );
}
