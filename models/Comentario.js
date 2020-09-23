const { Schema, model, now } = require('mongoose');

const comentarioSchema = new Schema(
  {
    comentario: {
      type: String,
      trim: true
    },
    idUser:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    idNoticia:
    {
        type: Schema.Types.ObjectId,
        ref: "Noticia"
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Comentario', comentarioSchema);