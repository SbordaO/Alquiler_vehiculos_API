import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook para la navegación programática

// Crea un contexto de autenticación. Será usado para compartir el estado de autenticación a través de la aplicación.
const AuthContext = createContext(null);

// Componente proveedor de autenticación
// Envuelve a los componentes hijos y les proporciona el estado y las funciones de autenticación.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario autenticado (token y rol)
  const [loading, setLoading] = useState(true); // Nuevo estado para indicar si la autenticación está cargando
  const navigate = useNavigate(); // Instancia del hook de navegación

  // Efecto que se ejecuta una vez al montar el componente para verificar la sesión existente
  useEffect(() => {
    const token = localStorage.getItem('token'); // Intenta obtener el token del almacenamiento local
    const userRole = localStorage.getItem('userRole'); // Intenta obtener el rol del usuario del almacenamiento local
    // Si existen token y rol, establece el estado del usuario
    if (token && userRole) {
      setUser({ token, role: userRole });
    }
    setLoading(false); // Set loading to false after checking for token
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Función para iniciar sesión
  // Almacena el token y el rol en el almacenamiento local y actualiza el estado del usuario.
  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setUser({ token, role });
  };

  // Función para cerrar sesión
  // Elimina el token y el rol del almacenamiento local, resetea el estado del usuario y redirige a la página de login.
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setUser(null);
    navigate('/login');
  };

  // Provee el estado del usuario y las funciones de login/logout a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
// Facilita el acceso al estado y funciones de autenticación desde cualquier componente funcional.
export const useAuth = () => useContext(AuthContext);
