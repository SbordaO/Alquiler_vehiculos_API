
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleCard from './VehicleCard';
import './VehiclesGrid.css';

const VehiclesGrid = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const fetchVehicles = async (url = 'http://localhost:3000/vehiculos') => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setVehicles(response.data.vehicles);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los vehículos. Inténtalo de nuevo más tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSearch = () => {
    if (desde && hasta) {
      fetchVehicles(`http://localhost:3000/vehiculos?desde=${desde}&hasta=${hasta}`);
    } else {
      // Optional: show an error message if dates are not selected
    }
  };

  const handleClear = () => {
    setDesde('');
    setHasta('');
    fetchVehicles();
  };

  return (
    <div id="flota-section"> {/* ID for scrolling */}
      <div className="search-container">
        <input 
          type="date" 
          value={desde} 
          onChange={e => setDesde(e.target.value)} 
        />
        <input 
          type="date" 
          value={hasta} 
          onChange={e => setHasta(e.target.value)} 
        />
        <button onClick={handleSearch} className="search-button">Buscar Vehículo</button>
        <button onClick={handleClear} className="clear-button">Limpiar Filtros</button>
      </div>

      {loading && <p className="loading-message">Cargando vehículos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && vehicles.length === 0 && <p>No hay vehículos disponibles para el rango de fechas seleccionado.</p>}

      <div className="vehicles-grid">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehiclesGrid;
