import { Metadata } from 'next';
import FAQPage from './FaqClient';

export const metadata: Metadata = {
  title: 'FAQ | Готель',
  description: 'Відповіді на поширені запитання про бронювання, розміщення та послуги курорту Готель.',
  openGraph: { title: 'Поширені запитання | Готель', type: 'website' },
};

export default FAQPage;
