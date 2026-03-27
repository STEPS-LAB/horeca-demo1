'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useHeader } from './HeaderContext';
import dynamic from 'next/dynamic';
const BookingModal = dynamic(() => import('@/components/booking/BookingModal'), { ssr: false });

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/#about', key: 'about' },
  { href: '/#rooms', key: 'rooms' },
  { href: '/restaurant', key: 'restaurant' },
  { href: '/activities', key: 'activities' },
  { href: '/#pool', key: 'pool' },
  { href: '/contacts', key: 'contacts' },
] as const;

const MENU_ANIM_MS = 300;

interface HeaderProps {
  variant?: 'light' | 'dark';
}

export default function Header({ variant: pageVariant }: HeaderProps) {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const { variant: contextVariant } = useHeader();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const isClosingRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleCloseMenu = useCallback(() => {
    if (isClosingRef.current || !menuOpen) return;
    isClosingRef.current = true;
    setMenuOpen(false);
    setTimeout(() => {
      setMenuMounted(false);
      isClosingRef.current = false;
    }, MENU_ANIM_MS);
  }, [menuOpen]);

  const handleOpenMenu = useCallback(() => {
    if (isClosingRef.current) return;
    setMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuOpen(true));
    });
  }, []);

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const effectiveVariant = pageVariant || contextVariant;
  const forceDark = effectiveVariant === 'dark';
  const useDarkHeader = forceDark || isScrolled;

  useEffect(() => {
    if (!menuMounted) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseMenu();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [menuMounted, handleCloseMenu]);

  useEffect(() => {
    if (menuMounted) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [menuMounted]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 h-[4.5rem] min-h-[4.5rem] ${
          useDarkHeader
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent backdrop-blur-md'
        }`}
      >
        <div className="container flex items-center justify-between h-[4.5rem] min-h-[4.5rem]">
          <Link
            href="/"
            className={`font-display text-xl sm:text-2xl uppercase tracking-[0.32em] transition-colors ${
              useDarkHeader ? 'text-[var(--color-neutral-900)]' : 'text-white'
            }`}
          >
            HOTEL
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`group relative text-sm font-light tracking-[0.06em] transition hover:opacity-80 ${
                  useDarkHeader ? 'text-[var(--color-neutral-900)]' : 'text-white'
                }`}
              >
                {t(`common.${key}`)}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className={`hidden md:flex h-9 items-center gap-1 rounded-sm p-0.5 ${
              useDarkHeader ? 'bg-neutral-200' : 'bg-white/10 backdrop-blur border border-white/30'
            }`}>
              {(['ua', 'en'] as const).map((code) => (
                <button
                  key={code}
                  className={`flex h-8 min-w-[2.75rem] items-center justify-center rounded-sm px-3 text-xs uppercase tracking-[0.14em] transition ${
                    locale === code
                      ? 'bg-primary text-white'
                      : useDarkHeader ? 'text-neutral-600 hover:bg-neutral-300' : 'text-white/90 hover:bg-white/20'
                  }`}
                  onClick={() => setLocale(code)}
                  type="button"
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="hidden items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-primary-900 md:inline-flex cursor-pointer"
            >
              {t('common.bookNow')}
            </button>

            <button
              type="button"
              onClick={handleOpenMenu}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuMounted}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`h-[1.5px] w-5 rounded-full transition-colors ${
                    useDarkHeader ? 'bg-[var(--color-neutral-900)]' : 'bg-white'
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {menuMounted && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-md md:hidden transition-opacity duration-300 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
            onTouchEnd={handleCloseMenu}
            onClick={(e) => { e.preventDefault(); handleCloseMenu(); }}
          />

          {/* Close Button */}
          <button
            key="close-btn"
            type="button"
            onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); handleCloseMenu(); }}
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); handleCloseMenu(); }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className={`fixed right-6 top-6 z-[62] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-neutral-900)] shadow-lg outline-none md:hidden ios-no-flicker transition-opacity duration-300 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Close menu"
            style={{
              WebkitTapHighlightColor: 'transparent',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: 'none',
              pointerEvents: menuOpen ? 'auto' : 'none',
            }}
          >
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden>
              <span className="absolute h-[1.5px] w-5 rounded-full bg-[var(--color-neutral-900)]" style={{ transform: 'rotate(45deg)' }} />
              <span className="absolute h-[1.5px] w-5 rounded-full bg-[var(--color-neutral-900)]" style={{ transform: 'rotate(-45deg)' }} />
            </span>
          </button>

          {/* Menu Panel */}
          <aside
            className={`fixed inset-y-0 right-0 z-[61] w-[min(88vw,320px)] bg-[var(--color-surface)] shadow-2xl md:hidden transition-transform duration-300 ease-out ${
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <nav className="flex flex-col gap-4 pt-24 pb-8 pl-8 pr-6" aria-label="Mobile">
              {NAV_ITEMS.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={handleCloseMenu}
                  className="font-light leading-relaxed text-[var(--color-neutral-900)] tracking-[0.04em] hover:opacity-70"
                  style={{ fontWeight: 300, fontSize: '1.05rem' }}
                >
                  {t(`common.${key}`)}
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}

      {bookingModalOpen && <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />}
    </>
  );
}
