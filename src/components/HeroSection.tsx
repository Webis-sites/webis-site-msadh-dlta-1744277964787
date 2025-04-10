'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface HeroSectionProps {
  restaurantName?: string;
  description?: string;
  ctaText?: string;
  backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  restaurantName = 'מסעדה מוביל בישראל',
  description = 'חווית לקוח מושלמת בכל ביקור',
  ctaText = 'קבע תור עכשיו',
  backgroundImage = '/restaurant-background.jpg',
}) => {
  return (
    <section className="relative h-screen w-full overflow-hidden" dir="rtl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="מסעדה דלתא - תמונת רקע"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center">
          {/* Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={clsx(
              "mx-auto w-full max-w-2xl rounded-2xl p-8 md:p-12",
              "bg-white/15 backdrop-blur-md",
              "border border-white/20",
              "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            )}
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            >
              {restaurantName}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8 text-lg text-white/90 md:text-xl"
            >
              {description}
            </motion.p>

            {/* CTA Button - Neumorphic Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className={clsx(
                  "relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 text-lg font-medium",
                  "bg-gradient-to-br from-primary to-primary/80",
                  "text-white transition-all duration-300",
                  "shadow-[6px_6px_12px_0_rgba(0,0,0,0.3),-4px_-4px_8px_0_rgba(255,255,255,0.1)]",
                  "hover:shadow-[4px_4px_8px_0_rgba(0,0,0,0.3),-2px_-2px_5px_0_rgba(255,255,255,0.1)]",
                  "active:shadow-[inset_4px_4px_8px_0_rgba(0,0,0,0.3),inset_-2px_-2px_5px_0_rgba(255,255,255,0.1)]"
                )}
                aria-label={ctaText}
              >
                <span className="relative z-10">{ctaText}</span>
                <span className="absolute bottom-0 left-0 right-0 top-0 -z-10 rounded-xl bg-gradient-to-br from-secondary/60 to-secondary/20 opacity-0 blur-xl transition-all duration-300 group-hover:opacity-100"></span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
      <div className="absolute -right-16 top-32 h-48 w-48 rounded-full bg-secondary/20 blur-3xl"></div>
    </section>
  );
};

export default HeroSection;