# 🚗 Sistema de Alquiler de Vehículos (Node.js + Express + MySQL2)

API REST para gestionar usuarios, vehículos y reservas, con autenticación JWT y roles (`admin` y `cliente`).

---

## 📦 Requisitos previos
- Node.js 16 o superior (recomendado: 18+)
- MySQL (local o remoto)
- Postman o Insomnia para probar la API

---

## ⚙️ Instalación

1. **Clonar o descargar** este proyecto.
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Crear la base de datos en MySQL**:
   ```sql
   ejecuta el archivo "alquiler_vehiculos.sql" en MySQL para crear la base de datos y las tablas.
   ```
4. **Configurar el archivo `.env`** (copiar `.env.example` y editar):
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

## 🗄️ Cargar datos iniciales

Ejecutar el script `seed` para crear las tablas y cargar datos de prueba:

```bash
npm run seed
```

Esto creará:
- Usuario Admin → **`admin@ejemplo.com` / `admin123`**
- Usuario Cliente → **`sebas@ejemplo.com` / `sebas123`**
- 3 vehículos de ejemplo

---

## 🚀 Levantar el servidor

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

## 🔑 Autenticación

- Usar `POST /auth/login` para obtener un **token JWT**.
- En los endpoints protegidos, enviar el token en el header:
  ```
  Authorization: Bearer TU_TOKEN
  ```

---

## 📚 Endpoints

### **Auth**
| Método | Endpoint         | Descripción |
|--------|------------------|-------------|
| POST   | `/auth/register` | Registrar nuevo usuario |
| POST   | `/auth/login`    | Iniciar sesión (devuelve token) |
| GET    | `/auth/me`       | Obtener perfil (requiere token) |

---

### **Usuarios** *(solo admin)*
| Método | Endpoint    | Descripción |
|--------|-------------|-------------|
| GET    | `/usuarios` | Lista todos los usuarios |

---

### **Vehículos**
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | `/vehiculos` | Lista todos los vehículos |
| GET    | `/vehiculos/:id` | Ver un vehículo específico |
| GET    | `/vehiculos/disponibles?desde=YYYY-MM-DD&hasta=YYYY-MM-DD` | Ver vehículos disponibles en un rango |
| POST   | `/vehiculos` *(admin)* | Crear un vehículo |
| PUT    | `/vehiculos/:id` *(admin)* | Actualizar un vehículo |

---

### **Reservas**
| Método | Endpoint     | Descripción |
|--------|--------------|-------------|
| POST   | `/reservas`  | Crear una reserva (usuario autenticado) |
| GET    | `/reservas`  | Listar reservas (admin: todas, cliente: solo las propias) |
| DELETE | `/reservas/:id` | Cancelar una reserva (propietario o admin) |

---

## 🧪 Ejemplo rápido con **Postman**

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

## 📝 Notas
- Siempre usar formato **YYYY-MM-DD** para fechas.
- Los precios están en `precioPorDia` (decimal).
- El cálculo del total de una reserva = días × precio por día.
- La disponibilidad excluye vehículos con reservas **activas** que se solapan en el rango solicitado.

## El desarrollador es Sebastian Borda Ojeda
