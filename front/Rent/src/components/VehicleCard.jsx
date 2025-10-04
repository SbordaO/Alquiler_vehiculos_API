
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
  // If vehicle.imagen is a full URL, use it directly.
  // Otherwise, construct the path to the local public/images folder.
  const imageUrl = vehicle.imagen && vehicle.imagen.startsWith('http')
    ? vehicle.imagen
    : `/images/${vehicle.imagen || 'default-car.png'}`;

  return (
    <div className="vehicle-card">
      <img src={imageUrl} alt={`${vehicle.marca} ${vehicle.modelo}`} className="vehicle-card-image" onError={(e) => { e.target.onerror = null; e.target.src='/images/default-car.png' }} />
      <div className="vehicle-card-body">
        <h3 className="vehicle-card-title">{vehicle.marca} {vehicle.modelo}</h3>
        <p className="vehicle-card-year">{vehicle.anio}</p>
        <div className="vehicle-card-price-container">
          <p className="vehicle-card-price">${vehicle.precioPorDia}</p>
          <span className="vehicle-card-price-label">/ día</span>
        </div>
        <Link to={`/reservar/${vehicle.id}`} className="vehicle-card-button">Reservar Ahora</Link>
      </div>
    </div>
  );
};

export default VehicleCard;
