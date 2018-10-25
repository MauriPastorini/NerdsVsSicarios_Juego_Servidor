var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const bcrypt = require("bcrypt-nodejs");


var UsuarioSchema = new Schema({
  nombreusuario: { type: String, required: true, index: { unique: true } },
  contrasenia: { type: String },
  cartas: [
    {
      velocidad: { type: String, required: true },
      danio: { type: Number, require: true },
      costo: { type: Number },
      nivel: { type: Number },
      tipo: {
        jugador: {
          type: String
        },
        nombre: {
          type: String
        }
      }
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

module.exports = mongoose.model("Usuario", UsuarioSchema);
