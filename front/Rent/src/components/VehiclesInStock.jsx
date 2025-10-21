import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../styles/VehiclesInStock.css';
import ModifyVehicleModal from './ModifyVehicleModal';

const VehiclesInStock = ({ onVehicleAdded }) => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const fetchVehicles = useCallback(async () => {
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
  }, [t]); // Depend on t to re-fetch if language changes

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles, onVehicleAdded]); // Re-fetch vehicles if fetchVehicles or onVehicleAdded changes

  const handleDelete = async (id) => {
    if (!window.confirm(t('vehiclesInStock.delete_confirm'))) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:3000/vehiculos/${id}`, config);
      toast.success(t('vehiclesInStock.delete_success'));
      fetchVehicles(); // Refresh the list
      if (onVehicleAdded) {
        onVehicleAdded(); // Notify parent component of action
      }
    } catch (err) {
      setError(err.response?.data?.msg || t('vehiclesInStock.delete_error'));
      console.error('Error deleting vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModify = (id) => {
    setSelectedVehicleId(id);
    setShowModifyModal(true);
  };

  const handleCloseModal = () => {
    setShowModifyModal(false);
    setSelectedVehicleId(null);
  };

  const handleVehicleModified = () => {
    handleCloseModal();
    fetchVehicles(); // Refresh the list after modification
    if (onVehicleAdded) {
      onVehicleAdded(); // Notify parent component if needed
    }
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{t('vehiclesInStock.title')}</h2>
      {loading && <p>{t('vehiclesInStock.loading')}</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!loading && !error && vehicles.length === 0 && (
        <p className="no-vehicles-message">{t('vehiclesInStock.no_vehicles')}</p>
      )}

      <div className="vehicles-list">
        {vehicles.map((vehicle) => {
          const imageUrl = vehicle.imagen && vehicle.imagen.startsWith('http')
            ? vehicle.imagen
            : `/images/${vehicle.imagen || 'default-car.png'}`;

          return (
            <div key={vehicle.id} className="vehicle-list-item">
              <img src={imageUrl} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-list-item-image" onError={(e) => { e.target.onerror = null; e.target.src='/images/default-car.png' }} />
              <div className="vehicle-details">
                <h3>{vehicle.marca} {vehicle.modelo}</h3>
                <p><strong>{t('vehiclesInStock.year')}:</strong> {vehicle.anio}</p>
                <p><strong>{t('vehiclesInStock.plate')}:</strong> {vehicle.patente}</p>
                <p><strong>{t('vehiclesInStock.price_per_day')}:</strong> ${vehicle.precioPorDia}</p>
                <p><strong>{t('vehiclesInStock.available')}:</strong> {vehicle.disponible ? t('vehiclesInStock.yes') : t('vehiclesInStock.no')}</p>
              </div>
              <div className="vehicle-actions">
                <button className="btn-modify" onClick={() => handleModify(vehicle.id)}>{t('vehiclesInStock.modify_button')}</button>
                <button className="btn-delete" onClick={() => handleDelete(vehicle.id)}>{t('vehiclesInStock.delete_button')}</button>
              </div>
            </div>
          );
        })}
      </div>

      <ModifyVehicleModal
        isOpen={showModifyModal}
        onClose={handleCloseModal}
        vehicleId={selectedVehicleId}
        onVehicleModified={handleVehicleModified}
      />
    </div>
  );
};

export default VehiclesInStock;