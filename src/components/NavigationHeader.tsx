'use client';

import { useState, useEffect } from 'react';
import { Clock, Calendar, Wind } from 'lucide-react';

interface NavigationHeaderProps {
  isVisible: boolean;
}

export function NavigationHeader({ isVisible }: NavigationHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hourly', 'daily', 'air-quality'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  const navItems = [
    { id: 'hourly', label: 'Hourly', Icon: Clock },
    { id: 'daily', label: 'Daily', Icon: Calendar },
    { id: 'air-quality', label: 'Air Quality', Icon: Wind },
  ];

  return (
    <nav className="sticky top-0 z-40 mb-6 flex justify-center sm:mb-8">
      <div className="inline-flex rounded-2xl bg-white/95 shadow-lg backdrop-blur-md sm:rounded-3xl dark:bg-gray-900/95">
        <div className="flex flex-wrap items-center gap-2 p-3 sm:gap-3 sm:p-4">
          {navItems.map((item) => {
            const IconComponent = item.Icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-3 sm:text-base ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                <IconComponent size={18} className="sm:h-5 sm:w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
