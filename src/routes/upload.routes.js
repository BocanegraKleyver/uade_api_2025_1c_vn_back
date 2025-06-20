const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configuración de Multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Ruta para subir imágenes
router.post("/upload", upload.single("imagen"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }
  res.status(200).json({ nombreArchivo: req.file.filename });
});

module.exports = router;
