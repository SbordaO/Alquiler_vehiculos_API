import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import '../styles/Form.css'; // General form styles
import '../styles/ModifyVehicleModal.css'; // Specific styles for the modal

const ModifyVehicleModal = ({ isOpen, onClose, vehicleId, onVehicleModified }) => {
  const { t } = useTranslation();
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

  useEffect(() => {
    if (isOpen && vehicleId) {
      console.log('modify modal opened for vehicle ID:', vehicleId);
      setLoading(true);
      setError(null);
      const fetchVehicleData = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`http://localhost:3000/vehiculos/${vehicleId}`, config);
          const vehicleData = response.data.vehicle;
          setFormData({
            marca: vehicleData.marca || '',
            modelo: vehicleData.modelo || '',
            anio: vehicleData.anio || '',
            patente: vehicleData.patente || '',
            precioPorDia: vehicleData.precioPorDia || '',
            imagen: vehicleData.imagen || '',
          });
          // Determine upload type based on existing image
          if (vehicleData.imagen && vehicleData.imagen.startsWith('http')) {
            setUploadType('url');
          } else if (vehicleData.imagen) {
            // If it's a filename, assume it was uploaded previously
            setUploadType('url'); // Treat as URL for display, user can change to upload new
          } else {
            setUploadType('url'); // Default to URL if no image
          }
        } catch (err) {
          setError(t('modifyVehicleModal.load_error'));
          toast.error(t('modifyVehicleModal.load_error'));
          console.error('Error fetching vehicle data:', err);
          onClose(); // Close modal on error
        } finally {
          setLoading(false);
        }
      };
      fetchVehicleData();
    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        marca: '',
        modelo: '',
        anio: '',
        patente: '',
        precioPorDia: '',
        imagen: '',
      });
      setImageFile(null);
      setUploadType('url');
      setError(null);
    }
  }, [isOpen, vehicleId, onClose, t]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleModifyVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let finalImagen = formData.imagen;

    // Step 1: If a new file is selected, upload it first
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
        finalImagen = res.data.fileName;
      } catch (err) {
        setError(t('modifyVehicleModal.upload_error'));
        toast.error(t('modifyVehicleModal.upload_error'));
        setLoading(false);
        return;
      }
    }

    // Step 2: Update the vehicle with the new data
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const vehicleData = { ...formData, imagen: finalImagen };
      await axios.put(`http://localhost:3000/vehiculos/${vehicleId}`, vehicleData, config);
      
      toast.success(t('modifyVehicleModal.modify_success'));
      if (onVehicleModified) {
        onVehicleModified();
      }
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.response?.data?.msg || t('modifyVehicleModal.modify_error'));
      toast.error(err.response?.data?.msg || t('modifyVehicleModal.modify_error'));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{t('modifyVehicleModal.title')}</h2>
        <form onSubmit={handleModifyVehicle} className="admin-form-card">
          {error && <p className="error-message">{error}</p>}
          
          <div className="form-group">
            <label className="form-label" htmlFor="marca">{t('modifyVehicleModal.brand_label')}</label>
            <input className="form-input" type="text" id="marca" value={formData.marca} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="modelo">{t('modifyVehicleModal.model_label')}</label>
            <input className="form-input" type="text" id="modelo" value={formData.modelo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="anio">{t('modifyVehicleModal.year_label')}</label>
            <input className="form-input" type="number" id="anio" value={formData.anio} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="patente">{t('modifyVehicleModal.plate_label')}</label>
            <input className="form-input" type="text" id="patente" value={formData.patente} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="precioPorDia">{t('modifyVehicleModal.price_per_day_label')}</label>
            <input className="form-input" type="number" id="precioPorDia" value={formData.precioPorDia} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">{t('modifyVehicleModal.image_label')}</label>
            <div className="upload-tabs">
              <button type="button" className={`tab-button ${uploadType === 'url' ? 'active' : ''}`} onClick={() => setUploadType('url')}>{t('modifyVehicleModal.use_url_button')}</button>
              <button type="button" className={`tab-button ${uploadType === 'upload' ? 'active' : ''}`} onClick={() => setUploadType('upload')}>{t('modifyVehicleModal.upload_file_button')}</button>
            </div>

            {uploadType === 'url' ? (
              <input className="form-input" type="url" id="imagen" value={formData.imagen} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" />
            ) : (
              <input className="form-input" type="file" id="imageFile" onChange={handleFileChange} />
            )}
            {formData.imagen && uploadType === 'url' && (
              <div className="current-image-preview">
                <p>{t('modifyVehicleModal.current_image')}</p>
                <img src={formData.imagen.startsWith('http') ? formData.imagen : `/images/${formData.imagen}`} alt="Current Vehicle" />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button className="form-button" type="submit" disabled={loading}>
              {loading ? t('modifyVehicleModal.loading_button') : t('modifyVehicleModal.save_button')}
            </button>
            <button type="button" className="form-button form-button-secondary" onClick={onClose} disabled={loading}>
              {t('modifyVehicleModal.cancel_button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyVehicleModal;