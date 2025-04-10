'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const highlights = [
    {
      id: 1,
      number: '15+',
      text: 'שנות ניסיון',
    },
    {
      id: 2,
      number: '1000+',
      text: 'לקוחות מרוצים',
    },
    {
      id: 3,
      number: '50+',
      text: 'מנות ייחודיות',
    },
  ];

  return (
    <section 
      dir="rtl" 
      className={clsx(
        'py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100',
        className
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Container with Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm z-10 border border-white/20 rounded-2xl"></div>
              <Image
                src="/images/restaurant-interior.jpg"
                alt="מסעדה דלתא - חלל פנימי"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            
            {/* Floating neumorphic card */}
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 z-20">
              <div className="bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-neumorphic">
                <h3 className="text-primary text-xl md:text-2xl font-bold mb-1">מסורת קולינרית</h3>
                <p className="text-gray-700">מאז 2008</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              <span className="text-primary">אודות</span> מסעדה דלתא
            </h2>
            
            <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-glass mb-8">
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                אנחנו מסעדה מוביל בתחום המזון עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                הצוות המקצועי שלנו מחויב להגיש לכם את החוויה הקולינרית הטובה ביותר, עם דגש על חומרי גלם טריים ואיכותיים, טכניקות בישול מתקדמות ושירות אישי ואדיב.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {highlights.map((highlight) => (
                <motion.div
                  key={highlight.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * highlight.id }}
                  viewport={{ once: true }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-neumorphic-sm text-center hover:shadow-neumorphic-hover transition-all duration-300"
                >
                  <span className="block text-3xl md:text-4xl font-bold text-secondary mb-2">
                    {highlight.number}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {highlight.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;