'use client';

import { useReducedMotion, motion } from 'framer-motion';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import BookingBar from '@/features/booking/BookingBar';

interface HeroContentProps {
  title?: string;
  subtitle?: string;
}

const heroContainerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HeroContent({ title, subtitle }: HeroContentProps) {
  const { locale } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const handleSearch = (_data: { checkIn: string; checkOut: string; guests: number }) => {};

  if (prefersReducedMotion) {
    return (
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight">
          {title || (locale === 'ua' ? 'Готель' : 'Hotel')}
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
          {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
        </p>

        <div>
          <BookingBar onSearch={handleSearch} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h1
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight"
        variants={heroItemVariants}
      >
        {title || (locale === 'ua' ? 'Готель' : 'Hotel')}
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light"
        variants={heroItemVariants}
      >
        {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
      </motion.p>

      <motion.div variants={heroItemVariants}>
        <BookingBar onSearch={handleSearch} />
      </motion.div>
    </motion.div>
  );
}
