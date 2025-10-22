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
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdown(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Nuvia Rent
        </NavLink>
        
        <div className="menu-icon" onClick={handleClick}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <div className={isOpen ? 'nav-menu-container active' : 'nav-menu-container'}>
          <ul className="nav-menu">
            <li className="nav-item">
              <HashLink to="/#hero-section" className="nav-links" smooth onClick={handleClick}>
                {t('navbar.home')}
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink to="/#flota-section" className="nav-links" smooth onClick={handleClick}>
                {t('navbar.fleet')}
              </HashLink>
            </li>
            <li className="nav-item">
              <HashLink to="/#contact-section" className="nav-links" smooth onClick={handleClick}>
                {t('navbar.contact')}
              </HashLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink to="/reservas" className="nav-links" onClick={handleClick}>
                  {t('navbar.my_reservations')}
                </NavLink>
              </li>
            )}
            
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <NavLink to="/admin" className="nav-links" onClick={handleClick}>
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
                    <button onClick={() => { changeLanguage('es'); handleClick(); }} className="nav-button">ES</button>
                    <button onClick={() => { changeLanguage('en'); handleClick(); }} className="nav-button">EN</button>
                  </div>
                )}
              </div>
                      </li>
                      {user ? (
                        <li className="nav-item welcome-item">
                          <span className="welcome-message">{t('navbar.welcome', { username: user.name })}</span>
                          <button onClick={() => { logout(); handleClick(); }} className="nav-button logout">
                            {t('navbar.logout')}
                          </button>
                        </li>
                      ) : (
                        <>
                          <li className="nav-item">
                            <NavLink to="/login" className="nav-links" onClick={handleClick}>
                              {t('navbar.login')}
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/register" className="nav-button primary" onClick={handleClick}>
                              {t('navbar.register')}
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>        </div>
      </div>
    </nav>
  );
};

export default Navbar;
