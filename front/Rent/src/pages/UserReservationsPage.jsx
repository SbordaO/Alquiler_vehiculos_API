import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/UserReservationsPage.css';

const UserReservationsPage = () => {
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
      setError(err.response?.data?.msg || 'Error al cargar tus reservas.');
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
    <div style={{ padding: '4rem 2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Mis Reservas</h1>
      {loading && <p style={{ textAlign: 'center' }}>Cargando tus reservas...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div className="reservations-list">
        {!loading && !error && reservations.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p>No tienes ninguna reserva activa.</p>
            <Link to="/" className="form-button">Explorar Vehículos</Link>
          </div>
        )}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-list-item">
            <h3>Reserva ID: {reservation.id}</h3>
            <p><strong>Vehículo:</strong> {reservation.vehicle_marca} {reservation.vehicle_modelo}</p>
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

export default UserReservationsPage;