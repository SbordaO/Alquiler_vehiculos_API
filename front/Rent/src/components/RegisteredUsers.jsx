import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisteredUsers.css'; // Import the new CSS file

const RegisteredUsers = () => {
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
      setError(err.response?.data?.msg || 'Error al cargar los usuarios.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // The following functions are placeholders as the backend functionality is not yet implemented
  const handleMakeAdmin = (userId) => {
    alert(`Funcionalidad no implementada: Hacer admin al usuario ${userId}`);
  };

  const handleModifyUser = (userId) => {
    alert(`Funcionalidad no implementada: Modificar usuario ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    alert(`Funcionalidad no implementada: Eliminar usuario ${userId}`);
  };

  const admins = users.filter(user => user.rol === 'admin');
  const clients = users.filter(user => user.rol !== 'admin');

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Usuarios Registrados</h2>
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      {users.length === 0 && !loading && !error && <p>No hay usuarios registrados para mostrar.</p>}
      
      {/* Administrators Section */}
      <div className="user-group">
        <h3 className="user-group-title">Administradores</h3>
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
        <h3 className="user-group-title">Clientes</h3>
        <div className="users-list-container">
          {clients.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.nombre}</h3>
              <p>{user.email}</p>
              <p><span className={`user-role ${user.rol}`}>{user.rol}</span></p>
              <div className="user-actions">
                <button className="btn-modify-user" onClick={() => handleModifyUser(user.id)}>Modificar</button>
                <button className="btn-delete-user" title="Funcionalidad no disponible">Eliminar</button>
              </div>
              {user.rol !== 'admin' && (
                <button 
                  className="make-admin-button"
                  onClick={() => handleMakeAdmin(user.id)}
                  disabled={loading}
                  style={{marginTop: '10px', width: '100%'}}
                >
                  Hacer Administrador
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