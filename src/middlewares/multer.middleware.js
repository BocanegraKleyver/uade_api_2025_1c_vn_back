const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|gif/;
    const esValido = tiposPermitidos.test(file.mimetype);
    if (esValido) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes JPG, PNG o GIF"));
    }
  },
});

module.exports = upload;
