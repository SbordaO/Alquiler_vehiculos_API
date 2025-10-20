import React from 'react';
<<<<<<< HEAD
import '../styles/Footer.css';

const Footer = () => {
=======
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useTranslation();

>>>>>>> aec402f (opciones de lenguaje)
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">Nuvia Rent</div>
<<<<<<< HEAD
        <div className="footer-slogan">Elegí tu auto, disfrutá el camino</div>
        
        <div id="contact-section" className="footer-contact">
          <h3>Contáctanos</h3>
          <p>Email: <a href="mailto:contacto@nuviarent.com">contacto@nuviarent.com</a></p>
          <p>Teléfono: +54 9 11 1234-5678</p>
          <p>Dirección: Calle Falsa 123 Av. Siempre Viva, Springfild, Unite State</p>
        </div>

        <div className="footer-copy">© {new Date().getFullYear()} Nuvia Rent. Todos los derechos reservados.</div>
=======
        <div className="footer-slogan">{t('hero.slogan')}</div>
        
        <div id="contact-section" className="footer-contact">
          <h3>{t('footer.contact_us')}</h3>
          <p>{t('footer.email')}: <a href="mailto:contacto@nuviarent.com">contacto@nuviarent.com</a></p>
          <p>{t('footer.phone')}: +54 9 11 1234-5678</p>
          <p>{t('footer.address')}: Calle Falsa 123 Av. Siempre Viva, Springfild, Unite State</p>
        </div>

        <div className="footer-copy">© {new Date().getFullYear()} Nuvia Rent. {t('footer.rights_reserved')}</div>
>>>>>>> aec402f (opciones de lenguaje)
      </div>
    </footer>
  );
};

export default Footer;
