const Usuario = require("../modelos/usuario");

exports.verificarTokenEInsertarUsuario = async (req, res, next) => {
  console.log("Verificando token e insertando usuario");
  var token = req.header("token");
  if (token == null) {
    return res
      .status(400)
      .jsonp({ success: false, message: "Falta token de usuario" });
  }
  console.log("Token: ", token);
  var usuarioDecodeado;
  try {
    usuarioDecodeado = await Usuario.verificarToken(token);
    console.log("Usuario decodeado: ", usuarioDecodeado);
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
  var usuario;
  try {
    usuario = await Usuario.findById(usuarioDecodeado.usuario._id);
  } catch (err) {
    console.log("Error en el servidor: ", err);
    return res.status(500);
  }
  if (usuario == null) {
    return res.status(404).jsonp({ success: false, msg: "Usuario no existe" });
  }
  console.log("Req path: ", req.path);
  if (req.params.userId != null && false) {
    var usuarioPath;
    try {
      usuarioPath = await Usuario.findById(req.params.userId);
    } catch (err) {
      console.log("Error en el servidor: ", err);
      return res.status(500);
    }
    if (usuarioPath == null) {
      return res
        .status(404)
        .jsonp({ success: false, msg: "Usuario en path no existe" });
    }
    var us1 = usuarioPath._id.toString();
    var us2 = usuario._id.toString();
    if (us1 != us2) {
      return res
        .status(403)
        .jsonp({
          success: false,
          msg: "Usuario de path distinto al del token"
        });
    }
  }
  console.log("Decodeado");
  req.usuario = usuario;
  console.log("Usuario guardado: ", req.usuario);
  next();
};
