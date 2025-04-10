'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'right' | 'left';
  size?: 'small' | 'medium' | 'large';
  decorationType?: 'lines' | 'dots' | 'icon';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  size = 'medium',
  decorationType = 'lines',
  className,
}) => {
  // Size variants
  const titleSizes = {
    small: 'text-xl md:text-2xl',
    medium: 'text-2xl md:text-3xl',
    large: 'text-3xl md:text-4xl',
  };

  const subtitleSizes = {
    small: 'text-sm md:text-base',
    medium: 'text-base md:text-lg',
    large: 'text-lg md:text-xl',
  };

  // Alignment classes
  const alignmentClasses = {
    center: 'text-center mx-auto',
    right: 'text-right mr-0 ml-auto',
    left: 'text-left ml-0 mr-auto',
  };

  // Render decoration based on type
  const renderDecoration = () => {
    switch (decorationType) {
      case 'lines':
        return (
          <div className={`flex items-center justify-${align} my-2`}>
            <div className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent w-16 mx-2"></div>
            <div className="h-1 w-8 rounded-full bg-primary"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-secondary to-transparent w-16 mx-2"></div>
          </div>
        );
      case 'dots':
        return (
          <div className={`flex items-center justify-${align} my-2`}>
            <div className="h-1 w-1 rounded-full bg-secondary mx-1"></div>
            <div className="h-2 w-2 rounded-full bg-primary mx-1"></div>
            <div className="h-3 w-3 rounded-full bg-secondary mx-1"></div>
            <div className="h-2 w-2 rounded-full bg-primary mx-1"></div>
            <div className="h-1 w-1 rounded-full bg-secondary mx-1"></div>
          </div>
        );
      case 'icon':
        return (
          <div className={`flex items-center justify-${align} my-2`}>
            <svg 
              className="w-6 h-6 text-primary" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" 
                fill="currentColor" 
              />
              <path 
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" 
                fill="currentColor" 
              />
              <path 
                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" 
                fill="currentColor" 
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      dir="rtl" 
      className={clsx(
        'w-full max-w-3xl px-4 py-6',
        alignmentClasses[align],
        className
      )}
    >
      <div className="relative">
        {/* Neumorphic/Glassmorphic container */}
        <div className="relative backdrop-blur-sm bg-white/30 rounded-2xl p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_8px_20px_rgba(0,0,0,0.1)] border border-white/20">
          {/* Title with animation */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx(
              'font-bold text-gray-800 mb-2 relative',
              titleSizes[size]
            )}
          >
            {title}
            {/* Subtle underline effect */}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary opacity-70 rounded-full"></span>
          </motion.h2>

          {/* Decoration element */}
          {renderDecoration()}

          {/* Subtitle with animation if provided */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={clsx(
                'text-gray-600 mt-2 max-w-2xl',
                subtitleSizes[size],
                align === 'center' && 'mx-auto'
              )}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        {/* Glassmorphism effect - subtle colored background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-50"></div>
      </div>
    </div>
  );
};

export default SectionHeader;