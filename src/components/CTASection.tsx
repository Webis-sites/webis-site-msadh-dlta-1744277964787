'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaCalendarAlt } from 'react-icons/fa';

interface CTASectionProps {
  backgroundImage?: string;
  heading?: string;
  subtext?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  backgroundImage = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
  heading = 'הזמינו שולחן במסעדת דלתא',
  subtext = 'הצטרפו אלינו לחוויה קולינרית יוצאת דופן. המטבח שלנו משלב טעמים מסורתיים עם נגיעות מודרניות.',
  primaryButtonText = 'קבע תור עכשיו',
  secondaryButtonText = 'הצג תפריט',
  onPrimaryClick = () => console.log('Primary button clicked'),
  onSecondaryClick = () => console.log('Secondary button clicked'),
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  const neumorphicButton = (isPrimary: boolean) => `
    relative 
    ${isPrimary ? 'bg-secondary' : 'bg-white bg-opacity-20'} 
    rounded-xl 
    px-8 py-3 
    font-bold 
    text-${isPrimary ? 'white' : 'secondary'} 
    shadow-neumorphic 
    hover:shadow-neumorphic-pressed 
    active:shadow-neumorphic-pressed 
    active:translate-y-0.5 
    transition-all 
    duration-300 
    backdrop-filter 
    backdrop-blur-sm 
    ${isPrimary ? '' : 'border border-white border-opacity-30'}
    flex 
    items-center 
    justify-center 
    gap-2
  `;

  return (
    <div ref={sectionRef} className="relative overflow-hidden h-[500px] w-full" dir="rtl">
      {/* Background image with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />

      {/* Overlay with primary color */}
      <div className="absolute inset-0 bg-primary bg-opacity-80 backdrop-filter backdrop-blur-sm" />

      {/* Glassmorphism container */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glassmorphism-card max-w-3xl w-full mx-auto text-center p-10 rounded-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            {heading}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg mb-8 text-white text-opacity-90"
          >
            {subtext}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={onPrimaryClick}
              className={neumorphicButton(true)}
              aria-label="הזמן שולחן"
            >
              <FaCalendarAlt />
              {primaryButtonText}
            </button>
            
            <button
              onClick={onSecondaryClick}
              className={neumorphicButton(false)}
              aria-label="הצג תפריט"
            >
              <FaUtensils />
              {secondaryButtonText}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;