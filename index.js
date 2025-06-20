const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const uploadRoutes = require("./src/routes/upload.routes");
const platoRoutes = require("./src/routes/plato.routes");

app.use("/api", uploadRoutes);
app.use("/api", platoRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 👨‍🍳");
});

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB", err));
