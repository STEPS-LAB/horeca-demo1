import { Metadata } from 'next';
import ContactsPage from './ContactsClient';

export const metadata: Metadata = {
  title: 'Контакти | Готель',
  description: 'Зв\'яжіться з нами: рецепція, ресторан, басейн. Адреса: Карпати, Буковель.',
  openGraph: { title: 'Контакти | Готель', type: 'website' },
};

export default ContactsPage;
