'use client';

import dynamic from 'next/dynamic';

const SectionFallback = () => <div className="section-padding" aria-hidden="true" />;

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: false, loading: SectionFallback });
const RoomsSection = dynamic(() => import('@/components/sections/RoomsSection'), { ssr: false, loading: SectionFallback });
const RestaurantSection = dynamic(() => import('@/components/sections/RestaurantSection'), { ssr: false, loading: SectionFallback });
const RelaxationSection = dynamic(() => import('@/components/sections/RelaxationSection'), { ssr: false, loading: SectionFallback });
const PoolSection = dynamic(() => import('@/components/sections/PoolSection'), { ssr: false, loading: SectionFallback });
const ResortMap = dynamic(() => import('@/components/map/ResortMap'), { ssr: false, loading: SectionFallback });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: false, loading: SectionFallback });

export default function HomeSections() {
  return (
    <>
      <AboutSection />

      <div id="rooms">
        <RoomsSection />
      </div>

      <RestaurantSection />
      <RelaxationSection />

      <div id="pool">
        <PoolSection />
      </div>

      <ResortMap />
      <TestimonialsSection />
    </>
  );
}

