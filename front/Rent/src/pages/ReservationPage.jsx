import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CustomCalendar from '../components/Calendar'; // Import the calendar
import '../styles/Form.css';
import '../styles/ReservationPage.css';

const ReservationPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchVehicleDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/vehiculos/${vehicleId}`);
        setVehicle(response.data.vehicle);
        setReservations(response.data.reservations || []);
      } catch (err) {
        setError('Error al cargar los detalles del vehículo.');
        console.error('Error fetching vehicle details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehicleId, user, navigate]);

  // Effect to calculate total price whenever dateRange or vehicle changes
  useEffect(() => {
    if (dateRange[0] && dateRange[1] && vehicle) {
      const start = new Date(dateRange[0]);
      const end = new Date(dateRange[1]);
      // Calculate difference in days, including start and end day
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) ;
      setTotalPrice((diffDays * vehicle.precioPorDia).toFixed(2));
    } else {
      setTotalPrice(0);
    }
  }, [dateRange, vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      setError('Debes seleccionar un rango de fechas en el calendario.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const desde = dateRange[0].toISOString().split('T')[0];
    const hasta = dateRange[1].toISOString().split('T')[0];

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        'http://localhost:3000/reservas',
        { vehicleId: parseInt(vehicleId), desde, hasta },
        config
      );
      setSuccessMessage('¡Reserva realizada con éxito!');
      setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al realizar la reserva.');
      console.error('Error making reservation:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !vehicle) return <p className="loading-message">Cargando vehículo...</p>;
  if (error && !vehicle) return <p className="error-message">{error}</p>;
  if (!vehicle) return <p className="error-message">Vehículo no encontrado.</p>;

  const imageUrl = vehicle.imagen && vehicle.imagen.startsWith('http')
    ? vehicle.imagen
    : `/images/${vehicle.imagen || 'default-car.png'}`;

  return (
    <div className="reservation-page-container">
      <div className="reservation-details-card">
        <h1 className="reservation-title">Reservar {vehicle.marca} {vehicle.modelo}</h1>
        <img src={imageUrl} alt={`${vehicle.marca} ${vehicle.modelo}`} className="reservation-vehicle-image" onError={(e) => { e.target.onerror = null; e.target.src='/images/default-car.png' }} />
        <p>Año: {vehicle.anio}</p>
        <p>Patente: {vehicle.patente}</p>
        <p className="price">Precio por día: ${vehicle.precioPorDia}</p>
      </div>

      <div className="reservation-form-card form-card">
        <h2 className="form-title">Selecciona Fechas</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <CustomCalendar 
            reservations={reservations}
            onDateChange={setDateRange}
            selectedRange={dateRange}
          />

          <div className="reservation-summary">
            <p><strong>Desde:</strong> {dateRange[0] ? dateRange[0].toLocaleDateString() : '--'}</p>
            <p><strong>Hasta:</strong> {dateRange[1] ? dateRange[1].toLocaleDateString() : '--'}</p>
            {totalPrice > 0 && <p><strong>Total:</strong> ${totalPrice}</p>} {/* Display total price */}
          </div>

          <button className="form-button" type="submit" disabled={loading}>
            {loading ? 'Reservando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationPage;
