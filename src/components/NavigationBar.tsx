'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaHome, FaUtensils, FaImages, FaInfoCircle, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import clsx from 'clsx';

interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', name: 'בית', href: '/', icon: <FaHome /> },
  { id: 'menu', name: 'תפריט', href: '/menu', icon: <FaUtensils /> },
  { id: 'gallery', name: 'גלריה', href: '/gallery', icon: <FaImages /> },
  { id: 'about', name: 'אודות', href: '/about', icon: <FaInfoCircle /> },
  { id: 'contact', name: 'צור קשר', href: '/contact', icon: <FaEnvelope /> },
  { id: 'booking', name: 'הזמנת מקום', href: '/booking', icon: <FaCalendarAlt /> },
];

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      dir="rtl"
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled 
          ? 'py-2 backdrop-blur-md bg-white/70 shadow-neumorphic-down' 
          : 'py-4 bg-transparent'
      )}
      aria-label="ניווט ראשי"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="/" 
              className="flex items-center"
              aria-label="דף הבית של מסעדה דלתא"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neumorphic-up">
                <span className="text-white font-bold text-xl">דלתא</span>
              </div>
              <span className="mr-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                מסעדה דלתא
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="relative mx-2 px-4 py-2 rounded-xl text-gray-700 hover:text-primary transition-colors duration-300 group flex items-center"
                aria-label={item.name}
              >
                <span className="ml-2">{item.icon}</span>
                <span>{item.name}</span>
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-sm border border-white/20 shadow-neumorphic-up opacity-0 group-hover:opacity-100 -z-10"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </a>
            ))}
            <motion.button
              className="mr-4 px-6 py-2 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-medium shadow-neumorphic-up hover:shadow-neumorphic-down transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="הזמן מקום"
            >
              הזמן מקום
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-xl bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-sm border border-white/20 shadow-neumorphic-up text-gray-700 hover:text-primary transition-colors duration-300"
              whileTap={{ scale: 0.9 }}
              aria-expanded={isOpen}
              aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="rounded-2xl bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-md border border-white/20 shadow-neumorphic-down p-4">
                <div className="flex flex-col space-y-2">
                  {navigationItems.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      className="px-4 py-3 rounded-xl flex items-center text-gray-700 hover:text-primary transition-colors duration-300 hover:bg-white/50"
                      whileHover={{ x: 5 }}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="ml-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </motion.a>
                  ))}
                  <motion.button
                    className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-medium shadow-neumorphic-up hover:shadow-neumorphic-down transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                  >
                    הזמן מקום
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;