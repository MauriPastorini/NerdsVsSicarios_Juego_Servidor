const Usuario = require("../modelos/usuario");

exports.verificarTokenEInsertarUsuario = async (req, res, next) => {
  console.log("Verificando token e insertando usuario");
  var token = req.header("token");
  if (token == null) {
    return res.status(400).jsonp({ success: false, message: "Falta token de usuario" });
  }
  console.log("Token: ", token);
  var usuarioDecodeado;
  try {
    usuarioDecodeado = await Usuario.verificarToken(token);
  } catch (err) {
    return res.status(400).jsonp({
      success: false,
      message: "Token invalido"
    });
  }

  if (!usuarioDecodeado) {
    return res.status(403).jsonp({
      success: false,
      message: "Token invalido"
    });
  }
  console.log("Decodeado");
  req.usuario = usuarioDecodeado.usuario;
  console.log("Usuario guardado: ", req.usuario);
  next();
};
