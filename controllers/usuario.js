var Usuario = require("./../models/usuario");
var jwt = require("jsonwebtoken");
var llaves = require("../config/llaves.json");

exports.crearUsuario = (req, res) => {
  console.log("CREAR USUARIO: ", req.body);
  const usuario = new Usuario(req.body);
  usuario.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
};

exports.iniciarSesion = async (req, res) => {
  Usuario.findOne({ nombreusuario: req.body.nombreusuario }, function(
    err,
    user
  ) {
    if (err) throw err;
    console.log(user);
    Usuario.compararContrasenia(
      req.body.contrasenia,
      user.contrasenia,
      function(err, isMatch) {
        if (err) {
          res.status(500).json({ msg: "Error en servidor" });
        }
        if (!isMatch) {
          return res.status(400).json({ msg: "Contrasenia incorrecta" });
        } else {
          var token = jwt.sign({ id: user._id }, llaves.secreto, {
            expiresIn: 86400
          });
          return res.status(200).json({
            msg: "Exito al loguearse",
            token
          });
        }
      }
    );
  });
};

exports.obtenerCartasDeJugador = async (req, res) => {
  return res.status(200).json({ cartas: [] });
};
