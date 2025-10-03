// Importa los módulos necesarios
const express = require('express');
const multer = require('multer'); // Middleware para manejar la subida de archivos
const path = require('path'); // Utilidad para trabajar con rutas de archivos y directorios
const fs = require('fs'); // Módulo para interactuar con el sistema de archivos

// Crea una nueva instancia del enrutador de Express
const router = express.Router();

// Configuración del directorio de subida de imágenes
const uploadDir = path.join(__dirname, '../../front/Rent/public/images');
// Asegura que el directorio de subida exista, si no, lo crea recursivamente
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración del motor de almacenamiento de Multer
const storage = multer.diskStorage({
  // Define el destino de los archivos subidos
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Define el nombre del archivo subido
  filename: function (req, file, cb) {
    // Crea un nombre de archivo único para evitar sobrescrituras
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Inicializa Multer con la configuración de almacenamiento y filtros
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limita el tamaño del archivo a 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb); // Aplica un filtro para el tipo de archivo
  }
}).single('image'); // Espera un solo archivo con el nombre de campo 'image'

// Función para verificar el tipo de archivo
function checkFileType(file, cb) {
  // Expresión regular para los tipos de extensiones permitidas
  const filetypes = /jpeg|jpg|png|gif/;
  // Verifica la extensión del archivo
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Verifica el tipo MIME del archivo
  const mimetype = filetypes.test(file.mimetype);

  // Si la extensión y el tipo MIME son válidos, acepta el archivo
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // Si no, rechaza el archivo con un mensaje de error
    cb('Error: ¡Solo se permiten imágenes (jpeg, jpg, png, gif)!');
  }
}

// Ruta POST para la subida de imágenes
// Esta ruta maneja la subida de un archivo de imagen.
// Debería ser protegida por un middleware de autenticación en un entorno de producción.
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    // Si ocurre un error durante la subida (ej. tamaño o tipo de archivo no permitido)
    if (err) {
      return res.status(400).json({ msg: err });
    }
    // Si no se seleccionó ningún archivo
    if (req.file == undefined) {
      return res.status(400).json({ msg: 'Error: No se seleccionó ningún archivo.' });
    }
    // Si la subida es exitosa, responde con el nombre del archivo guardado
    res.status(200).json({
      msg: 'Archivo subido exitosamente',
      fileName: req.file.filename
    });
  });
});

// Exporta el enrutador para que pueda ser utilizado en 'app.js'
module.exports = router;
