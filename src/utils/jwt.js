const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "clave_super_secreta";

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      activo: usuario.activo,
      permisos: usuario.permisos,
    },
    SECRET,
    { expiresIn: "2h" }
  );
};

const verificarToken = (token) => {
  console.log("🧪 Verificando token con SECRET:", SECRET);
  return jwt.verify(token, SECRET);
};

module.exports = {
  generarToken,
  verificarToken,
};
