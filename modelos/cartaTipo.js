var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var CartaTipo = new Schema({
  tipo: { type: String, require: true },
  nombre: { type: String, required: true },
  nombre_completo: { type: String, required: true },
  velocidad: { type: Number },
  danio: { type: Number },
  vida: { type: Number },  
  costo_para_desbloquear: { type: Number, required: true },
  limite_nivel: { type: Number, required: true },
});

module.exports = mongoose.model("CartaTipo", CartaTipo);
