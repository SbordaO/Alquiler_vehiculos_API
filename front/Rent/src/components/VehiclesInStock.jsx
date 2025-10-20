import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import '../styles/Form.css'; // Reutilizamos los estilos de formulario

const VehiclesInStock = ({ onVehicleAction }) => {
=======
import { useTranslation } from 'react-i18next';
import '../styles/Form.css'; // Reutilizamos los estilos de formulario

const VehiclesInStock = ({ onVehicleAction }) => {
  const { t } = useTranslation();
>>>>>>> aec402f (opciones de lenguaje)
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
<<<<<<< HEAD
      setError('Error al cargar los vehículos.');
=======
      setError(t('vehiclesInStock.load_error'));
>>>>>>> aec402f (opciones de lenguaje)
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [onVehicleAction]); // Re-fetch vehicles if onVehicleAction changes (though it should be stable with useCallback)

  const handleDeleteVehicle = async (id) => {
<<<<<<< HEAD
    if (!window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
=======
    if (!window.confirm(t('vehiclesInStock.delete_confirm'))) {
>>>>>>> aec402f (opciones de lenguaje)
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
<<<<<<< HEAD
      setSuccessMessage('Vehículo eliminado exitosamente!');
=======
      setSuccessMessage(t('vehiclesInStock.delete_success'));
>>>>>>> aec402f (opciones de lenguaje)
      fetchVehicles(); // Refresh the list
      if (onVehicleAction) {
        onVehicleAction(); // Notify parent component of action
      }
    } catch (err) {
<<<<<<< HEAD
      setError(err.response?.data?.msg || 'Error al eliminar el vehículo.');
=======
      setError(err.response?.data?.msg || t('vehiclesInStock.delete_error'));
>>>>>>> aec402f (opciones de lenguaje)
      console.error('Error deleting vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
<<<<<<< HEAD
      <h2 className="admin-section-title">Vehículos Existentes</h2>
      {loading && <p>Cargando vehículos...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="vehicles-list">
        {vehicles.length === 0 && !loading && !error && <p>No hay vehículos para mostrar.</p>}
=======
      <h2 className="admin-section-title">{t('vehiclesInStock.title')}</h2>
      {loading && <p>{t('vehiclesInStock.loading')}</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="vehicles-list">
        {vehicles.length === 0 && !loading && !error && <p>{t('vehiclesInStock.no_vehicles')}</p>}
>>>>>>> aec402f (opciones de lenguaje)
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-list-item">
            <img src={vehicle.imagen ? `/images/${vehicle.imagen}` : "https://via.placeholder.com/100x70"} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-list-item-image" />
            <div className="vehicle-list-item-info">
              <h3>{vehicle.marca} {vehicle.modelo} ({vehicle.anio})</h3>
<<<<<<< HEAD
              <p>Patente: {vehicle.patente} | Precio: ${vehicle.precioPorDia}/día</p>
=======
              <p>{t('vehiclesInStock.plate')}: {vehicle.patente} | {t('vehiclesInStock.price')}: ${vehicle.precioPorDia}/día</p>
>>>>>>> aec402f (opciones de lenguaje)
            </div>
            <button 
              className="delete-button"
              onClick={() => handleDeleteVehicle(vehicle.id)}
              disabled={loading}
            >
<<<<<<< HEAD
              Eliminar
=======
              {t('vehiclesInStock.delete_button')}
>>>>>>> aec402f (opciones de lenguaje)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesInStock;