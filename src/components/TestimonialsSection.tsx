'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaStar, FaStarHalf, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  quote: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'יעל כהן',
    rating: 5,
    quote: 'האוכל במסעדת דלתא פשוט מדהים! הטעמים עשירים והשירות מעולה. אני ממליצה בחום על המנות הים תיכוניות.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 2,
    name: 'דוד לוי',
    rating: 4.5,
    quote: 'חוויה קולינרית ברמה גבוהה. האווירה נעימה והצוות אדיב במיוחד. בהחלט אחזור לכאן שוב בקרוב!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 3,
    name: 'מיכל אברהם',
    rating: 5,
    quote: 'המנות היצירתיות והשירות המקצועי הפכו את הערב שלנו למושלם. מסעדת דלתא היא פנינה אמיתית!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 4,
    name: 'אבי גולדשטיין',
    rating: 4.5,
    quote: 'האווירה, העיצוב והאוכל - הכל מושלם. מקום מצוין לארוחות משפחתיות או לערב רומנטי.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 5,
    name: 'רונית שרון',
    rating: 5,
    quote: 'השף במסעדת דלתא הוא אמן אמיתי. כל מנה היא יצירת אמנות בפני עצמה. חוויה קולינרית שלא תישכח!',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    id: 6,
    name: 'יוסי מזרחי',
    rating: 4.5,
    quote: 'מסעדה ברמה בינלאומית. המנות מוגשות בצורה מרשימה והטעמים מדהימים. אני ממליץ בחום!',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80'
  }
];

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-star-${i}`} className="text-gray-300" />);
  }

  return <div className="flex gap-1">{stars}</div>;
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex]);

  const currentTestimonials = () => {
    const start = currentIndex * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gray-800 relative inline-block">
            <span className="relative z-10">הלקוחות שלנו מספרים</span>
            <span className="absolute bottom-1 right-0 w-full h-3 bg-primary opacity-20 transform -rotate-1"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            אלפי לקוחות מרוצים נהנים מהחוויה הקולינרית שלנו. הנה מה שיש להם לומר.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentTestimonials().map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className={clsx(
                      "relative p-6 rounded-2xl overflow-hidden transition-all duration-300",
                      "backdrop-blur-md bg-white/70 border border-white/20",
                      "shadow-[5px_5px_15px_rgba(0,0,0,0.05),-5px_-5px_15px_rgba(255,255,255,0.8)]",
                      "hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.05),inset_-5px_-5px_10px_rgba(255,255,255,0.8)]",
                      "flex flex-col h-full"
                    )}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        {testimonial.image && (
                          <div className="mr-4 relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                              <FaQuoteRight className="text-primary text-sm" />
                            </div>
                          </div>
                        )}
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                          <RatingStars rating={testimonial.rating} />
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{testimonial.quote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={prevSlide}
              className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "bg-white/80 backdrop-blur-sm border border-white/20",
                "shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]",
                "hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]",
                "transition-all duration-300 text-gray-700 hover:text-primary"
              )}
              aria-label="הקודם"
            >
              <FaChevronRight className="text-lg" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={clsx(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    "shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)]",
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`עבור לעמוד ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "bg-white/80 backdrop-blur-sm border border-white/20",
                "shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)]",
                "hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]",
                "transition-all duration-300 text-gray-700 hover:text-primary"
              )}
              aria-label="הבא"
            >
              <FaChevronLeft className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;