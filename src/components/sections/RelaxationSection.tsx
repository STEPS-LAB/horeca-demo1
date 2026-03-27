'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { Clock, Users, Volleyball } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import Image from 'next/image';

type IconProps = { className?: string };

function BikeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6.5" cy="17.5" r="3.5" />
      <circle cx="17.5" cy="17.5" r="3.5" />
      <path d="M6.5 17.5 10 10h4l-2 4" />
      <path d="M14 6h2l2 4" />
      <path d="M10 10 8.5 6H6" />
    </svg>
  );
}

function BathIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12V7a2 2 0 0 1 2-2h2" />
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M8 19v2" />
      <path d="M16 19v2" />
    </svg>
  );
}

function AtvIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M6 17h5l2-6h5" />
      <path d="M9 11h4l1 3" />
      <path d="M16 7h3l2 4" />
    </svg>
  );
}

function BoatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v9" />
      <path d="M12 4l6 5H12" />
      <path d="M3 15l9 4 9-4-9-3-9 3Z" />
      <path d="M5 20h14" />
    </svg>
  );
}

function FishIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5Z" />
      <path d="M21 12l-3-3 1 3-1 3 3-3Z" />
      <circle cx="10" cy="11" r="1" />
    </svg>
  );
}

function FootballIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7l2.5 2-1 3h-3l-1-3L12 7Z" />
      <path d="M7.5 10.5l2-1.5" />
      <path d="M16.5 10.5l-2-1.5" />
      <path d="M9 16l-2 1" />
      <path d="M15 16l2 1" />
    </svg>
  );
}

const activities = {
  ua: [
    { icon: BikeIcon, key: 'cycling', name: 'Велопрогулянки', description: 'Прогулянки околицями курорту', image: '/images/velo.webp', duration: '250 грн/год', level: 'Будь-який рівень' },
    { icon: BathIcon, key: 'banya', name: 'Лазня та чан', description: 'Лазня на дровах та гарячий чан', image: '/images/laznya.webp', duration: 'від 800 грн', level: 'Комплекс 2600 грн' },
    { icon: AtvIcon, key: 'atv', name: 'Квадроцикли', description: 'Екстремальне катання в лісі', image: '/images/quadro.webp', duration: 'від 1600 грн', level: 'Екстрим' },
    { icon: BoatIcon, key: 'boats', name: 'Човни та катамарани', description: 'Прогулянки озером', image: '/images/boats.webp', duration: 'від 150 грн', level: 'Будь-який рівень' },
    { icon: FishIcon, key: 'fishing', name: 'Риболовля', description: 'Любительська та спортивна', image: '/images/fishing.webp', duration: 'від 500 грн', level: 'Будь-який рівень' },
    { icon: Volleyball, key: 'tennis', name: 'Теніс', description: 'Тенісний корт', image: '/images/tennis.webp', duration: '400 грн/год', level: 'Будь-який рівень' },
    { icon: FootballIcon, key: 'football', name: 'Футбол', description: 'Поле для мініфутболу', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Безкоштовно', level: 'Будь-який рівень' },
  ],
  en: [
    { icon: BikeIcon, key: 'cycling', name: 'Cycling', description: 'Rides around the resort', image: '/images/velo.webp', duration: '250 UAH/hour', level: 'Any level' },
    { icon: BathIcon, key: 'banya', name: 'Banya & Hot Tub', description: 'Wood-fired sauna and hot tub', image: '/images/laznya.webp', duration: 'from 800 UAH', level: 'Complex 2600 UAH' },
    { icon: AtvIcon, key: 'atv', name: 'ATVs', description: 'Extreme forest riding', image: '/images/quadro.webp', duration: 'from 1600 UAH', level: 'Extreme' },
    { icon: BoatIcon, key: 'boats', name: 'Boats & Catamarans', description: 'Lake cruises', image: '/images/boats.webp', duration: 'from 150 UAH', level: 'Any level' },
    { icon: FishIcon, key: 'fishing', name: 'Fishing', description: 'Amateur and sport fishing', image: '/images/fishing.webp', duration: 'from 500 UAH', level: 'Any level' },
    { icon: Volleyball, key: 'tennis', name: 'Tennis', description: 'Tennis court and rental', image: '/images/tennis.webp', duration: '400 UAH/hour', level: 'Any level' },
    { icon: FootballIcon, key: 'football', name: 'Football', description: 'Football field', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Free', level: 'Any level' },
  ],
};

export default function RelaxationSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const { locale } = useLanguage();
  const isUA = locale === 'ua';
  const t = isUA
    ? {
        subtitle: 'Пригоди та відкриття',
        title: 'Релакс та дозвілля',
        description: 'Відкрийте для себе всі можливості відпочинку на природі',
        cta: 'Дізнатися більше',
      }
    : {
        subtitle: 'Adventures & Discovery',
        title: 'Relaxation & Leisure',
        description: 'Discover all the possibilities for outdoor recreation',
        cta: 'Learn More',
      };

  const activitiesList = activities[locale as 'ua' | 'en'];

  return (
    <section className="section-padding bg-neutral-100">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
            {t.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-6">
            {t.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activitiesList.map((activity, index) => (
            <motion.div
              key={activity.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-sm aspect-[4/3]"
            >
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-105"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-sm flex items-center justify-center mb-4">
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-2">
                  {activity.name}
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  {activity.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {activity.level}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/activities" className="luxury-button">
            {t.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
