'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import clsx from 'clsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const featuredDishes: Dish[] = [
  {
    id: 1,
    name: 'סלט ים תיכוני',
    description: 'סלט טרי עם עגבניות, מלפפונים, פלפלים, בצל סגול, זיתים וגבינת פטה',
    price: 48,
    image: '/images/mediterranean-salad.jpg',
  },
  {
    id: 2,
    name: 'פילה דג ברוטב לימון',
    description: 'פילה דניס טרי צלוי בתנור עם רוטב לימון, שום וצמחי תיבול',
    price: 98,
    image: '/images/fish-fillet.jpg',
  },
  {
    id: 3,
    name: 'ניוקי כמהין',
    description: 'ניוקי תפוחי אדמה ביתי ברוטב שמנת כמהין עם פרמזן מגורר',
    price: 78,
    image: '/images/truffle-gnocchi.jpg',
  },
  {
    id: 4,
    name: 'קינוח שוקולד',
    description: 'פונדנט שוקולד חם עם גלידת וניל וסירופ פירות יער',
    price: 42,
    image: '/images/chocolate-dessert.jpg',
  },
  {
    id: 5,
    name: 'ריזוטו פטריות',
    description: 'ריזוטו עשיר עם מבחר פטריות טריות, יין לבן ופרמזן',
    price: 68,
    image: '/images/mushroom-risotto.jpg',
  },
  {
    id: 6,
    name: 'קרפצ׳יו בקר',
    description: 'פרוסות דקות של פילה בקר טרי עם שמן זית, לימון, רוקט ופרמזן',
    price: 64,
    image: '/images/beef-carpaccio.jpg',
  },
];

const FeaturedDishes: React.FC = () => {
  const [hoveredDish, setHoveredDish] = useState<number | null>(null);

  return (
    <section className="featured-dishes-section py-16 px-4 md:px-8 lg:px-16 rtl" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            המנות המובחרות שלנו
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            מבחר המנות הפופולריות ביותר במסעדת דלתא, מוכנות על ידי השפים המובילים שלנו
          </motion.p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12">
          {featuredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              className="dish-card relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: dish.id * 0.1 }}
              onMouseEnter={() => setHoveredDish(dish.id)}
              onMouseLeave={() => setHoveredDish(null)}
            >
              <div className="glass-card h-full flex flex-col">
                <div className="relative h-56 w-full">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={dish.id <= 3}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-primary">{dish.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-secondary">₪{dish.price}</span>
                    <motion.button
                      className="neumorphic-button text-sm py-1 px-3 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      הוסף להזמנה
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet Carousel View */}
        <div className="lg:hidden mb-12">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
            }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            dir="rtl"
            className="rtl-swiper"
          >
            {featuredDishes.map((dish) => (
              <SwiperSlide key={dish.id}>
                <div className="dish-card h-full rounded-2xl overflow-hidden">
                  <div className="glass-card h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={dish.id <= 2}
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold mb-2 text-primary">{dish.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 flex-grow">{dish.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-secondary">₪{dish.price}</span>
                        <motion.button
                          className="neumorphic-button text-xs py-1 px-2 rounded-full"
                          whileTap={{ scale: 0.95 }}
                        >
                          הוסף להזמנה
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-navigation-container flex justify-center mt-6 gap-4">
              <button className="swiper-button-prev neumorphic-button-circle flex items-center justify-center w-10 h-10 rounded-full">
                <IoArrowForward className="text-primary" />
              </button>
              <button className="swiper-button-next neumorphic-button-circle flex items-center justify-center w-10 h-10 rounded-full">
                <IoArrowBack className="text-primary" />
              </button>
            </div>
          </Swiper>
        </div>

        <div className="text-center">
          <Link href="/menu" passHref>
            <motion.a
              className={clsx(
                "inline-block neumorphic-button-large py-3 px-8 rounded-full",
                "text-lg font-medium transition-all duration-300",
                "bg-gradient-to-r from-primary to-secondary text-white"
              )}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(150, 206, 180, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              לתפריט המלא
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;