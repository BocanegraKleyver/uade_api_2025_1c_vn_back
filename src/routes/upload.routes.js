const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png/;
    const esValido = tiposPermitidos.test(file.mimetype);
    if (esValido) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes JPG o PNG"));
    }
  },
});

router.post("/upload", upload.single("imagen"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }
  res.status(200).json({ nombreArchivo: req.file.filename });
});

module.exports = router;
