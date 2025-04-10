'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaTruck, FaGlassCheers, FaUsers } from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  learnMoreUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, learnMoreUrl }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl z-0"></div>
      
      {/* Neumorphic inner content */}
      <div className="relative z-10 flex flex-col items-center text-center h-full">
        <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 shadow-neumorphic">
          <div className="text-3xl text-primary">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {learnMoreUrl && (
          <a 
            href={learnMoreUrl} 
            className="mt-auto inline-block py-2 px-4 rounded-lg bg-secondary/80 text-white hover:bg-secondary transition-all duration-300 shadow-neumorphic-btn hover:shadow-neumorphic-btn-hover"
          >
            למידע נוסף
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <FaUtensils />,
      title: "חוויית אוכל במקום",
      description: "תיהנו מחוויית אוכל ייחודית באווירה מיוחדת עם תפריט עשיר ומגוון שמותאם לכל הטעמים.",
      learnMoreUrl: "/dine-in"
    },
    {
      icon: <FaTruck />,
      title: "משלוחים",
      description: "אנחנו מביאים את הטעמים הייחודיים שלנו ישירות אליכם הביתה עם שירות משלוחים מהיר ואמין.",
      learnMoreUrl: "/delivery"
    },
    {
      icon: <FaGlassCheers />,
      title: "אירועים פרטיים",
      description: "הפכו את האירוע שלכם לבלתי נשכח עם תפריט מותאם אישית ושירות מקצועי ברמה גבוהה.",
      learnMoreUrl: "/private-events"
    },
    {
      icon: <FaUsers />,
      title: "קייטרינג",
      description: "שירותי קייטרינג איכותיים לכל סוגי האירועים, מפגישות עסקים ועד לחתונות גדולות.",
      learnMoreUrl: "/catering"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden" dir="rtl">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">השירותים שלנו</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            במסעדת דלתא אנחנו מציעים מגוון שירותים כדי להבטיח שכל חוויית האוכל שלכם תהיה מושלמת, בין אם אתם מבקרים אצלנו או נהנים מהאוכל שלנו במקום אחר.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              learnMoreUrl={service.learnMoreUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;