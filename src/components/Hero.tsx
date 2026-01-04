import React from 'react';
import { Language, translations } from '../utils/translations';

interface HeroProps {
  language: Language;
}

/* Простые inline-иконки (локальные SVG-компоненты) — чтобы не зависеть от внешних файлов */
const CalendarIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const WarehouseIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-4 9 4v8a2 2 0 0 1-2 2h-2v-6H5v6H3a2 2 0 0 1-0-4z"></path>
    <path d="M9 22V12"></path>
    <path d="M15 22V12"></path>
  </svg>
);

const CartIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="20" r="1"></circle>
    <circle cx="20" cy="20" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const PackageIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 3l-7 3.27A2 2 0 0 0 4 8v8a2 2 0 0 0 1 1.73L11 21l7-3.27A2 2 0 0 0 21 16z"></path>
    <path d="M12 3v9"></path>
  </svg>
);

const PaymentIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
    <line x1="2" y1="10" x2="22" y2="10"></line>
  </svg>
);

const SupportIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8a6 6 0 1 0-12 0v4a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8"></path>
    <path d="M12 19v3"></path>
  </svg>
);

const GlobeIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M2 12h20"></path>
    <path d="M12 2c2 4 2 8 0 16"></path>
  </svg>
);

const HeartIcon = ({ size = 24, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
  </svg>
);

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;

  const features = [
    { icon: CalendarIcon, text: t.features.operating },
    { icon: WarehouseIcon, text: t.features.warehouse },
    { icon: CartIcon, text: t.features.buy },
    { icon: PackageIcon, text: t.features.packaging },
    { icon: PaymentIcon, text: t.features.payment },
    { icon: SupportIcon, text: t.features.support },
    { icon: GlobeIcon, text: t.features.worldwide },
    { icon: HeartIcon, text: t.features.appreciate },
  ];

  return (
    <section className="pt-32 pb-20 md:pb-24 lg:pb-28 bg-cream">
      <div className="container mx-auto">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center mb-12 lg:mb-20">
            {/* Responsive H1: clamp + max-width */}
            <h1
              className="mx-auto w-full font-extrabold leading-tight mb-8 text-brand-dark tracking-tight lg:max-w-[1100px]"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)', lineHeight: '1.02' }}
            >
                {t.title}
            </h1>

            <div className="bg-brand-yellow px-6 py-3 rounded-2xl shadow-sm border border-brand-yellow/30 animate-fade-in flex items-center gap-2.5">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                </span>
                <span className="font-bold text-brand-dark text-sm md:text-base lg:text-lg tracking-tight">
                    {t.minWeightBadge}
                </span>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col">
            <div className="lg:hidden mb-16 flex justify-center">
                <img 
                  src="https://i.ibb.co/cS2GvWht/happyboxtop.webp" 
                  alt="Happy Box Services Mascot" 
                  width="800"
                  height="800"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full max-w-[600px] h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?auto=format&fit=crop&w=800&q=80";
                    e.currentTarget.onerror = null;
                  }}
                />
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 lg:gap-x-10 mb-16">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 pt-1">
                    <feature.icon size={40} className="text-brand-blue w-10 h-10" />
                  </div>
                  <p className="text-sm md:text-base font-semibold leading-snug text-gray-700">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <img
              src="https://i.ibb.co/cS2GvWht/happyboxtop.webp"
              alt="Happy Box Mascot"
              width="600"
              height="600"
              decoding="async"
              className="w-full max-w-[420px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
