# 🚗 Sistema de Alquiler de Vehículos

Este proyecto es un sistema completo para el alquiler de vehículos, compuesto por una API REST (backend) y una aplicación web (frontend).

## 🛠️ Tecnologías y Herramientas

Una lista detallada de las tecnologías, lenguajes y bibliotecas utilizadas en el desarrollo de este sistema:

### 🌐 Lenguajes
- **JavaScript**: Principal lenguaje de programación para el frontend y el backend.
- **SQL**: Utilizado para la gestión y consulta de la base de datos MySQL.

### 🚀 Frontend
- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **Vite**: Herramienta de construcción rápida para proyectos web modernos, utilizada para el desarrollo del frontend.
- **React Router**: Para la navegación declarativa dentro de la aplicación de una sola página (SPA).
- **Axios**: Cliente HTTP basado en promesas para realizar peticiones a la API REST.
- **React Toastify**: Biblioteca para mostrar notificaciones de forma sencilla y personalizable.
- **i18next** y **React i18next**: Para la internacionalización y gestión de múltiples idiomas en la interfaz de usuario.
- **Font Awesome**: Biblioteca de iconos escalables para mejorar la estética visual.
- **ESLint**: Herramienta de linting para mantener la calidad y consistencia del código JavaScript/React.

### ⚙️ Backend
- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js**: Framework web rápido y minimalista para Node.js, utilizado para construir la API REST.
- **MySQL2**: Cliente MySQL para Node.js, utilizado para interactuar con la base de datos.
- **JWT (JSON Web Tokens)**: Para la autenticación segura de usuarios y la autorización basada en roles.
- **Nodemon**: Utilidad que monitorea cambios en el código fuente y reinicia automáticamente el servidor durante el desarrollo.

### 🗄️ Base de Datos
- **MySQL**: Sistema de gestión de bases de datos relacionales para almacenar la información del sistema.

---

## 🚀 Backend (API REST con Node.js, Express y MySQL2)

API REST para gestionar usuarios, vehículos y reservas, con autenticación JWT y roles (`admin` y `cliente`).

---

### 📦 Requisitos previos
- Node.js 16 o superior (recomendado: 18+)
- MySQL (local o remoto)
- Postman o Insomnia para probar la API

---

### ⚙️ Instalación

1. **Clonar o descargar** este proyecto.
2. **Instalar dependencias** (en la raíz del proyecto):
   ```bash
   npm install
   ```
3. **Crear la base de datos en MySQL**:
   ```sql
   ejecuta el archivo "alquiler_vehiculos.sql" en MySQL para crear la base de datos y las tablas.
   ```
4. **Configurar el archivo `.env`** (copiar `.env.example` y editar en la raíz del proyecto):
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=rental_db
   DB_USER=root
   DB_PASS=tu_password
   JWT_SECRET=un_secreto
   ```

---

### 🗄️ Cargar datos iniciales

Ejecutar el script `seed` para crear las tablas y cargar datos de prueba:

```bash
npm run seed
```

Esto creará:
- Usuario Admin → **`admin@ejemplo.com` / `admin123`**
- Usuario Cliente → **`sebas@ejemplo.com` / `sebas123`**
- 3 vehículos de ejemplo

---

### 🚀 Levantar el servidor

En modo desarrollo (con `nodemon`):

```bash
npm run dev
```

En modo normal:

```bash
npm start
```

Si todo está bien, deberías ver:
```
✅ Conectado a la base de datos MySQL
🚀 Servidor corriendo en http://localhost:3000
```

---

### 🔑 Autenticación

- Usar `POST /auth/login` para obtener un **token JWT**.
- En los endpoints protegidos, enviar el token en el header:
  ```
  Authorization: Bearer TU_TOKEN
  ```

---

### 📚 Endpoints

#### **Auth**
| Método | Endpoint         | Descripción |
|--------|------------------|-------------|
| POST   | `/auth/register` | Registrar nuevo usuario |
| POST   | `/auth/login`    | Iniciar sesión (devuelve token) |
| GET    | `/auth/me`       | Obtener perfil (requiere token) |

---

#### **Usuarios** *(solo admin)*
| Método | Endpoint    | Descripción |
|--------|-------------|-------------|
| GET    | `/usuarios` | Lista todos los usuarios |

---

#### **Vehículos**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/vehiculos` | Lista todos los vehículos |
| GET    | `/vehiculos/:id` | Ver un vehículo específico |
| GET    | `/vehiculos/disponibles?desde=YYYY-MM-DD&hasta=YYYY-MM-DD` | Ver vehículos disponibles en un rango |
| POST   | `/vehiculos` *(admin)* | Crear un vehículo |
| PUT    | `/vehiculos/:id` *(admin)* | Actualizar un vehículo |

---

#### **Reservas**
| Método | Endpoint     | Descripción |
|--------|--------------|-------------|
| POST   | `/reservas`  | Crear una reserva (usuario autenticado) |
| GET    | `/reservas`  | Listar reservas (admin: todas, cliente: solo las propias) |
| DELETE | `/reservas/:id` | Cancelar una reserva (propietario o admin) |

---

### 🧪 Ejemplo rápido con **Postman**

1. **Login**
   - Método: `POST`
   - URL: `http://localhost:3000/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "admin@ejemplo.com",
       "password": "admin123"
     }
     ```
   - Respuesta: contiene `"token"`

2. **Usar token**
   - En Postman, ir a `Authorization` → tipo `Bearer Token`
   - Pegar el token
   - Probar un endpoint protegido como:
     ```
     GET http://localhost:3000/usuarios
     ```

---

### 📝 Notas del Backend

- Siempre usar formato **YYYY-MM-DD** para fechas.
- Los precios están en `precioPorDia` (decimal).
- El cálculo del total de una reserva = días × precio por día.
- La disponibilidad excluye vehículos con reservas **activas** que se solapan en el rango solicitado.

## 🌐 Frontend (Aplicación React con Vite)

Esta sección describe la configuración y el uso de la aplicación frontend desarrollada con React y Vite.

---

### ⚙️ Instalación y Ejecución del Frontend

1. **Navegar al directorio del frontend**:
   ```bash
   cd front/Rent
   ```
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Levantar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Esto iniciará la aplicación en modo desarrollo, generalmente en `http://localhost:5173`.

---

### 📝 Notas del Frontend

- Este template proporciona una configuración mínima para que React funcione en Vite con HMR (Hot Module Replacement) y algunas reglas de ESLint.
- El compilador de React no está habilitado en esta plantilla. Para añadirlo, consulta la [documentación de React](https://react.dev/learn/react-compiler/installation).
- Para expandir la configuración de ESLint, especialmente para aplicaciones de producción con TypeScript, se recomienda usar reglas de linting conscientes del tipo. Consulta la [plantilla TS de Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript y `typescript-eslint`.

---

## 👨‍💻 Desarrollador

Sebastian Borda Ojeda