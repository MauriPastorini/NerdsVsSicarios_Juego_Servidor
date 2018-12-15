var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var CartaTipo = new Schema({
  tipo: { type: String, require: true },
  nombre: { type: String, required: true, index: { unique: true } },
  nombre_completo: { type: String, required: true, index: { unique: true } },
  velocidad: { type: Number },
  danio: { type: String },
  costo_para_desbloquear: { type: Number, required: true },
  limite_nivel: { type: Number, required: true },
});

module.exports = mongoose.model("CartaTipo", CartaTipo);
