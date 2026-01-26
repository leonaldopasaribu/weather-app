'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Wind, Map } from 'lucide-react';

interface NavigationHeaderProps {
  isVisible: boolean;
}

export function NavigationHeader({ isVisible }: NavigationHeaderProps) {
  const [activeSection, setActiveSection] = useState<string>('hourly');

  const navItems = [
    { id: 'hourly', label: 'Hourly', Icon: Clock },
    { id: 'daily', label: 'Daily', Icon: Calendar },
    { id: 'air-quality', label: 'Air Quality', Icon: Wind },
    { id: 'weather-map', label: 'Map', Icon: Map },
  ];

  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return;

    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      let currentSection = navItems[0].id;
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, navItems]);

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="sticky top-6 z-40 mb-10 flex justify-center px-4"
        >
          <div className="relative flex items-center gap-1 overflow-hidden rounded-4xl bg-white/70 p-1.5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5 backdrop-blur-2xl dark:bg-gray-900/80 dark:ring-white/10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.Icon;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {/* Animated Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 z-0 rounded-full bg-linear-to-r from-indigo-600 to-blue-600 shadow-lg shadow-blue-500/30"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10 hidden sm:inline">
                    {item.label}
                  </span>
                  <span className="relative z-10 sm:hidden">
                    {isActive ? item.label : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
