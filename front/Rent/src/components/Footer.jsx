import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">Nuvia Rent</div>
        <div className="footer-slogan">Elegí tu auto, disfrutá el camino</div>
        
        <div id="contact-section" className="footer-contact">
          <h3>Contáctanos</h3>
          <p>Email: <a href="mailto:contacto@nuviarent.com">contacto@nuviarent.com</a></p>
          <p>Teléfono: +54 9 11 1234-5678</p>
          <p>Dirección: Calle Falsa 123 Av. Siempre Viva, Springfild, Unite State</p>
        </div>

        <div className="footer-copy">© {new Date().getFullYear()} Nuvia Rent. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
};

export default Footer;
