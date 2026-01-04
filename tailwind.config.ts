import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      // если используешь кастомные цвета/переменные, можно добавить тут
      colors: {
        // пример, если используются именованные цвета
        'brand-blue': '#0b6eff',
        // 'bg-blue-50' уже есть в Tailwind, но если кастом — добавить
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '0',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1400px',
      },
    },
  },
  safelist: [
    // классы, которые нужно явно включить (чтобы purge не вырезал)
    'space-y-8',
    'space-y-10',
    'p-8',
    'p-10',
    'lg:p-10',
    'lg:p-12',
    'px-8',
    'py-10',
    'lg:py-14',
    'rounded-[28px]',
    'rounded-[30px]',
    'bg-blue-50',
    'text-brand-blue',
    'text-brand-dark',
    'shadow-sm',
    'shadow-xl',
    'max-w-[1100px]',
    'max-w-6xl',
    'w-full',
    'container',
  ],
  plugins: [],
};

export default config;
