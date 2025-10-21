import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../styles/UserReservationsPage.css';

const UserReservationsPage = () => {
  const { t } = useTranslation();
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
      setError(err.response?.data?.msg || t('userReservationsPage.load_error'));
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm(t('userReservationsPage.cancel_confirm'))) {
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
        setError(err.response?.data?.msg || t('userReservationsPage.cancel_error'));
        console.error('Error canceling reservation:', err);
      }
    }
  };

  const handleModify = (id) => {
    // Placeholder for modify functionality
    console.log('Modify reservation with ID:', id);
    toast.info(t('userReservationsPage.modify_info'));
  };

  return (
    <div style={{ padding: '4rem 2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('userReservationsPage.title')}</h1>
      {loading && <p style={{ textAlign: 'center' }}>{t('userReservationsPage.loading')}</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div className="reservations-list">
        {!loading && !error && reservations.length === 0 && (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p>{t('userReservationsPage.no_reservations')}</p>
            <Link to="/" className="form-button">{t('userReservationsPage.explore_button')}</Link>
          </div>
        )}
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-list-item">
            <h3>{t('userReservationsPage.reservation_id', { id: reservation.id })}</h3>
            <p><strong>{t('userReservationsPage.vehicle')}:</strong> {reservation.vehicle_marca} {reservation.vehicle_modelo}</p>
            <p><strong>{t('userReservationsPage.from')}:</strong> {new Date(reservation.desde).toLocaleDateString()} <strong>{t('userReservationsPage.to')}:</strong> {new Date(reservation.hasta).toLocaleDateString()}</p>
            <p><strong>{t('userReservationsPage.total_cost')}:</strong> ${reservation.total}</p>
            <p><strong>{t('userReservationsPage.status')}:</strong> {reservation.estado}</p>
            <div className="reservation-actions">
              <button className="btn-modify" onClick={() => handleModify(reservation.id)}>{t('userReservationsPage.modify_button')}</button>
              <button className="btn-delete" onClick={() => handleCancel(reservation.id)}>{t('userReservationsPage.cancel_button')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReservationsPage;