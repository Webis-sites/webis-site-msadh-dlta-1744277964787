'use client';

import React from 'react';
import HeroSection from '../components/HeroSection';
import NavigationBar from '../components/NavigationBar';
import AboutSection from '../components/AboutSection';
import FeaturedDishes from '../components/FeaturedDishes';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import BookingSystem from '../components/BookingSystem';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* כאן יתווספו הקומפוננטות שייווצרו על ידי המחולל */}
        <HeroSection />
    <NavigationBar />
    <AboutSection />
    <FeaturedDishes />
    <ServicesSection />
    <GallerySection />
    <BookingSystem />
  </main>
      
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 מסעדה דלתא. webis
        </div>
      </footer>
    </div>
  );
}