// path: src/components/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
  language: Language;
  onLoginClick: () => void;
  isDashboard?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ language, onLoginClick, isDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = translations[language].nav;

  const navItems = [
    { name: t.services, href: '#services' },
    { name: t.reviews, href: '#reviews' },
    { name: t.cost, href: '#cost' },
    { name: t.tracking, href: '#tracking' },
    { name: t.contacts, href: '#contacts' },
  ];

  useEffect(() => {
    const setHeaderHeight = () => {
      const header = document.querySelector('header');
      const h = header ? header.getBoundingClientRect().height : 80;
      document.documentElement.style.setProperty('--header-height', `${h}px`);
    };

    // set at mount and on resize
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
    return () => window.removeEventListener('resize', setHeaderHeight);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isDashboard) {
      window.location.href = href;
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      // Use native smooth scroll and rely on CSS scroll-margin/scroll-padding to offset the fixed header
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    if (language === 'en') {
      router.push('/');
    } else {
      router.push('/ru');
    }
  };

  const toggleLanguage = () => {
    if (language === 'en') {
      router.push('/ru');
    } else {
      router.push('/');
    }
  };

  return (
    <header className="py-5 bg-cream fixed top-0 left-0 w-full z-50 transition-all shadow-sm border-b border-gray-100/50 backdrop-blur-md bg-cream/90">
      <div className="container mx-auto flex justify-between items-center px-4 xl:px-0">
        <div
          onClick={scrollToTop}
          className="text-3xl md:text-4xl font-extrabold text-brand-blue tracking-tight cursor-pointer"
        >
          HappyBox
        </div>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {!isDashboard && (
            <ul className="flex gap-6 xl:gap-8 list-none">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="text-brand-dark font-semibold text-sm hover:text-brand-blue transition-colors cursor-pointer tracking-wide"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-6 border-l border-gray-200 pl-6 h-8">
            <button
              onClick={toggleLanguage}
              aria-label={language === 'en' ? 'Switch to Russian' : 'Переключить на русский язык'}
              className="text-gray-500 font-bold text-sm cursor-pointer hover:text-brand-blue tracking-wide select-none outline-none"
            >
              {language.toUpperCase()} ▼
            </button>

            {!isDashboard && (
              <button
                onClick={onLoginClick}
                aria-label={language === 'en' ? 'Sign In' : 'Войти в личный кабинет'}
                className="bg-black text-white px-4 py-1 rounded-full text-sm flex items-center gap-2"
              >
                <User size={14} />
                Sign In
              </button>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen((s) => !s)} aria-label="Toggle menu" className="p-2 rounded-md">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-cream/98 border-t border-gray-100/50">
          <ul className="flex flex-col gap-3 p-4 container mx-auto">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => handleScroll(e, item.href)} className="text-brand-dark font-semibold text-base block py-2">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
