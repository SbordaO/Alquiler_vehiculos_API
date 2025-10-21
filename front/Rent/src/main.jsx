import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter para el enrutamiento de la aplicación
import { AuthProvider } from './context/AuthContext'; // Importa el proveedor de autenticación
import App from './App'; // Importa el componente principal de la aplicación
import './styles/index.css'; // Importa los estilos CSS globales
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos CSS de react-toastify

import { I18nextProvider } from 'react-i18next'; // Importa I18nextProvider
import i18n from './i18n'; // Importa la configuración de i18next


// Renderiza la aplicación React en el elemento HTML con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode activa comprobaciones adicionales y advertencias para sus descendientes
  <React.StrictMode>
    {/* BrowserRouter habilita el enrutamiento basado en el historial del navegador */}
    <BrowserRouter>
      {/* AuthProvider envuelve toda la aplicación para proporcionar el contexto de autenticación a todos los componentes */}
      <AuthProvider>
        {/* I18nextProvider envuelve la aplicación para proporcionar el contexto de internacionalización */}
        <I18nextProvider i18n={i18n}>
          {/* El componente principal de la aplicación */}
          <App />
          <ToastContainer /> {/* Agrega ToastContainer aquí */}
        </I18nextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
