const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./src/routes/upload.routes");
const platoRoutes = require("./src/routes/plato.routes");
const usuarioRoutes = require("./src/routes/usuario.routes");
const logRoutes = require("./src/routes/log.routes");
const crearAdminSiNoExiste = require("./src/config/crearAdmin");

const app = express();

// Middleware globales
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api", uploadRoutes);
app.use("/api", platoRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", logRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 👨‍🍳");
});

// Conexión a MongoDB
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Conectado a MongoDB Atlas");

    await crearAdminSiNoExiste(); // Crea el admin al iniciar, si no existe

    app.listen(PORT, () =>
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error conectando a MongoDB", err));
