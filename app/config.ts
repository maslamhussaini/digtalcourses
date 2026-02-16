// app/config.ts

export type Course = {
  id: string;
  name: string;
  price: number;
};

export const INITIAL_COURSES: Course[] = [
  { id: 'smm-specialist', name: 'Social Media Sales Specialist', price: 750 },
  { id: 'graphic-branding', name: 'Graphic Designing & Branding Program', price: 750 },
  { id: 'video-animation', name: 'Digital Video Editing & Animation', price: 750 },
  { id: 'creative-writing', name: 'Digital Creative Content Writing', price: 750 },
  { id: 'wordpress-ai', name: 'Wordpress & Ai Website Building', price: 750 },
  { id: 'amazon-business', name: 'Amazon Business Program', price: 2000 },
  { id: 'professional-branding', name: 'Professional Branding: CV, LinkedIn & Email Marks', price: 750 },
  { id: 'shopify-dropshipping', name: 'E-Commerce Ai Shopify Dropshipping', price: 2000 },
  { id: 'youtube-automation', name: 'Youtube Automation & Ai Monetisation', price: 750 },
  { id: 'ai-skills', name: 'Ai Skills for the Future', price: 750 },
  { id: 'fiverr-freelancing', name: 'Fiverr & Freelancing Skills Program', price: 750 },
  { id: 'canva-chatgpt', name: 'Next-Gen Creativity: Canva + ChatGPT', price: 750 },
  { id: 'office-essential', name: 'Microsoft Office Business Essential', price: 750 },
  { id: 'ethical-hacking', name: 'Ethical Hacking & Cyber Security', price: 750 },
  { id: 'english-mastery', name: 'English Language & Grammar Mastery', price: 750 },
  { id: 'crypto-trends', name: 'Professional Crypto Trade & Trends', price: 750 },
];