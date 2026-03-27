import { Metadata } from 'next';
import ActivitiesPage from './ActivitiesClient';

export const metadata: Metadata = {
  title: 'Дозвілля | Готель',
  description: 'Велопрогулянки, лазня, квадроцикли, риболовля, теніс — активний відпочинок у Готель.',
  openGraph: { title: 'Дозвілля | Готель', description: 'Активний відпочинок на природі', type: 'website' },
};

export default ActivitiesPage;
