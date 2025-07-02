# 📄 Estructura de Datos en MongoDB - Sabores Urbanos

Este documento describe cómo se estructuran los documentos en cada colección de la base de datos MongoDB utilizada por el backend de Sabores Urbanos.

---

## 👤 Colección: `usuarios`

```json
{
  "_id": "66bdc1d445e...",
  "nombre": "Sabores",
  "apellido": "Urbanos",
  "email": "admin@saboresurbanos.com",
  "contraseña": "$2a$10$... (hash)",
  "rol": "root",
  "isRoot": true,
  "activo": true,
  "permisos": {
    "gestionarUsuarios": true,
    "gestionarPlatos": true,
    "gestionarLogs": true,
    "gestionarResenas": true
  },
  "createdAt": "2025-07-01T00:00:00.000Z",
  "updatedAt": "2025-07-01T00:00:00.000Z"
}
```

---

## 🍽️ Colección: `platos`

```json
{
  "_id": "66bdc32ff9a...",
  "nombre": "Milanesa Napolitana",
  "descripcion": "Con papas fritas",
  "precio": 2500,
  "categoria": "Plato Principal",
  "ingredientes": ["Carne", "Jamón", "Queso", "Tomate"],
  "alergenos": ["Gluten", "Lácteos"],
  "etiquetas": ["🥛 Sin lactosa"],
  "imagen": "milanesa-napo.jpg",
  "activo": true,
  "createdAt": "2025-07-01T00:00:00.000Z",
  "updatedAt": "2025-07-01T00:00:00.000Z"
}
```

---

## 📝 Colección: `resenas`

```json
{
  "_id": "66bdc4aa6f...",
  "platoId": "66bdc32ff9a...",
  "platoNombre": "Milanesa Napolitana",
  "nombre": "Lucía Gómez",
  "comentario": "¡Excelente sabor, volvería sin dudar!",
  "valoracion": 5,
  "activo": true,
  "respuesta": {
    "texto": "¡Gracias por tu comentario!",
    "respondidoPor": "Admin",
    "fecha": "2025-07-01T15:00:00.000Z"
  },
  "fecha": "2025-07-01T13:00:00.000Z",
  "createdAt": "2025-07-01T13:00:00.000Z",
  "updatedAt": "2025-07-01T15:00:00.000Z"
}
```

---

## 📜 Colección: `logs`

```json
{
  "_id": "6865a0457b4450b056af6119",
  "usuario": {
    "nombre": "Sistema",
    "apellido": "Automático",
    "email": "sistema@saboresurbanos.com",
    "rol": "root",
    "permisos": {
      "gestionarUsuarios": true,
      "gestionarPlatos": true,
      "gestionarLogs": true,
      "gestionarResenas": true
    }
  },
  "accion": "Precarga de reseñas",
  "detalle": "Se insertaron 100 reseñas ficticias automáticamente.",
  "createdAt": "2025-07-01T16:30:00.000Z",
  "updatedAt": "2025-07-01T16:30:00.000Z"
}
```

---

## 📁 Modelos definidos

Los modelos Mongoose se encuentran en `/models` y corresponden a cada colección:

- `Usuario`
- `Plato`
- `Resenia`
- `Log`
