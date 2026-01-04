import React from 'react';
import { Language, translations } from '../utils/translations';
import { CalendarIcon, Warehouse, CartIcon, PackageIcon, PaymentIcon, SupportIcon, Globe, HeartIcon } from './icons';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;

  const features = [
    { icon: CalendarIcon, text: t.features.operating },
    { icon: Warehouse, text: t.features.warehouse },
    { icon: CartIcon, text: t.features.buy },
    { icon: PackageIcon, text: t.features.packaging },
    { icon: PaymentIcon, text: t.features.payment },
    { icon: SupportIcon, text: t.features.support },
    { icon: Globe, text: t.features.worldwide },
    { icon: HeartIcon, text: t.features.appreciate },
  ];

  return (
    <section className="pt-32 pb-20 md:pb-24 lg:pb-28 bg-cream">
      <div className="container mx-auto">
        <div className="flex flex-col items-start lg:items-center text-left lg:text-center mb-12 lg:mb-20">
            {/* Обновлённый H1: responsive fontSize с clamp и ограничение ширины */}
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
                    <feature.icon size={40} strokeWidth={1.5} className="text-brand-blue w-10 h-10" />
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
