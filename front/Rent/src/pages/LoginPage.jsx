import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext'; // Importar useAuth
import '../styles/Form.css';

const LoginPage = () => {
=======
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'; // Importar useAuth
import { useTranslation } from 'react-i18next';
import '../styles/Form.css';

const LoginPage = () => {
  const { t } = useTranslation();
>>>>>>> aec402f (opciones de lenguaje)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
<<<<<<< HEAD
      setError('Email y contraseña son obligatorios.');
=======
      setError(t('loginPage.error_credentials_required'));
>>>>>>> aec402f (opciones de lenguaje)
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log(response.data);
      login(response.data.token, response.data.rol); // Usar la función login del contexto
<<<<<<< HEAD
      alert('Inicio de sesión exitoso!');
      navigate('/'); // Redirigir a la página principal
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Error al iniciar sesión.');
=======
      toast.success(t('loginPage.login_success'));
      navigate('/'); // Redirigir a la página principal
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || t('loginPage.login_error'));
>>>>>>> aec402f (opciones de lenguaje)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
<<<<<<< HEAD
        <h1 className="form-title">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
=======
        <h1 className="form-title">{t('loginPage.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">{t('loginPage.email_label')}</label>
>>>>>>> aec402f (opciones de lenguaje)
            <input
              className="form-input"
              type="email"
              id="email"
<<<<<<< HEAD
              placeholder="tu@email.com"
=======
              placeholder={t('loginPage.email_placeholder')}
>>>>>>> aec402f (opciones de lenguaje)
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
<<<<<<< HEAD
            <label className="form-label" htmlFor="password">Contraseña</label>
=======
            <label className="form-label" htmlFor="password">{t('loginPage.password_label')}</label>
>>>>>>> aec402f (opciones de lenguaje)
            <input
              className="form-input"
              type="password"
              id="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <button className="form-button" type="submit" disabled={loading}>
<<<<<<< HEAD
            {loading ? 'Iniciando sesión...' : 'Login'}
          </button>
        </form>
        <p className="form-switch-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
=======
            {loading ? t('loginPage.loading_button') : t('loginPage.login_button')}
          </button>
        </form>
        <p className="form-switch-link">
          {t('loginPage.no_account')} <Link to="/register">{t('loginPage.register_link')}</Link>
>>>>>>> aec402f (opciones de lenguaje)
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
