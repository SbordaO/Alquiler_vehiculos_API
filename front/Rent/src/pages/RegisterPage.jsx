import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import '../styles/Form.css';

const RegisterPage = () => {
=======
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../styles/Form.css';

const RegisterPage = () => {
  const { t } = useTranslation();
>>>>>>> aec402f (opciones de lenguaje)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
<<<<<<< HEAD
      setError('Las contraseñas no coinciden.');
=======
      setError(t('registerPage.error_password_mismatch'));
>>>>>>> aec402f (opciones de lenguaje)
      return;
    }

    if (!formData.nombre || !formData.email || !formData.password) {
<<<<<<< HEAD
      setError('Todos los campos son obligatorios.');
=======
      setError(t('registerPage.error_all_fields_required'));
>>>>>>> aec402f (opciones de lenguaje)
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
<<<<<<< HEAD
      alert('Registro exitoso. Por favor, inicia sesión.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Error al registrar el usuario.');
=======
      toast.success(t('registerPage.register_success'));
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || t('registerPage.register_error'));
>>>>>>> aec402f (opciones de lenguaje)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
<<<<<<< HEAD
        <h1 className="form-title">Crear Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Nombre</label>
=======
        <h1 className="form-title">{t('registerPage.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">{t('registerPage.name_label')}</label>
>>>>>>> aec402f (opciones de lenguaje)
            <input
              className="form-input"
              type="text"
              id="nombre"
<<<<<<< HEAD
              placeholder="Tu Nombre"
=======
              placeholder={t('registerPage.name_placeholder')}
>>>>>>> aec402f (opciones de lenguaje)
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
<<<<<<< HEAD
            <label className="form-label" htmlFor="email">Email</label>
=======
            <label className="form-label" htmlFor="email">{t('registerPage.email_label')}</label>
>>>>>>> aec402f (opciones de lenguaje)
            <input
              className="form-input"
              type="email"
              id="email"
<<<<<<< HEAD
              placeholder="tu@email.com"
=======
              placeholder={t('registerPage.email_placeholder')}
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
            <label className="form-label" htmlFor="password">{t('registerPage.password_label')}</label>
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
          <div className="form-group">
<<<<<<< HEAD
            <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
=======
            <label className="form-label" htmlFor="confirmPassword">{t('registerPage.confirm_password_label')}</label>
>>>>>>> aec402f (opciones de lenguaje)
            <input
              className="form-input"
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <button className="form-button" type="submit" disabled={loading}>
<<<<<<< HEAD
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <p className="form-switch-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
=======
            {loading ? t('registerPage.loading_button') : t('registerPage.register_button')}
          </button>
        </form>
        <p className="form-switch-link">
          {t('registerPage.already_account')} <Link to="/login">{t('registerPage.login_link')}</Link>
>>>>>>> aec402f (opciones de lenguaje)
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
