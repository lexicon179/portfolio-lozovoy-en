/**
 * Глобальные данные сайта (EN).
 * Все тексты — дословно с Framer (incomplete-sphinx-085771.framer.app),
 * без перевода и переписывания. Источник:
 * assets/framer/_not-images/searchIndex-7oQTbrZPIMWP.json
 */

export const site = {
  name: 'Mike Lozovoy',
  /** Строка в футере, как на Framer: там «Michael», а не «Mike». */
  copyright: '© 2026 Michael Lozovoy · AI-native growth marketer',
};

export const links = {
  telegram: 'https://t.me/mikelozovoy',
  x: 'https://x.com/lozovoymike',
  email: 'lozovoymike@gmail.com',
  cv: 'https://docs.google.com/document/d/1_h5XybHyvAX6FeDCTNNCOWAq9svoVXl9P4e0PACZqhk/edit?usp=sharing',
};

/** Бегущая строка «Worked with». Список с Framer. */
export const brands = [
  'Philip Morris',
  'Colgate',
  'Sanofi',
  'MTS',
  'OpenLedger',
  'Lagrange',
];

/** Ряд цифр под первым экраном. Framer: пять штук. */
export const stats = [
  { value: '$120K', label: 'raised' },
  { value: '1.2M+', label: 'impressions' },
  { value: '15K', label: 'DAU' },
  { value: '100K', label: 'whitelist' },
  { value: 'tier-1', label: 'brands' },
];

export type Service = {
  title: string;
  description: string;
};

/**
 * Блок «What I can do»: шесть карточек, как в русской версии.
 * Описания — английский оригинал с Framer. На Framer «Sales and PR»
 * одна карточка, здесь она разделена на две по её же тексту.
 */
export const services: Service[] = [
  {
    title: 'Growth',
    description: 'Audience, community, and growth strategy from zero.',
  },
  {
    title: 'Performance',
    description:
      'Traffic, unit economics, and spend optimized against revenue, not clicks.',
  },
  {
    title: 'AI content',
    description: 'Video and creative at a fraction of studio production cost.',
  },
  {
    title: 'Launches',
    description: 'Product launches and events, end to end.',
  },
  {
    title: 'Sales',
    description: 'Full-cycle B2B deals.',
  },
  {
    title: 'PR',
    description: 'Press, creators, and media.',
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Файл в public/avatars. Пусто — покажем инициалы. */
  avatar?: string;
  /** Профиль автора. Есть — имя становится ссылкой (как на Framer). */
  href?: string;
  /** Кейс, о котором отзыв: в карточке его цифры и ссылка на него */
  caseSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Mike ran our video content, including viral AI-made pieces. Fast, creative, no hand-holding.',
    name: 'Roo Gainulla',
    role: 'CMO, Algebra Finance',
    avatar: '/avatars/roo.jpg',
    caseSlug: 'algebra-finance',
  },
  {
    quote:
      'Mike grew our Farcaster from zero, ran KOL outreach, and kept content shipping on time. Every partnership closed at zero cost.',
    name: 'Max',
    role: 'CPO at MAIN',
    avatar: '/avatars/max.jpg',
    caseSlug: 'main',
  },
  {
    quote:
      'Worked with Mike: sharp, reliable, gets things done. Easy to work with.',
    name: 'runn3rr',
    role: 'core contributor, FairVC',
    avatar: '/avatars/runn3rr.png',
    href: 'https://x.com/runn3rrr',
  },
];
