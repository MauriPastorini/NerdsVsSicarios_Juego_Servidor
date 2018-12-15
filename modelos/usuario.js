var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");
var llaves = require("../config/llaves.json")
const bcrypt = require("bcrypt-nodejs");

var UsuarioSchema = new Schema({
  nombreusuario: { type: String, required: true, index: { unique: true } },
  contrasenia: { type: String },
  puntos: { type: Number },
  nivel: { type: Number, default: 1 },
  cartas: [
    {
      _id: { type: String, required: true },
      tipo: { type: String, require: true },
      nombre: { type: String, required: true },
      velocidad: { type: String, required: true },
      danio: { type: Number, require: true },
      costo_para_desbloquear: { type: Number, required: true },
      nivel: { type: Number,require: true, default: 1 },
      limite_nivel: { type: Number,require: true },
      aprendida: { type: Boolean, require: true, default: false },
    }
  ]
});

UsuarioSchema.pre("save", function(next) {
  let usuario = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(usuario.contrasenia, salt, null, function(err, hash) {
      if (err) return next(err);
      usuario.contrasenia = hash;
      next();
    });
  });
});

UsuarioSchema.statics.compararContrasenia = function(
  contraseniaCandidata,
  dbContrasenia,
  cb
) {
  bcrypt.compare(contraseniaCandidata, dbContrasenia, function(err, esMatch) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, esMatch);
    }
  });
};

UsuarioSchema.statics.verificarToken = async token => {
  console.log(token);
  var decodeado = await jwt.verify(token, llaves.secreto);
  return decodeado;
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
