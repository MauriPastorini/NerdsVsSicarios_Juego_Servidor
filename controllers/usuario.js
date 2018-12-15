var Usuario = require("./../modelos/usuario");
var jwt = require("jsonwebtoken");
var llaves = require("../config/llaves.json");
const CartaTipo = require("../modelos/cartaTipo");

exports.crearUsuario = (req, res) => {
  console.log("CREAR USUARIO: ", req.body);
  const usuario = new Usuario(req.body);
  usuario.save((err, data) => {
    if (err) {
      console.log(err);
      if ((err.code != null) & (err.code == 11000)) {
        return res.status(400).json({ exito: false, msg: "Usuario ya existe" });
      } else {
        return res.status(500).json({ exito: false, msg: "Error de servidor" });
      }
    }
    return res.status(200).json({ exito: true });
  });
};

exports.setearNerdOSicario = async (req, res) => {
  var tipoDeUsuario = req.body.tipoDeUsuario;
  if (tipoDeUsuario == null) {
    return res
      .status(400)
      .jsonp({ exito: false, msg: "Falta tipo de usuario" });
  }
  try {
    var usuario = await Usuario.findById(req.usuario._id);
    console.log("Usuario: ", usuario);
    if (usuario.cartas != null && usuario.cartas.length != 0) {
      return res.status(400).jsonp({
        exito: false,
        msg: "Usuario ya seateado como nerd o sicario"
      });
    }
    var cartas = await CartaTipo.find({ nerdosicario: tipoDeUsuario });
    usuario.cartas = cartas;
    await usuario.save();
    return res.status(200).jsonp({ exito: true });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).jsonp({ exito: false });
  }
};

exports.iniciarSesion = async (req, res) => {
  Usuario.findOne({ nombreusuario: req.body.nombreusuario }, function(
    err,
    usuario
  ) {
    if (err) throw err;
    if (!usuario)
      return res.status(404).jsonp({ exit: false, msg: "Usuario no existe" });
    console.log(usuario);
    Usuario.compararContrasenia(
      req.body.contrasenia,
      usuario.contrasenia,
      function(err, esMatch) {
        if (err) {
          res.status(500).jsonp({ msg: "Error en servidor" });
        }
        if (!esMatch) {
          return res.status(400).jsonp({ msg: "Contrasenia incorrecta" });
        } else {
          var token = jwt.sign({ usuario }, llaves.secreto, {
            expiresIn: 86400
          });
          return res.status(200).send(token);
        }
      }
    );
  });
};

exports.obtenerCartasDeJugador = async (req, res) => {
  var id = req.usuario._id;
  try {
    var usuario = await Usuario.findById(id);
  } catch (err) {
    console.log("Error obteniendo usuario: ", err);
    return res.status(500).jsonp({ exito: false, msg: "Error en el servidor" });
  }
  console.log("Id de token: ", id);
  console.log("Usuario: ", usuario);
  if (id != usuario._id) {
    return res.status(403).jsonp({
      exito: false,
      msg: "Intentando obtener cartas de otro jugador"
    });
  }
  var cartasJugador = usuario.cartas;
  console.log("Cartas jugador: ", cartasJugador);
  try {
    var ids = [];
    cartasJugador.forEach(element => {
      ids.push(element._id);
    });
    var cartasDB = await CartaTipo.find({ _id: { $nin: ids } });
    console.log("Cartas DB: ", cartasDB);
    usuario.cartas = [...cartasJugador, ...cartasDB];
    await usuario.save();
  } catch (err) {
    console.log("Error buscando cartas o guardando: ", err);
    return res.status(500).jsonp({ exito: false });
  }
  return res.status(200).jsonp({ exito: true, cartas: usuario.cartas });
};

exports.subirNivelUsuario = async (req, res) => {
  var id = req.usuario._id;
  try {
    var usuario = await Usuario.findById(id);
  } catch (err) {
    console.log("Error obteniendo usuario: ", err);
    return res.status(500).jsonp({ exito: false, msg: "Error en el servidor" });
  }
  console.log("Id de token: ", id);
  console.log("Usuario: ", usuario);
  
  if (id != usuario._id) {
    return res.status(403).jsonp({
      exito: false,
      msg: "Intentando obtener cartas de otro jugador"
    });
  }
  var cartasJugador = usuario.cartas;
  console.log("Cartas jugador: ", cartasJugador);
  try {
    var ids = [];
    cartasJugador.forEach(element => {
      ids.push(element._id);
    });
    var cartasDB = await CartaTipo.find({ _id: { $nin: ids } });
    console.log("Cartas DB: ", cartasDB);
    usuario.cartas = [...cartasJugador, ...cartasDB];
    await usuario.save();
  } catch (err) {
    console.log("Error buscando cartas o guardando: ", err);
    return res.status(500).jsonp({ exito: false });
  }
  return res.status(200).jsonp({ exito: true, cartas: usuario.cartas });
};
