import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/VehicleCarousel.css';

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const VehicleCarousel = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vehiculos');
        let fetchedVehicles = response.data.vehicles;

        if (fetchedVehicles.length > 0) {
          // Shuffle vehicles and take a subset (e.g., 10-15 for the carousel)
          const shuffledSubset = shuffleArray([...fetchedVehicles]).slice(0, Math.min(fetchedVehicles.length, 15));
          // Duplicate the subset to create a continuous loop effect
          setVehicles([...shuffledSubset, ...shuffledSubset]); 
        } else {
          setVehicles([]);
        }
      } catch (err) {
        setError(t('vehicleCarousel.load_error'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);


  useEffect(() => {
    if (!loading && vehicles.length > 0) {
      startScrolling();
    }
    return () => stopScrolling();
  }, [loading, vehicles]);

  const startScrolling = () => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const scrollAmount = 1; // Pixels per interval
      const scrollSpeed = 20; // Milliseconds per interval

      stopScrolling(); // Clear any existing interval before starting a new one

      scrollIntervalRef.current = setInterval(() => {
        // Check if we've scrolled past the first set of duplicated items
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          // Reset scroll to the beginning of the second set to create a seamless loop
          carousel.scrollLeft = 0; 
        } else {
          carousel.scrollLeft += scrollAmount;
        }
      }, scrollSpeed);
    }
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  if (loading) return <p className="carousel-message">{t('vehicleCarousel.loading')}</p>;
  if (error) return <p className="carousel-message error">{error}</p>;
  if (vehicles.length === 0) return <p className="carousel-message">{t('vehicleCarousel.no_vehicles')}</p>;

  return (
    <section className="vehicle-carousel-section">
      <h2 className="carousel-section-title">{t('vehicleCarousel.title')}</h2>
      <div 
        className="vehicle-carousel-container"
        ref={carouselRef}
        onMouseEnter={stopScrolling}
        onMouseLeave={startScrolling}
      >
        {vehicles.map((vehicle, index) => {
          const imageUrl = vehicle.imagen && vehicle.imagen.startsWith('http')
            ? vehicle.imagen
            : `/images/${vehicle.imagen || 'default-car.png'}`;

          return (
            <Link to={`/reservar/${vehicle.id}`} key={`${vehicle.id}-${index}`} className="carousel-item-link">
              <div className="carousel-item">
                <img src={imageUrl} alt={`${vehicle.marca} ${vehicle.modelo}`} className="carousel-item-image" onError={(e) => { e.target.onerror = null; e.target.src='/images/default-car.png' }} />
                <div className="carousel-item-info">
                  <h3>{vehicle.marca} {vehicle.modelo}</h3>
                  <p>{t('vehicleCarousel.price_per_day', { price: vehicle.precioPorDia })}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default VehicleCarousel;
