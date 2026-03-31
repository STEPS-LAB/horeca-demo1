import Image from 'next/image';
import HeroContent from './HeroContent';
import heroImage from '../../../public/images/hero.webp';

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title,
  subtitle,
}: HeroProps) {
  return (
    <section className="relative h-[90vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={subtitle || 'Розкішний відпочинок на природі'}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover bg-center bg-no-repeat"
          sizes="100vw"
          quality={55}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 via-neutral-900/45 to-neutral-900/70" />
      </div>

      <HeroContent title={title} subtitle={subtitle} />
    </section>
  );
}
