import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // Import HashLink
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [langDropdown, setLangDropdown] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Nuvia Rent
        </NavLink>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <HashLink to="/#hero-section" className="nav-links" smooth>
              {t('navbar.home')}
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink to="/#flota-section" className="nav-links" smooth>
              Flota
            </HashLink>
          </li>
          <li className="nav-item">
            <HashLink to="/#contact-section" className="nav-links" smooth>
              Contacto
            </HashLink>
          </li>
          {user && (
            <li className="nav-item">
              <NavLink to="/reservas" className="nav-links">
                {t('navbar.my_reservations')}
              </NavLink>
            </li>
          )}
          
          {user && user.role === 'admin' && (
            <li className="nav-item">
              <NavLink to="/admin" className="nav-links">
                {t('navbar.admin')}
              </NavLink>
            </li>
          )}
        </ul>

        <ul className="nav-menu nav-menu-right">
          <li className="nav-item">
            <div className="language-switcher">
              <button onClick={() => setLangDropdown(!langDropdown)} className="nav-button">
                {i18n.language.toUpperCase()}
              </button>
              {langDropdown && (
                <div className="language-dropdown">
                  <button onClick={() => changeLanguage('es')} className="nav-button">ES</button>
                  <button onClick={() => changeLanguage('en')} className="nav-button">EN</button>
                </div>
              )}
            </div>
          </li>
          {user ? (
            <li className="nav-item">
              <button onClick={logout} className="nav-button logout">
                {t('navbar.logout')}
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-links">
                  {t('navbar.login')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-button primary">
                  {t('navbar.register')}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
