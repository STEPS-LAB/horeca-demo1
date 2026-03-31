'use client';

import dynamic from 'next/dynamic';

const SectionFallback = () => <div className="section-padding" aria-hidden="true" />;

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { loading: SectionFallback });
const RoomsSection = dynamic(() => import('@/components/sections/RoomsSection'), { loading: SectionFallback });
const RestaurantSection = dynamic(() => import('@/components/sections/RestaurantSection'), { loading: SectionFallback });
const RelaxationSection = dynamic(() => import('@/components/sections/RelaxationSection'), { loading: SectionFallback, ssr: false });
const PoolSection = dynamic(() => import('@/components/sections/PoolSection'), { loading: SectionFallback, ssr: false });
const ResortMap = dynamic(() => import('@/components/map/ResortMap'), { loading: SectionFallback, ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { loading: SectionFallback, ssr: false });

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

