import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import '../styles/VehiclesInStock.css';

const VehiclesInStock = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/vehiculos');
      setVehicles(response.data.vehicles);
    } catch (err) {
      setError(t('vehiclesInStock.load_error'));
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [onVehicleAction]); // Re-fetch vehicles if onVehicleAction changes (though it should be stable with useCallback)

  const handleDelete = async (id) => {
    if (window.confirm(t('vehiclesInStock.delete_confirm'))) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3000/vehiculos/${id}`, config);
      setSuccessMessage(t('vehiclesInStock.delete_success'));
      fetchVehicles(); // Refresh the list
      if (onVehicleAction) {
        onVehicleAction(); // Notify parent component of action
      }
    } catch (err) {
        setError(err.response?.data?.msg || t('vehiclesInStock.delete_error'));      console.error('Error deleting vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{t('vehiclesInStock.title')}</h2>
      {loading && <p>{t('vehiclesInStock.loading')}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="vehicles-list">
        {vehicles.length === 0 && !loading && !error && <p>{t('vehiclesInStock.no_vehicles')}</p>}
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-list-item">
            <h3>{vehicle.marca} {vehicle.modelo}</h3>
            <p><strong>{t('vehiclesInStock.year')}:</strong> {vehicle.anio}</p>
            <p><strong>{t('vehiclesInStock.plate')}:</strong> {vehicle.patente}</p>
            <p><strong>{t('vehiclesInStock.price_per_day')}:</strong> ${vehicle.precioPorDia}</p>
            <p><strong>{t('vehiclesInStock.available')}:</strong> {vehicle.disponible ? t('vehiclesInStock.yes') : t('vehiclesInStock.no')}</p>
            <div className="vehicle-actions">
              <button className="btn-modify" onClick={() => handleModify(vehicle.id)}>{t('vehiclesInStock.modify_button')}</button>
              <button className="btn-delete" onClick={() => handleDelete(vehicle.id)}>{t('vehiclesInStock.delete_button')}</button>

};

export default VehiclesInStock;