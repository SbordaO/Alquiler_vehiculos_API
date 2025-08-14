require('dotenv').config();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

(async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS reservations');
    await pool.query('DROP TABLE IF EXISTS vehicles');
    await pool.query('DROP TABLE IF EXISTS users');

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

    await pool.query(`
      CREATE TABLE vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        marca VARCHAR(100),
        modelo VARCHAR(100),
        anio INT,
        patente VARCHAR(20) UNIQUE,
        precioPorDia DECIMAL(10,2),
        disponible BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

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

    const passAdmin = await bcrypt.hash('admin123', 10);
    const passUser = await bcrypt.hash('sebas123', 10);

    await pool.query('INSERT INTO users (nombre, email, password, rol) VALUES (?,?,?,?)', ['Admin', 'admin@ejemplo.com', passAdmin, 'admin']);
    await pool.query('INSERT INTO users (nombre, email, password, rol) VALUES (?,?,?,?)', ['Sebas', 'sebas@ejemplo.com', passUser, 'cliente']);

    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia) VALUES (?,?,?,?,?)', ['Toyota', 'Etios', 2018, 'ABC123', 30.00]);
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia) VALUES (?,?,?,?,?)', ['VW', 'Gol', 2017, 'DEF456', 25.00]);
    await pool.query('INSERT INTO vehicles (marca, modelo, anio, patente, precioPorDia) VALUES (?,?,?,?,?)', ['Ford', 'Ka', 2019, 'GHI789', 28.50]);

    console.log('Seed completado ✅');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
