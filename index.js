const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const usuarioRoutes = require("./src/routes/usuario.routes");

const precargarPlatos = require("./src/config/precargarPlatos");
const platoRoutes = require("./src/routes/plato.routes");

const reseniaRoutes = require("./src/routes/resenia.routes");
const precargarResenias = require("./src/config/precargarResenias");

const logRoutes = require("./src/routes/log.routes");
const crearAdminSiNoExiste = require("./src/config/crearAdmin");

const app = express();

// Middleware globales
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api", platoRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", logRoutes);
app.use("/api/resenas", reseniaRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 👨‍🍳");
});

// Conexión a MongoDB
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Conectado a MongoDB Atlas");

    await crearAdminSiNoExiste(); // ✅ Crear admin root si no existe
    await precargarPlatos(); // ✅ Precargar platos si no hay en DB
    await precargarResenias(); // ✅ Precarga de reseñas ← AGREGADO

    app.listen(PORT, () =>
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error conectando a MongoDB", err));
