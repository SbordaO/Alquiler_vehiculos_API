import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Form.css'; // Reutilizamos los estilos de formulario

const VehiclesInStock = ({ onVehicleAction }) => {
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
      setError('Error al cargar los vehículos.');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [onVehicleAction]); // Re-fetch vehicles if onVehicleAction changes (though it should be stable with useCallback)

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
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
      setSuccessMessage('Vehículo eliminado exitosamente!');
      fetchVehicles(); // Refresh the list
      if (onVehicleAction) {
        onVehicleAction(); // Notify parent component of action
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al eliminar el vehículo.');
      console.error('Error deleting vehicle:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Vehículos Existentes</h2>
      {loading && <p>Cargando vehículos...</p>}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="vehicles-list">
        {vehicles.length === 0 && !loading && !error && <p>No hay vehículos para mostrar.</p>}
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="vehicle-list-item">
            <img src={vehicle.imagen ? `/images/${vehicle.imagen}` : "https://via.placeholder.com/100x70"} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-list-item-image" />
            <div className="vehicle-list-item-info">
              <h3>{vehicle.marca} {vehicle.modelo} ({vehicle.anio})</h3>
              <p>Patente: {vehicle.patente} | Precio: ${vehicle.precioPorDia}/día</p>
            </div>
            <button 
              className="delete-button"
              onClick={() => handleDeleteVehicle(vehicle.id)}
              disabled={loading}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesInStock;