import { Metadata } from 'next';
import BlogPage from './BlogClient';

export const metadata: Metadata = {
  title: 'Блог | Готель',
  description: 'Новини, поради та натхнення від курорту Готель — природа, кухня, велнес та події.',
  openGraph: { title: 'Блог | Готель', type: 'website' },
};

export default BlogPage;
