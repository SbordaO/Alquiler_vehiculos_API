import React from 'react';
<<<<<<< HEAD
import '../styles/Hero.css';

const Hero = () => {
  return (
    <div id="hero-section" className="hero-container">
      <h1 className="hero-title">Tu Viaje Comienza Aquí</h1>
      <p className="hero-slogan">Elegí tu auto, disfrutá el camino</p>
=======
import { useTranslation } from 'react-i18next';
import '../styles/Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div id="hero-section" className="hero-container">
      <h1 className="hero-title">{t('hero.title')}</h1>
      <p className="hero-slogan">{t('hero.slogan')}</p>
>>>>>>> aec402f (opciones de lenguaje)
    </div>
  );
};

export default Hero;
