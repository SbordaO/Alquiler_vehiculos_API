// Importación del módulo mysql2 para trabajar con MySQL, usando promesas para operaciones asíncronas
const mysql = require('mysql2/promise');
// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Creación de un "pool" de conexiones a la base de datos
// Un pool es más eficiente que crear una conexión nueva para cada consulta
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Dirección del servidor de la base de datos
  user: process.env.DB_USER, // Nombre de usuario para la conexión a la DB
  password: process.env.DB_PASS, // Contraseña del usuario de la DB
  database: process.env.DB_NAME, // Nombre de la base de datos a la que se conectará
  port: process.env.DB_PORT || 3306, // Puerto del servidor de DB, 3306 por defecto para MySQL
  waitForConnections: true, // Si todas las conexiones están en uso, espera en lugar de fallar
  connectionLimit: 10 // Número máximo de conexiones en el pool
});

// Exporta el pool de conexiones para que pueda ser utilizado en otras partes de la aplicación
module.exports = pool;
