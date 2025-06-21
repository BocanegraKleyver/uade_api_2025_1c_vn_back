const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "clave_super_secreta";

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo,
      permisos: usuario.permisos,
    },
    SECRET,
    { expiresIn: "2h" }
  );
};

const verificarToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  generarToken,
  verificarToken,
};
