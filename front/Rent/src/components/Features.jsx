import React from 'react';
<<<<<<< HEAD
=======
import { useTranslation } from 'react-i18next';
>>>>>>> aec402f (opciones de lenguaje)
import '../styles/Features.css';

// Simple SVG Icon Components
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.5M10 4H4v6h6V4zM10 12H4v6h6v-6zM20 4h-6v6h6V4zM20 12h-6v6h6v-6z"/></svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const FeatureCard = ({ icon, title, text }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-text">{text}</p>
  </div>
);

const Features = () => {
<<<<<<< HEAD
=======
  const { t } = useTranslation();

>>>>>>> aec402f (opciones de lenguaje)
  return (
    <section className="features-section">
      <div className="features-container">
        <FeatureCard 
          icon={<CarIcon />}
<<<<<<< HEAD
          title="Amplia Flota"
          text="Vehículos modernos y variados para cada tipo de viaje."
        />
        <FeatureCard 
          icon={<CalendarIcon />}
          title="Reserva Fácil y Rápido"
          text="Alquilá tu auto en minutos con nuestro sistema intuitivo."
        />
        <FeatureCard 
          icon={<ShieldIcon />}
          title="Seguro y Confiable"
          text="Todos nuestros vehículos cuentan con seguro y mantenimiento al día."
=======
          title={t('features.fleet.title')}
          text={t('features.fleet.text')}
        />
        <FeatureCard 
          icon={<CalendarIcon />}
          title={t('features.booking.title')}
          text={t('features.booking.text')}
        />
        <FeatureCard 
          icon={<ShieldIcon />}
          title={t('features.safety.title')}
          text={t('features.safety.text')}
>>>>>>> aec402f (opciones de lenguaje)
        />
      </div>
    </section>
  );
};

export default Features;
