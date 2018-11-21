var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var CartaTipo = new Schema({
  tipo: { type: String, require: true },
  nombre: { type: String, required: true, index: { unique: true } },
  velocidad: { type: Number },
  danio: { type: String },
  costoParaDesbloquear: { type: Number, required: true },
});

module.exports = mongoose.model("CartaTipo", CartaTipo);
