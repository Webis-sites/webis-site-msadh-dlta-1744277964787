'use client';

import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FooterProps {
  restaurantName?: string;
  logo?: string;
  description?: string;
}

const Footer: React.FC<FooterProps> = ({
  restaurantName = 'מסעדה דלתא',
  logo = '/logo.png',
  description = 'מסעדה דלתא מציעה חוויה קולינרית ייחודית עם תפריט עשיר ומגוון. אנו מתמחים במטבח ים תיכוני עם נגיעות מודרניות.'
}) => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'דף הבית', href: '/' },
    { name: 'תפריט', href: '/menu' },
    { name: 'אודות', href: '/about' },
    { name: 'גלריה', href: '/gallery' },
    { name: 'הזמנת מקום', href: '/reservation' },
  ];

  const businessHours = [
    { day: 'ראשון - חמישי', hours: '12:00 - 23:00' },
    { day: 'שישי', hours: '12:00 - 15:00' },
    { day: 'שבת', hours: '18:00 - 23:00' },
  ];

  const socialLinks = [
    { name: 'פייסבוק', icon: <FaFacebook />, href: '#' },
    { name: 'אינסטגרם', icon: <FaInstagram />, href: '#' },
    { name: 'טוויטר', icon: <FaTwitter />, href: '#' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    alert('תודה שנרשמת לניוזלטר שלנו!');
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50/90 to-gray-100/90 backdrop-blur-md border-t border-gray-200/50 text-right rtl" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex flex-col items-start">
              <div className="neumorphic-logo mb-4 p-4 rounded-xl">
                <img src={logo} alt={restaurantName} className="h-16 w-auto" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{restaurantName}</h3>
              <p className="text-gray-700 mb-4">{description}</p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <div className="glassmorphic-card p-6 rounded-xl h-full">
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-gray-200/50 pb-2">ניווט מהיר</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-gray-700 hover:text-secondary transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Information and Business Hours */}
          <div className="lg:col-span-1">
            <div className="glassmorphic-card p-6 rounded-xl h-full">
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-gray-200/50 pb-2">צור קשר</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <FaPhone className="text-secondary flex-shrink-0" />
                  <span className="text-gray-700">03-1234567</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-secondary flex-shrink-0" />
                  <span className="text-gray-700">info@delta-restaurant.co.il</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-secondary flex-shrink-0" />
                  <span className="text-gray-700">רחוב הירקון 123, תל אביב</span>
                </li>
              </ul>

              <h3 className="text-lg font-bold text-primary mb-4 border-b border-gray-200/50 pb-2">שעות פעילות</h3>
              <ul className="space-y-2">
                {businessHours.map((item, index) => (
                  <li key={index} className="flex justify-between text-gray-700">
                    <span className="font-medium">{item.day}:</span>
                    <span>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter and Social */}
          <div className="lg:col-span-1">
            <div className="glassmorphic-card p-6 rounded-xl h-full">
              <h3 className="text-lg font-bold text-primary mb-4 border-b border-gray-200/50 pb-2">הישארו מעודכנים</h3>
              <p className="text-gray-700 mb-4">הירשמו לניוזלטר שלנו לקבלת עדכונים ומבצעים</p>
              
              <form onSubmit={handleNewsletterSubmit} className="mb-6">
                <div className="flex flex-col space-y-3">
                  <input 
                    type="email" 
                    placeholder="הזינו את כתובת האימייל שלכם" 
                    className="neumorphic-input px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <motion.button 
                    type="submit"
                    className="neumorphic-button bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    הרשמה
                  </motion.button>
                </div>
              </form>

              <h3 className="text-lg font-bold text-primary mb-4 border-b border-gray-200/50 pb-2">עקבו אחרינו</h3>
              <div className="flex space-x-4 space-x-reverse">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="neumorphic-social-icon w-10 h-10 flex items-center justify-center rounded-full text-secondary hover:text-primary transition-colors duration-300"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200/50 text-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} {restaurantName}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;