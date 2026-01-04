
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface Review {
  name: string;
  location: string;
  text: string;
  image: string;
}

interface ReviewCardProps {
  review: Review;
  compact?: boolean;
}

interface ReviewsProps {
  language: Language;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, compact }) => {
  const [isReady, setIsReady] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsReady(true);
    }
  }, [review.image]);

  return (
    <div className={`bg-white rounded-[30px] flex flex-col items-center text-center shadow-sm transition-all duration-300 ${
      compact ? 'p-6 h-auto' : 'p-10 lg:p-12 h-full'
    }`}>
      <div className={`rounded-3xl overflow-hidden shadow-md border-4 border-gray-50 flex-shrink-0 relative bg-gray-100 ${
        compact ? 'w-[80px] h-[80px] mb-3' : 'w-[120px] h-[120px] mb-6'
      }`}>
          {!isReady && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
          )}
          <img 
              ref={imgRef}
              src={review.image} 
              alt={`Photo review from ${review.name} from ${review.location}`}
              width="240"
              height="240"
              loading="lazy"
              decoding="async"
              onLoad={() => setIsReady(true)}
              className={`relative z-10 w-full h-full object-cover transition-opacity duration-300 ${
                isReady ? 'opacity-100' : 'opacity-0'
              }`}
          />
      </div>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-brand-dark leading-tight mb-2`}>{review.name}</h3>
      <div className={`flex items-center justify-center gap-1 text-brand-blue font-bold text-xs uppercase tracking-wide ${
        compact ? 'mb-3' : 'mb-6 text-sm'
      }`}>
          <MapPin size={compact ? 12 : 14} className="fill-current" />
          {review.location}
      </div>
      <p className={`text-gray-600 leading-relaxed font-medium ${
        compact ? 'text-sm mb-3' : 'text-[15px] mb-8 flex-grow'
      }`}>"{review.text}"</p>
      <div className={`${compact ? 'text-base' : 'text-xl'} text-yellow-400 tracking-widest ${compact ? 'mt-0' : 'mt-auto'}`}>★★★★★</div>
    </div>
  );
};

export const Reviews: React.FC<ReviewsProps> = ({ language }) => {
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const t = translations[language].reviews;

  const testimonialPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < t.data.length; i += 3) {
      pages.push(t.data.slice(i, i + 3));
    }
    return pages;
  }, [t.data]);

  const allTestimonials = t.data;

  useEffect(() => {
    const nextDeskPage = (desktopPage + 1) % testimonialPages.length;
    const prevDeskPage = (desktopPage - 1 + testimonialPages.length) % testimonialPages.length;
    [...testimonialPages[nextDeskPage], ...testimonialPages[prevDeskPage]].forEach(rev => {
      const img = new Image(); img.src = rev.image;
    });
    const nextMob = (mobileIndex + 1) % allTestimonials.length;
    const prevMob = (mobileIndex - 1 + allTestimonials.length) % allTestimonials.length;
    [allTestimonials[nextMob], allTestimonials[prevMob]].forEach(rev => {
      const img = new Image(); img.src = rev.image;
    });
  }, [desktopPage, mobileIndex, testimonialPages, allTestimonials]);

  const nextDesktop = () => setDesktopPage((prev) => (prev + 1) % testimonialPages.length);
  const prevDesktop = () => setDesktopPage((prev) => (prev - 1 + testimonialPages.length) % testimonialPages.length);
  const nextMobile = () => setMobileIndex((prev) => (prev + 1) % allTestimonials.length);
  const prevMobile = () => setMobileIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);

  return (
    <section className="py-20 md:py-24 lg:py-28 bg-cream mb-16 md:mb-20 lg:mb-24">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-16 md:mb-20 text-brand-dark text-center mx-auto tracking-tight max-w-4xl">
          {t.title}
        </h2>
        
        {/* DESKTOP */}
        <div className="hidden md:block bg-brand-light rounded-[40px] p-12 lg:p-16 relative shadow-sm border border-brand-blue/5 min-h-[600px]">
          <div className="grid grid-cols-3 gap-8 lg:gap-10">
            {testimonialPages[desktopPage].map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-14">
            <button 
              onClick={prevDesktop} 
              aria-label="Previous reviews"
              className="w-14 h-14 rounded-full bg-white text-brand-blue shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            <button 
              onClick={nextDesktop} 
              aria-label="Next reviews"
              className="w-14 h-14 rounded-full bg-white text-brand-blue shadow-lg flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden bg-brand-light rounded-[30px] p-6 relative border border-brand-blue/5">
          <ReviewCard key="mobile" review={allTestimonials[mobileIndex]} compact={true} />
          <div className="flex justify-center gap-6 mt-6">
            <button 
              onClick={prevMobile} 
              aria-label="Previous review"
              className="w-12 h-12 rounded-full bg-white text-brand-blue shadow-md flex items-center justify-center active:scale-95"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2">
              {allTestimonials.map((_, idx) => (
                <div key={idx} className={`h-2 rounded-full transition-all ${idx === mobileIndex ? 'bg-brand-blue w-6' : 'bg-brand-blue/20 w-2'}`} />
              ))}
            </div>
            <button 
              onClick={nextMobile} 
              aria-label="Next review"
              className="w-12 h-12 rounded-full bg-white text-brand-blue shadow-md flex items-center justify-center active:scale-95"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
