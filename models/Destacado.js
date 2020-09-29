const { Schema, model, now } = require('mongoose');

const destacadoSchema = new Schema(
  {
    idNoticia:
    {
        type: Schema.Types.ObjectId,
        ref: "Noticia",
        unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Destacado', destacadoSchema);