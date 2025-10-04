import React from 'react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // Import HashLink
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Nuvia Rent
        </NavLink>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <HashLink to="/#hero-section" className="nav-links" smooth>
              Inicio
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
                Mis Reservas
              </NavLink>
            </li>
          )}
          
          {user && user.role === 'admin' && (
            <li className="nav-item">
              <NavLink to="/admin" className="nav-links">
                Gestión
              </NavLink>
            </li>
          )}
        </ul>

        <ul className="nav-menu nav-menu-right">
          {user ? (
            <li className="nav-item">
              <button onClick={logout} className="nav-button logout">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-links">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-button primary">
                  Registrarse
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
