const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // 👈 Esto debe ir antes de usar app

app.use(cors());
app.use(express.json());

// Habilitar acceso a las imágenes
app.use("/uploads", express.static("uploads"));

// Importar rutas
const uploadRoutes = require("./src/routes/upload.routes");
app.use("/api", uploadRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 👨‍🍳");
});

// Conectar a MongoDB y levantar servidor
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB", err));
