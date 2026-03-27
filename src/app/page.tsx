import Hero from '@/components/layout/Hero';
import HomeSections from '@/app/home-sections';

export const metadata = {
  title: 'Готель | Розкішний відпочинок на природі',
  description: 'Відкрийте для себе ідеальне поєднання розкоші та природи. Преміальний курортний комплекс для незабутнього відпочинку.',
  keywords: 'курорт, відпочинок, природа, розкіш, ресторан, котеджі, Україна',
  openGraph: {
    title: 'Готель | Розкішний відпочинок на природі',
    description: 'Відкрийте для себе ідеальне поєднання розкоші та природи',
    type: 'website',
    locale: 'uk_UA',
    siteName: 'Готель',
    images: [{ url: '/images/hero.webp', width: 1200, height: 630, alt: 'Готель — розкішний курорт' }],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeSections />
    </>
  );
}
