import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter para el enrutamiento de la aplicación
import { AuthProvider } from './context/AuthContext'; // Importa el proveedor de autenticación
import App from './App'; // Importa el componente principal de la aplicación
import './styles/index.css'; // Importa los estilos CSS globales
<<<<<<< HEAD
=======
import './i18n'; // Importa la configuración de i18next
>>>>>>> aec402f (opciones de lenguaje)

// Renderiza la aplicación React en el elemento HTML con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode activa comprobaciones adicionales y advertencias para sus descendientes
  <React.StrictMode>
    {/* BrowserRouter habilita el enrutamiento basado en el historial del navegador */}
    <BrowserRouter>
      {/* AuthProvider envuelve toda la aplicación para proporcionar el contexto de autenticación a todos los componentes */}
      <AuthProvider>
        {/* El componente principal de la aplicación */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
