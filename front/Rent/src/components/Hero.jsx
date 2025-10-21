import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Hero.css';

const Hero = () => {
  const { t = (key) => key } = useTranslation();

  return (
    <div id="hero-section" className="hero-container">
      <h1 className="hero-title">{t('hero.title')}</h1>
      <p className="hero-slogan">{t('hero.slogan')}</p>
    </div>
  );
};

export default Hero;
