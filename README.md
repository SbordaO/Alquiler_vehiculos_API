# 🚗 Sistema de Alquiler de Vehículos

Este proyecto es un sistema completo para el alquiler de vehículos, compuesto por una API REST (backend) y una aplicación web (frontend).

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

### 🛠️ Tecnologías Utilizadas en el Frontend

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos web modernos.
- **ESLint**: Para mantener la calidad y consistencia del código.

---

### 📝 Notas del Frontend

- Este template proporciona una configuración mínima para que React funcione en Vite con HMR (Hot Module Replacement) y algunas reglas de ESLint.
- El compilador de React no está habilitado en esta plantilla. Para añadirlo, consulta la [documentación de React](https://react.dev/learn/react-compiler/installation).
- Para expandir la configuración de ESLint, especialmente para aplicaciones de producción con TypeScript, se recomienda usar reglas de linting conscientes del tipo. Consulta la [plantilla TS de Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript y `typescript-eslint`.

---

## 👨‍💻 Desarrollador

Sebastian Borda Ojeda