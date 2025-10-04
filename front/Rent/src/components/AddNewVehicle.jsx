import React, { useState } from 'react';
import axios from 'axios'; // Para realizar peticiones HTTP
import '../styles/Form.css'; // Estilos generales para formularios
import '../styles/AddNewVehicle.css'; // Estilos específicos para este componente

// Componente para agregar un nuevo vehículo
const AddNewVehicle = ({ onVehicleAdded }) => {
  // Estado para los datos del formulario del vehículo
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    anio: '',
    patente: '',
    precioPorDia: '',
    imagen: '',
  });
  const [imageFile, setImageFile] = useState(null); // Estado para el archivo de imagen si se sube
  const [uploadType, setUploadType] = useState('url'); // Controla si se usa URL o subida de archivo para la imagen
  const [loading, setLoading] = useState(false); // Estado para indicar si una operación está en curso
  const [error, setError] = useState(null); // Estado para mensajes de error
  const [successMessage, setSuccessMessage] = useState(null); // Estado para mensajes de éxito

  // Maneja los cambios en los campos de texto del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Maneja la selección de un archivo de imagen
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Maneja el envío del formulario para agregar un vehículo
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    let finalImagen = formData.imagen;

    // Paso 1: Si se seleccionó un archivo, subirlo primero
    if (uploadType === 'upload' && imageFile) {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      try {
        const token = localStorage.getItem('token');
        // Envía el archivo al endpoint de subida de imágenes del backend
        const res = await axios.post('http://localhost:3000/api/upload', uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        finalImagen = res.data.fileName; // El backend devuelve el nombre del archivo guardado
      } catch (err) {
        setError('Error al subir la imagen. Verifique el tipo y tamaño del archivo.');
        setLoading(false);
        return;
      }
    }

    // Paso 2: Crear el vehículo con la URL de la imagen o el nuevo nombre de archivo
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const vehicleData = { ...formData, imagen: finalImagen };
      // Envía los datos del vehículo al endpoint de creación de vehículos del backend
      await axios.post('http://localhost:3000/vehiculos', vehicleData, config);
      
      setSuccessMessage('¡Vehículo agregado exitosamente!');
      // Reinicia el formulario
      setFormData({ marca: '', modelo: '', anio: '', patente: '', precioPorDia: '', imagen: '' });
      setImageFile(null);
      // Llama a la función de callback si se proporcionó
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
        {/* Muestra mensajes de error o éxito */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        {/* Campos del formulario para los datos del vehículo */}
        <div className="form-group">
          <label className="form-label" htmlFor="marca">Marca</label>
          <input className="form-input" type="text" id="marca" value={formData.marca} onChange={handleChange} required />
        </div>
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

        {/* Sección de subida de imagen */}
        <div className="form-group">
          <label className="form-label">Imagen del Vehículo</label>
          <div className="upload-tabs">
            {/* Botones para seleccionar tipo de subida (URL o archivo) */}
            <button type="button" className={`tab-button ${uploadType === 'url' ? 'active' : ''}`} onClick={() => setUploadType('url')}>Usar URL</button>
            <button type="button" className={`tab-button ${uploadType === 'upload' ? 'active' : ''}`} onClick={() => setUploadType('upload')}>Subir Archivo</button>
          </div>

          {/* Campo de entrada de imagen según el tipo de subida seleccionado */}
          {uploadType === 'url' ? (
            <input className="form-input" type="url" id="imagen" value={formData.imagen} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
          ) : (
            <input className="form-input" type="file" id="imageFile" onChange={handleFileChange} />
          )}
        </div>

        {/* Botón de envío del formulario */}
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Vehículo'}
        </button>
      </form>
    </div>
  );
};

export default AddNewVehicle;