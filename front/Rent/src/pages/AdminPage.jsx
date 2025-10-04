import React, { useState, useCallback } from 'react';
import '../styles/AdminPage.css'; // Estilos específicos para la página de admin
import VehiclesInStock from '../components/VehiclesInStock';
import ReservedVehicles from '../components/ReservedVehicles';
import AddNewVehicle from '../components/AddNewVehicle';
import RegisteredUsers from '../components/RegisteredUsers';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('vehiclesInStock'); // Default active tab

  // This function will be passed to AddNewVehicle to trigger a refresh in VehiclesInStock
  const handleVehicleListRefresh = useCallback(() => {
    // When a vehicle is added, we want to ensure VehiclesInStock re-fetches its data.
    // A simple way to do this is to temporarily switch to another tab and back,
    // or re-mount the VehiclesInStock component. For now, we'll rely on VehiclesInStock's
    // internal useEffect to re-fetch when it becomes active, or if we pass a specific prop.
    // For a more robust solution, consider a shared state or context for vehicles.
    console.log("Vehicle list refresh requested.");
    // In a more complex app, you might trigger a global state update here
    // that VehiclesInStock listens to.
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vehiclesInStock':
        return <VehiclesInStock onVehicleAdded={handleVehicleListRefresh} />;
      case 'reservedVehicles':
        return <ReservedVehicles />;
      case 'addNewVehicle':
        return <AddNewVehicle onVehicleAdded={handleVehicleListRefresh} />;
      case 'registeredUsers':
        return <RegisteredUsers />;
      default:
        return <VehiclesInStock onVehicleAdded={handleVehicleListRefresh} />;
    }
  };

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Panel de Administración</h1>

      <div className="admin-tabs">
        <button 
          className={`admin-tab-button ${activeTab === 'vehiclesInStock' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehiclesInStock')}
        >
          Vehículos en Stock
        </button>
        <button 
          className={`admin-tab-button ${activeTab === 'reservedVehicles' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservedVehicles')}
        >
          Vehículos Reservados
        </button>
        <button 
          className={`admin-tab-button ${activeTab === 'addNewVehicle' ? 'active' : ''}`}
          onClick={() => setActiveTab('addNewVehicle')}
        >
          Agregar Nuevo Vehículo
        </button>
        <button 
          className={`admin-tab-button ${activeTab === 'registeredUsers' ? 'active' : ''}`}
          onClick={() => setActiveTab('registeredUsers')}
        >
          Usuarios Registrados
        </button>
      </div>

      <div className="admin-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPage;
