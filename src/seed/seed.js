// Carga las variables de entorno desde el archivo .env
require('dotenv').config();
// Importa el pool de conexiones a la base de datos
const pool = require('../config/db');
// Importa la librería bcrypt para encriptar contraseñas
const bcrypt = require('bcrypt');

// Función autoejecutable para inicializar la base de datos con datos de prueba
(async () => {
  try {
    // Elimina las tablas existentes si ya existen (en orden inverso de dependencia para evitar errores de FK)
    await pool.query('DROP TABLE IF EXISTS reservations');
    await pool.query('DROP TABLE IF EXISTS vehicles');
    await pool.query('DROP TABLE IF EXISTS users');

    // Crea la tabla de usuarios
    await pool.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100),
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol ENUM('cliente','admin') DEFAULT 'cliente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crea la tabla de vehículos
    await pool.query(`
      CREATE TABLE vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        marca VARCHAR(100),
        modelo VARCHAR(100),
        anio INT,
        patente VARCHAR(20) UNIQUE,
        precioPorDia DECIMAL(10,2),
        disponible BOOLEAN DEFAULT TRUE,
        imagen VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crea la tabla de reservas, con claves foráneas a usuarios y vehículos
    await pool.query(`
      CREATE TABLE reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        vehicleId INT NOT NULL,
        desde DATE NOT NULL,
        hasta DATE NOT NULL,
        total DECIMAL(10,2),
        estado ENUM('activa','cancelada','finalizada') DEFAULT 'activa',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (vehicleId) REFERENCES vehicles(id)
      )
    `);

    // Encripta las contraseñas para los usuarios de prueba
    const passAdmin = await bcrypt.hash('admin123', 10);
    const passUser = await bcrypt.hash('sebas123', 10);

    // Inserta usuarios de prueba (un administrador y un cliente)
    await pool.query('INSERT INTO users (nombre, email, password, rol) VALUES (?,?,?,?)', ['Admin', 'admin@ejemplo.com', passAdmin, 'admin']);
    await pool.query('INSERT INTO users (nombre, email, password, rol) VALUES (?,?,?,?)', ['Sebas', 'sebas@ejemplo.com', passUser, 'cliente']);

    // Inserta vehículos de prueba
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?,?,?,?,?,?)', ['Toyota', 'Etios', 2018, 'ABC123', 30.00, 'toyota-etios.jpg']);
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?,?,?,?,?,?)', ['Toyota', 'Hilux', 2020, 'DEF456', 50.00, 'toyota-hilux.jpeg']);
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?,?,?,?,?,?)', ['Chevrolet', 'Cruze', 2019, 'GHI789', 40.00, 'image-1759342822871-475272408.png']);
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?,?,?,?,?,?)', ['Ford', 'Mustang', 2021, 'JKL012', 70.00, 'image-1759343160698-842650352.jpg']);
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia, imagen) VALUES (?,?,?,?,?,?)', ['Nissan', 'Versa', 2019, 'MNO345', 35.00, 'image-1759343355540-562920003.png']);

    console.log('Seed completado ✅'); // Mensaje de éxito
    process.exit(0); // Termina el proceso con éxito
  } catch (err) {
    console.error(err); // Muestra cualquier error que ocurra
    process.exit(1); // Termina el proceso con un código de error
  }
})();