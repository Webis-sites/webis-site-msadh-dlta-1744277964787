'use client';

import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data submitted:', data);
      setFormStatus('success');
      reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rtl" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">צור קשר</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Information Column */}
          <div className="lg:w-1/2">
            <motion.div 
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-neumorphic dark:shadow-neumorphic-dark h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">פרטי התקשרות</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="glassmorphism-icon">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white">כתובת</h4>
                    <p className="text-gray-600 dark:text-gray-300">רחוב הרצל 123, תל אביב</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="glassmorphism-icon">
                    <FaPhone className="text-primary" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white">טלפון</h4>
                    <p className="text-gray-600 dark:text-gray-300">03-1234567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="glassmorphism-icon">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white">אימייל</h4>
                    <p className="text-gray-600 dark:text-gray-300">info@deltafood.co.il</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="glassmorphism-icon">
                    <FaClock className="text-primary" />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white">שעות פעילות</h4>
                    <p className="text-gray-600 dark:text-gray-300">ראשון - חמישי: 12:00 - 23:00</p>
                    <p className="text-gray-600 dark:text-gray-300">שישי: 12:00 - 16:00</p>
                    <p className="text-gray-600 dark:text-gray-300">שבת: סגור</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-64 rounded-xl overflow-hidden glassmorphism-map">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27034.767847499383!2d34.7672484!3d32.0879801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a2c0963f90!2sTel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1655280303032!5m2!1sen!2sil" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="מפת מיקום המסעדה"
                  aria-label="מפת גוגל המציגה את מיקום המסעדה"
                ></iframe>
              </div>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:w-1/2">
            <motion.div 
              className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-neumorphic dark:shadow-neumorphic-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">שלח הודעה</h3>
              
              {formStatus === 'success' && (
                <motion.div 
                  className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 flex items-center glassmorphism"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FaCheck className="mr-2" />
                  <span>ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.</span>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div 
                  className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex items-center glassmorphism"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <FaTimes className="mr-2" />
                  <span>אירעה שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    שם מלא
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-input-neumorphic ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="הכנס את שמך המלא"
                    {...register('name', { required: 'שדה חובה' })}
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    טלפון
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input-neumorphic ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="הכנס את מספר הטלפון שלך"
                    {...register('phone', { 
                      required: 'שדה חובה',
                      pattern: {
                        value: /^[0-9-+()]*$/,
                        message: 'מספר טלפון לא תקין'
                      }
                    })}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    אימייל
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input-neumorphic ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="הכנס את כתובת האימייל שלך"
                    {...register('email', { 
                      required: 'שדה חובה',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'כתובת אימייל לא תקינה'
                      }
                    })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={`form-input-neumorphic resize-none ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="הכנס את הודעתך כאן"
                    {...register('message', { required: 'שדה חובה' })}
                    aria-invalid={errors.message ? 'true' : 'false'}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-300 font-medium shadow-button focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  whileTap={{ scale: 0.98 }}
                  disabled={formStatus === 'success'}
                >
                  {formStatus === 'idle' ? 'שלח הודעה' : formStatus === 'success' ? 'נשלח בהצלחה' : 'נסה שוב'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;