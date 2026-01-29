// app/config.ts

export type Course = {
  id: string;
  name: string;
  price: number;
};

export const INITIAL_COURSES: Course[] = [
  { id: 'smm', name: 'Social Media Marketing', price: 5000 },
  { id: 'gd', name: 'Graphic Designing', price: 5000 },
  { id: 'office', name: 'Microsoft Office', price: 3000 },
  { id: 'english', name: 'English Spoken Language', price: 4000 },
  { id: 'video', name: 'Video Editing', price: 6000 },
  { id: 'web', name: 'WordPress Web Developer', price: 8000 },
  { id: 'freelance', name: 'Fiverr Freelancing', price: 2000 },
  { id: 'amazon', name: 'Amazon Online Arbitrage', price: 10000 },
  { id: 'seo', name: 'SEO Content Writing', price: 4000 },
  { id: 'youtube', name: 'YouTuber', price: 5000 },
  { id: 'ecom', name: 'Ecommerce (Shopify, FB, TikTok)', price: 12000 },
  { id: 'canva', name: 'Canva + Chat GPT', price: 2500 },
];