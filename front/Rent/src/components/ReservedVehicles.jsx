import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import '../styles/ReservedVehicles.css'; // Import the new CSS file

const ReservedVehicles = () => {
=======
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../styles/ReservedVehicles.css'; // Import the new CSS file

const ReservedVehicles = () => {
  const { t } = useTranslation();
>>>>>>> aec402f (opciones de lenguaje)
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
<<<<<<< HEAD
      setError(err.response?.data?.msg || 'Error al cargar las reservas.');
=======
      setError(err.response?.data?.msg || t('reservedVehicles.load_error'));
>>>>>>> aec402f (opciones de lenguaje)
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
<<<<<<< HEAD
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
=======
    if (window.confirm(t('reservedVehicles.cancel_confirm'))) {
>>>>>>> aec402f (opciones de lenguaje)
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
<<<<<<< HEAD
        setError(err.response?.data?.msg || 'Error al cancelar la reserva.');
=======
        setError(err.response?.data?.msg || t('reservedVehicles.cancel_error'));
>>>>>>> aec402f (opciones de lenguaje)
        console.error('Error canceling reservation:', err);
      }
    }
  };

  const handleModify = (id) => {
    // Placeholder for modify functionality
    console.log('Modify reservation with ID:', id);
<<<<<<< HEAD
    alert('La funcionalidad de modificar aún no está implementada.');
=======
    toast.info(t('reservedVehicles.modify_info'));
>>>>>>> aec402f (opciones de lenguaje)
  };

  return (
    <div className="admin-section">
<<<<<<< HEAD
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
=======
      <h2 className="admin-section-title">{t('reservedVehicles.title')}</h2>
      {loading && <p>{t('reservedVehicles.loading')}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="reservations-list">
        {reservations.length === 0 && !loading && !error && <p>{t('reservedVehicles.no_reservations')}</p>}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-list-item">
            <h3>{t('reservedVehicles.reservation_id', { id: reservation.id })}</h3>
            <p><strong>{t('reservedVehicles.vehicle')}:</strong> {reservation.vehicle_marca} {reservation.vehicle_modelo}</p>
            <p><strong>{t('reservedVehicles.user')}:</strong> {reservation.user_email}</p>
            <p><strong>{t('reservedVehicles.from')}:</strong> {new Date(reservation.desde).toLocaleDateString()} <strong>{t('reservedVehicles.to')}:</strong> {new Date(reservation.hasta).toLocaleDateString()}</p>
            <p><strong>{t('reservedVehicles.total_cost')}:</strong> ${reservation.total}</p>
            <p><strong>{t('reservedVehicles.status')}:</strong> {reservation.estado}</p>
            <div className="reservation-actions">
              <button className="btn-modify" onClick={() => handleModify(reservation.id)}>{t('reservedVehicles.modify_button')}</button>
              <button className="btn-delete" onClick={() => handleCancel(reservation.id)}>{t('reservedVehicles.cancel_button')}</button>
>>>>>>> aec402f (opciones de lenguaje)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservedVehicles;