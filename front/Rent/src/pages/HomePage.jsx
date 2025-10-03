
import React from 'react';
import VehiclesGrid from '../components/VehiclesGrid';
import Hero from '../components/Hero';
import Features from '../components/Features';
import VehicleCarousel from '../components/VehicleCarousel'; // Import VehicleCarousel

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <VehicleCarousel /> {/* Add VehicleCarousel component */}
      <VehiclesGrid />
    </div>
  );
};

export default HomePage;
