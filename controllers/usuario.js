var Usuario = require("./../models/usuario");
var jwt = require("jsonwebtoken");
var keys = require('../config/keys.json');

exports.crearUsuario = (req, res) => {
  console.log(req.body);
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
  Usuario.findOne({ nombreusuario: req.body.nombreusuario }, function(err, user) {
    if (err) throw err;
    console.log(user);
    Usuario.compararContrasenia(req.body.contrasenia, user.contrasenia, function(err, isMatch) {
      if (err){
        console.log("ERROR ")
        console.log(err)
      } 
      if(!isMatch){
        return res.status(400).json({msg: "Contrasenia incorrecta"})
      } else {
        var token = jwt.sign({ id: user._id }, keys.secret, {
          expiresIn: 86400 
        });
        return res.status(200).json({
          msg: "Exito al loguearse",
          token
        })
      }
    });
  });
};

exports.obtenerCartasDeJugador = async (req, res) => {
  return res.status(200).json({ success: true });
};
