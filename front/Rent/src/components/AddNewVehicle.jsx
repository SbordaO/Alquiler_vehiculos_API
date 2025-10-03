import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import './AddNewVehicle.css'; // Add specific styles for this component

const AddNewVehicle = ({ onVehicleAdded }) => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    anio: '',
    patente: '',
    precioPorDia: '',
    imagen: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadType, setUploadType] = useState('url'); // 'url' or 'upload'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let finalImagen = formData.imagen;

    // Step 1: If a file is selected, upload it first
    if (uploadType === 'upload' && imageFile) {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/api/upload', uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        finalImagen = res.data.fileName; // The backend returns the saved filename
      } catch (err) {
        setError('Error al subir la imagen. Verifique el tipo y tamaño del archivo.');
        setLoading(false);
        return;
      }
    }

    // Step 2: Create the vehicle with the image URL or the new filename
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const vehicleData = { ...formData, imagen: finalImagen };
      await axios.post('http://localhost:3000/vehiculos', vehicleData, config);
      
      setSuccessMessage('¡Vehículo agregado exitosamente!');
      // Reset form
      setFormData({ marca: '', modelo: '', anio: '', patente: '', precioPorDia: '', imagen: '' });
      setImageFile(null);
      if (onVehicleAdded) {
        onVehicleAdded();
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al agregar el vehículo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h2 className="admin-section-title">Agregar Nuevo Vehículo</h2>
      <form onSubmit={handleAddVehicle} className="admin-form-card">
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        {/* Form fields for vehicle data */}
        <div className="form-group">
          <label className="form-label" htmlFor="marca">Marca</label>
          <input className="form-input" type="text" id="marca" value={formData.marca} onChange={handleChange} required />
        </div>
        {/* ... other fields ... */}
        <div className="form-group">
          <label className="form-label" htmlFor="modelo">Modelo</label>
          <input className="form-input" type="text" id="modelo" value={formData.modelo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="anio">Año</label>
          <input className="form-input" type="number" id="anio" value={formData.anio} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="patente">Patente</label>
          <input className="form-input" type="text" id="patente" value={formData.patente} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="precioPorDia">Precio por Día</label>
          <input className="form-input" type="number" id="precioPorDia" value={formData.precioPorDia} onChange={handleChange} required />
        </div>

        {/* Image Upload Section */}
        <div className="form-group">
          <label className="form-label">Imagen del Vehículo</label>
          <div className="upload-tabs">
            <button type="button" className={`tab-button ${uploadType === 'url' ? 'active' : ''}`} onClick={() => setUploadType('url')}>Usar URL</button>
            <button type="button" className={`tab-button ${uploadType === 'upload' ? 'active' : ''}`} onClick={() => setUploadType('upload')}>Subir Archivo</button>
          </div>

          {uploadType === 'url' ? (
            <input className="form-input" type="url" id="imagen" value={formData.imagen} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
          ) : (
            <input className="form-input" type="file" id="imageFile" onChange={handleFileChange} />
          )}
        </div>

        <button className="form-button" type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Vehículo'}
        </button>
      </form>
    </div>
  );
};

export default AddNewVehicle;