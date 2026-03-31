'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Footer = dynamic(() => import('@/components/layout/Footer'));

export default function FooterDeferred() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => setMounted(true), { timeout: 20000 });
    } else {
      const timer = window.setTimeout(() => setMounted(true), 20000);
      return () => window.clearTimeout(timer);
    }
  }, [mounted]);

  if (!mounted) return null;
  return <Footer />;
}
