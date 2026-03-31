'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const BookingModal = dynamic(() => import('@/components/booking/BookingModal'), { ssr: false });

export default function MobileBookingBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHiddenPage = pathname === '/contacts';
  if (isHiddenPage) return null;

  const hasHeroPage = pathname === '/' || pathname === '/restaurant' || pathname === '/activities';
  const shouldBeVisible = !hasHeroPage || isScrolled;

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white px-4 py-2 border-t border-neutral-200 md:hidden transition-all duration-300 ${
          shouldBeVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setBookingModalOpen(true)}
          className="flex h-10 w-full items-center justify-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-lg transition-all duration-300 hover:bg-primary-900 cursor-pointer"
        >
          ЗАБРОНЮВАТИ
        </button>
      </div>

      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
