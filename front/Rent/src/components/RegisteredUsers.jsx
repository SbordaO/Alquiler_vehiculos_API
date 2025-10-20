import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import '../styles/RegisteredUsers.css'; // Import the new CSS file

const RegisteredUsers = () => {
=======
import { useTranslation } from 'react-i18next';
import '../styles/RegisteredUsers.css'; // Import the new CSS file

const RegisteredUsers = () => {
  const { t } = useTranslation();
>>>>>>> aec402f (opciones de lenguaje)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:3000/usuarios', config);
      setUsers(response.data.users); // API returns an object with a 'users' array
    } catch (err) {
<<<<<<< HEAD
      setError(err.response?.data?.msg || 'Error al cargar los usuarios.');
=======
      setError(err.response?.data?.msg || t('registeredUsers.load_error'));
>>>>>>> aec402f (opciones de lenguaje)
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // The following functions are placeholders as the backend functionality is not yet implemented
  const handleMakeAdmin = (userId) => {
<<<<<<< HEAD
    alert(`Funcionalidad no implementada: Hacer admin al usuario ${userId}`);
  };

  const handleModifyUser = (userId) => {
    alert(`Funcionalidad no implementada: Modificar usuario ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    alert(`Funcionalidad no implementada: Eliminar usuario ${userId}`);
=======
    alert(t('registeredUsers.make_admin_info', { userId }));
  };

  const handleModifyUser = (userId) => {
    alert(t('registeredUsers.modify_user_info', { userId }));
  };

  const handleDeleteUser = (userId) => {
    alert(t('registeredUsers.delete_user_info', { userId }));
>>>>>>> aec402f (opciones de lenguaje)
  };

  const admins = users.filter(user => user.rol === 'admin');
  const clients = users.filter(user => user.rol !== 'admin');

  return (
    <div className="admin-section">
<<<<<<< HEAD
      <h2 className="admin-section-title">Usuarios Registrados</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      {users.length === 0 && !loading && !error && <p>No hay usuarios registrados para mostrar.</p>}
      
      {/* Administrators Section */}
      <div className="user-group">
        <h3 className="user-group-title">Administradores</h3>
=======
      <h2 className="admin-section-title">{t('registeredUsers.title')}</h2>
      {loading && <p>{t('registeredUsers.loading')}</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      {users.length === 0 && !loading && !error && <p>{t('registeredUsers.no_users')}</p>}
      
      {/* Administrators Section */}
      <div className="user-group">
        <h3 className="user-group-title">{t('registeredUsers.admins_title')}</h3>
>>>>>>> aec402f (opciones de lenguaje)
        <div className="users-list-container">
          {admins.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.nombre}</h3>
              <p>{user.email}</p>
              <p><span className={`user-role ${user.rol}`}>{user.rol}</span></p>
            </div>
          ))}
        </div>
      </div>

      {/* Clients Section */}
      <div className="user-group">
<<<<<<< HEAD
        <h3 className="user-group-title">Clientes</h3>
=======
        <h3 className="user-group-title">{t('registeredUsers.clients_title')}</h3>
>>>>>>> aec402f (opciones de lenguaje)
        <div className="users-list-container">
          {clients.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.nombre}</h3>
              <p>{user.email}</p>
              <p><span className={`user-role ${user.rol}`}>{user.rol}</span></p>
              <div className="user-actions">
<<<<<<< HEAD
                <button className="btn-modify-user" onClick={() => handleModifyUser(user.id)}>Modificar</button>
                <button className="btn-delete-user" title="Funcionalidad no disponible">Eliminar</button>
=======
                <button className="btn-modify-user" onClick={() => handleModifyUser(user.id)}>{t('registeredUsers.modify_button')}</button>
                <button className="btn-delete-user" title={t('registeredUsers.delete_button_title')}>{t('registeredUsers.delete_button')}</button>
>>>>>>> aec402f (opciones de lenguaje)
              </div>
              {user.rol !== 'admin' && (
                <button 
                  className="make-admin-button"
                  onClick={() => handleMakeAdmin(user.id)}
                  disabled={loading}
                  style={{marginTop: '10px', width: '100%'}}
                >
<<<<<<< HEAD
                  Hacer Administrador
=======
                  {t('registeredUsers.make_admin_button')}
>>>>>>> aec402f (opciones de lenguaje)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredUsers;