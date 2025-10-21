import { Routes, Route } from 'react-router-dom'; // Importa componentes para definir rutas en la aplicación
import { ToastContainer } from 'react-toastify'; // Importa el contenedor de notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import Navbar from './components/Navbar'; // Componente de la barra de navegación
import Footer from './components/Footer'; // Componente del pie de página
import HomePage from './pages/HomePage'; // Página de inicio
import LoginPage from './pages/LoginPage'; // Página de inicio de sesión
import RegisterPage from './pages/RegisterPage'; // Página de registro
import AdminPage from './pages/AdminPage'; // Página de administración (protegida)
import ReservationPage from './pages/ReservationPage'; // Página para realizar una reserva
import UserReservationsPage from './pages/UserReservationsPage'; // Página para ver las reservas del usuario
import ProtectedRoute from './components/ProtectedRoute'; // Componente para proteger rutas que requieren autenticación

// Componente principal de la aplicación
function App() {
  return (
    // Fragmento de React para agrupar elementos sin añadir nodos extra al DOM
    <>
      {/* Barra de navegación visible en todas las páginas */}
      <Navbar />
      {/* Contenedor principal del contenido de la aplicación */}
      <main style={{ flex: '1 0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Definición de las rutas de la aplicación */}
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/login" element={<LoginPage />} />
          {/* Ruta para la página de registro */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Ruta para la página de reserva de un vehículo específico, usando un parámetro de URL para el ID del vehículo */}
          <Route path="/reservar/:vehicleId" element={<ReservationPage />} />
          {/* Ruta para la página de reservas del usuario */}
          <Route path="/reservas" element={<UserReservationsPage />} />
          {/* Ruta protegida para la página de administración */}
          {/* Solo los usuarios autenticados y con el rol adecuado podrán acceder a esta ruta */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {/* Pie de página visible en todas las páginas */}
      <Footer />
      {/* Contenedeor de Toast Notifications */}
      <ToastContainer />

    </>
  );
}

export default App;
