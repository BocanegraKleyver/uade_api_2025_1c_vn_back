# 🧾 Backend - Sabores Urbanos API

Este backend fue desarrollado como parte del proyecto académico para la materia Aplicaciones Interactivas 2025 1C Viernes noche - UADE. Corresponde al sistema de gestión de platos, usuarios, reseñas y logs de la carta digital del restaurante Sabores Urbanos.

## 🧰 Tecnologías Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- Multer (para subida de imágenes)
- JWT (para autenticación)
- Dotenv
- Cors

## 📁 Estructura del Proyecto

```
root/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── uploads/             # Imágenes subidas de platos
├── .env.example         # Variables de entorno
├── index.js             # Punto de entrada
└── README.md
```

## 🚀 Endpoints Principales

### 🔐 Autenticación

- `POST /api/auth/login` → Login de usuario
- `GET /api/auth/perfil` → Perfil autenticado

### 👤 Usuarios

- `GET /api/usuarios` → Listado
- `POST /api/usuarios` → Crear
- `PUT /api/usuarios/:id` → Editar
- `DELETE /api/usuarios/:id` → Eliminar

### 🍽️ Platos

- `GET /api/platos` → Listado
- `POST /api/platos` → Crear (con imagen)
- `PUT /api/platos/:id` → Editar
- `DELETE /api/platos/:id/fisico` → Eliminar físico
- `PATCH /api/platos/:id/activar` → Activar/desactivar

### 📝 Reseñas

- `GET /api/resenas` → Todas
- `GET /api/resenas/plato/:platoId` → Por plato
- `POST /api/resenas` → Crear (público)
- `PUT /api/resenas/:id/responder` → Responder
- `PUT /api/resenas/:id/ocultar` → Ocultar
- `PUT /api/resenas/:id/mostrar` → Mostrar

### 📜 Logs

- `GET /api/logs` → Ver logs con filtros
- `POST` automático en cada acción de usuario

## 🔐 Roles y Permisos

- `root`: acceso total, no editable.
- `admin`: acceso restringido según permisos asignados.
- `usuario`: sin acceso al panel admin.

Permisos gestionables: `gestionarUsuarios`, `gestionarPlatos`, `gestionarResenas`, `gestionarLogs`

## 📦 Precarga de Datos (para testing académico)

- Usuarios: 1 root
- Platos: 31 platos con imágenes
- Reseñas: Varios ejemplos preasignados 100 en total.
- Logs: Se generan automáticamente con cada acción

## 🔧 Cómo levantar en local

1. Clonar repositorio backend:

```bash
git clone https://github.com/BocanegraKleyver/uade_api_2025_1c_vn_back.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto con el siguiente contenido:

````env
MONGODB_URI= Pedir al Administrador
JWT_SECRET= Pedir al Administrador.


4. Iniciar servidor local:
```bash
npm start
````

La API estará disponible en: `http://localhost:3001/`

## 🧪 Base de datos

Este proyecto utiliza MongoDB. Se puede usar MongoDB Atlas o local. La estructura de cada colección se encuentra definida en `/models`.

## 👨‍💻 Autores

- **Bocanegra Kleyver** - Legajo 1116590 - UADE - API 2025 - 1C - Viernes Turno Noche
- **Lazbal Santiago** - Legajo 1130853 - UADE - API 2025 - 1C - Viernes Turno Noche

---

Profesores:

- Sarasa, Maria Paula
- Fares, Francisco Joaquín
