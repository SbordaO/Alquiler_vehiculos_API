import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservedVehicles.css'; // Import the new CSS file

const ReservedVehicles = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:3000/reservas', config);
      setReservations(response.data.reservations);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al cargar las reservas.');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`http://localhost:3000/reservas/${id}`, config);
        fetchReservations(); // Re-fetch reservations to update the list
      } catch (err) {
        setError(err.response?.data?.msg || 'Error al cancelar la reserva.');
        console.error('Error canceling reservation:', err);
      }
    }
  };

  const handleModify = (id) => {
    // Placeholder for modify functionality
    console.log('Modify reservation with ID:', id);
    alert('La funcionalidad de modificar aún no está implementada.');
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Vehículos Reservados</h2>
      {loading && <p>Cargando reservas...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="reservations-list">
        {reservations.length === 0 && !loading && !error && <p>No hay vehículos reservados para mostrar.</p>}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-list-item">
            <h3>Reserva ID: {reservation.id}</h3>
            <p><strong>Vehículo:</strong> {reservation.vehicle_marca} {reservation.vehicle_modelo}</p>
            <p><strong>Usuario:</strong> {reservation.user_email}</p>
            <p><strong>Desde:</strong> {new Date(reservation.desde).toLocaleDateString()} <strong>Hasta:</strong> {new Date(reservation.hasta).toLocaleDateString()}</p>
            <p><strong>Costo Total:</strong> ${reservation.total}</p>
            <p><strong>Estado:</strong> {reservation.estado}</p>
            <div className="reservation-actions">
              <button className="btn-modify" onClick={() => handleModify(reservation.id)}>Modificar</button>
              <button className="btn-delete" onClick={() => handleCancel(reservation.id)}>Cancelar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservedVehicles;