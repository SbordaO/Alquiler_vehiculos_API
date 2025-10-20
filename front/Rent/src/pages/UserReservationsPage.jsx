import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import '../styles/UserReservationsPage.css';

const UserReservationsPage = () => {
=======
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../styles/UserReservationsPage.css';

const UserReservationsPage = () => {
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
      setError(err.response?.data?.msg || 'Error al cargar tus reservas.');
=======
      setError(err.response?.data?.msg || t('userReservationsPage.load_error'));
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
    if (window.confirm(t('userReservationsPage.cancel_confirm'))) {
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
        setError(err.response?.data?.msg || t('userReservationsPage.cancel_error'));
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
    toast.info(t('userReservationsPage.modify_info'));
>>>>>>> aec402f (opciones de lenguaje)
  };

  return (
    <div style={{ padding: '4rem 2rem' }}>
<<<<<<< HEAD
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Mis Reservas</h1>
      {loading && <p style={{ textAlign: 'center' }}>Cargando tus reservas...</p>}
=======
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('userReservationsPage.title')}</h1>
      {loading && <p style={{ textAlign: 'center' }}>{t('userReservationsPage.loading')}</p>}
>>>>>>> aec402f (opciones de lenguaje)
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div className="reservations-list">
        {!loading && !error && reservations.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
<<<<<<< HEAD
            <p>No tienes ninguna reserva activa.</p>
            <Link to="/" className="form-button">Explorar Vehículos</Link>
=======
            <p>{t('userReservationsPage.no_reservations')}</p>
            <Link to="/" className="form-button">{t('userReservationsPage.explore_button')}</Link>
>>>>>>> aec402f (opciones de lenguaje)
          </div>
        )}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-list-item">
<<<<<<< HEAD
            <h3>Reserva ID: {reservation.id}</h3>
            <p><strong>Vehículo:</strong> {reservation.vehicle_marca} {reservation.vehicle_modelo}</p>
            <p><strong>Desde:</strong> {new Date(reservation.desde).toLocaleDateString()} <strong>Hasta:</strong> {new Date(reservation.hasta).toLocaleDateString()}</p>
            <p><strong>Costo Total:</strong> ${reservation.total}</p>
            <p><strong>Estado:</strong> {reservation.estado}</p>
            <div className="reservation-actions">
              <button className="btn-modify" onClick={() => handleModify(reservation.id)}>Modificar</button>
              <button className="btn-delete" onClick={() => handleCancel(reservation.id)}>Cancelar</button>
=======
            <h3>{t('userReservationsPage.reservation_id', { id: reservation.id })}</h3>
            <p><strong>{t('userReservationsPage.vehicle')}:</strong> {reservation.vehicle_marca} {reservation.vehicle_modelo}</p>
            <p><strong>{t('userReservationsPage.from')}:</strong> {new Date(reservation.desde).toLocaleDateString()} <strong>{t('userReservationsPage.to')}:</strong> {new Date(reservation.hasta).toLocaleDateString()}</p>
            <p><strong>{t('userReservationsPage.total_cost')}:</strong> ${reservation.total}</p>
            <p><strong>{t('userReservationsPage.status')}:</strong> {reservation.estado}</p>
            <div className="reservation-actions">
              <button className="btn-modify" onClick={() => handleModify(reservation.id)}>{t('userReservationsPage.modify_button')}</button>
              <button className="btn-delete" onClick={() => handleCancel(reservation.id)}>{t('userReservationsPage.cancel_button')}</button>
>>>>>>> aec402f (opciones de lenguaje)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReservationsPage;