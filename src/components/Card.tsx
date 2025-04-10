'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  /** Image source URL */
  imageSrc: string;
  /** Alternative text for the image */
  imageAlt: string;
  /** Card heading/title */
  heading: string;
  /** Card description text */
  description: string;
  /** Optional price (for dishes) */
  price?: string;
  /** Optional rating (1-5) */
  rating?: number;
  /** Button text */
  buttonText: string;
  /** Button click handler */
  onButtonClick?: () => void;
  /** Optional card variant */
  variant?: 'dish' | 'service' | 'team' | 'default';
  /** Optional custom class names */
  className?: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt,
  heading,
  description,
  price,
  rating,
  buttonText,
  onButtonClick,
  variant = 'default',
  className,
}) => {
  // Card variants with different styling
  const cardVariants = {
    default: 'bg-white',
    dish: 'bg-white',
    service: 'bg-gray-50',
    team: 'bg-gray-100',
  };

  // Framer Motion animation variants
  const motionVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  // Stars for rating
  const renderRating = () => {
    if (!rating) return null;
    
    return (
      <div className="flex gap-1 mb-2" dir="rtl">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className={clsx(
        'card relative overflow-hidden rounded-2xl p-4 transition-all duration-300',
        'backdrop-blur-md bg-opacity-70 border border-white/20',
        'shadow-[8px_8px_16px_rgba(174,174,192,0.4),-8px_-8px_16px_rgba(255,255,255,0.8)]',
        'hover:shadow-[12px_12px_20px_rgba(174,174,192,0.5),-12px_-12px_20px_rgba(255,255,255,0.9)]',
        cardVariants[variant],
        className
      )}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={motionVariants}
      dir="rtl"
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-80 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10">
        {/* Image container with rounded corners */}
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="space-y-2 text-right">
          <h3 className="text-xl font-bold text-gray-800">{heading}</h3>
          
          {renderRating()}
          
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
          
          {/* Price display */}
          {price && (
            <div className="font-bold text-primary">{price} ₪</div>
          )}
          
          {/* Action button */}
          <motion.button
            onClick={onButtonClick}
            className={clsx(
              'mt-4 w-full py-2 px-4 rounded-xl font-medium text-white',
              'bg-gradient-to-r from-primary to-secondary',
              'shadow-[3px_3px_6px_rgba(174,174,192,0.4),-3px_-3px_6px_rgba(255,255,255,0.8)]',
              'hover:shadow-[5px_5px_10px_rgba(174,174,192,0.5),-5px_-5px_10px_rgba(255,255,255,0.9)]',
              'active:shadow-[inset_3px_3px_6px_rgba(174,174,192,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]',
              'transition-all duration-300'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;