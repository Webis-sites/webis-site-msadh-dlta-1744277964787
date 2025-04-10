'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const GallerySection: React.FC = () => {
  // Sample gallery images - replace with your actual restaurant images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/images/restaurant-interior-1.jpg',
      alt: 'חלל פנימי של המסעדה',
      width: 800,
      height: 600,
    },
    {
      id: 2,
      src: '/images/dish-1.jpg',
      alt: 'מנה מיוחדת של השף',
      width: 600,
      height: 800,
    },
    {
      id: 3,
      src: '/images/restaurant-interior-2.jpg',
      alt: 'אזור הישיבה החיצוני',
      width: 800,
      height: 600,
    },
    {
      id: 4,
      src: '/images/dish-2.jpg',
      alt: 'מנת דגל של המסעדה',
      width: 600,
      height: 800,
    },
    {
      id: 5,
      src: '/images/dining-experience.jpg',
      alt: 'חוויית האוכל במסעדה',
      width: 800,
      height: 600,
    },
    {
      id: 6,
      src: '/images/dessert.jpg',
      alt: 'קינוח מיוחד',
      width: 600,
      height: 800,
    },
    {
      id: 7,
      src: '/images/chef.jpg',
      alt: 'השף שלנו בפעולה',
      width: 800,
      height: 600,
    },
    {
      id: 8,
      src: '/images/bar.jpg',
      alt: 'הבר של המסעדה',
      width: 800,
      height: 600,
    },
  ];

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  // Animation variants for gallery items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Handle lightbox navigation
  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  // Close lightbox when clicking outside of the image
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
        setLightboxOpen(false);
      }
    };

    if (lightboxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lightboxOpen]);

  // Close lightbox on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    if (lightboxOpen) {
      window.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [lightboxOpen]);

  // Intersection observer for animation on scroll
  const { ref: galleryRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section dir="rtl" className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with neumorphic style */}
        <div className="text-center mb-12 rounded-2xl p-8 bg-white/80 backdrop-blur-sm shadow-neumorphic">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">הגלריה שלנו</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            צפו בתמונות מהמסעדה שלנו, מהמנות המיוחדות ומחוויית האירוח הייחודית שאנו מציעים. כל תמונה מספרת סיפור של טעם, אווירה ותשוקה לאוכל איכותי.
          </p>
        </div>

        {/* Gallery grid */}
        <motion.div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              className="relative group h-64 overflow-hidden rounded-xl bg-white/40 backdrop-blur-sm p-2 shadow-neumorphic-light hover:shadow-neumorphic-pressed transition-all duration-300"
              variants={itemVariants}
              onClick={() => {
                setSelectedImage(image);
                setLightboxOpen(true);
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More button with neumorphic style */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full bg-white text-gray-800 font-semibold shadow-neumorphic hover:shadow-neumorphic-pressed active:shadow-neumorphic-pressed active:translate-y-0.5 transition-all duration-200 border border-gray-100">
            לגלריה המלאה
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedImage && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            ref={lightboxRef}
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="object-contain max-h-[80vh] rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 right-0 left-0 text-center">
                  <p className="text-white bg-black/50 backdrop-blur-sm inline-block px-4 py-2 rounded-full text-sm">
                    {selectedImage.alt}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handlePrevImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
              <FiChevronRight size={24} />
            </button>
            
            <button 
              onClick={handleNextImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-colors"
            >
              <FiChevronLeft size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;