const { Schema, model, now } = require('mongoose');

const noticiaSchema = new Schema(
  {
    titulo: {
      type: String,
      trim: true,
      required: [true, 'Titulo es un campo requerido.'],
    },
    contenido: {
      type: String,
      trim: true,
      required: [true, 'Contenido es un campo requerido.'],
    },
    fechaParaPublicacion:{
        type: Date,
        default: Date.now()
    },    
    tipoNoticia: {
        type: String,
        enum: ["Editiorial", "Rumor", "Review", "Admin"],
        default: "Editiorial"
    },
    idUser:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    noticiaAprobada:
    {
        type: Boolean,
        default: false
    },
    idUserRevision:
    {      
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    idComentarios: [ 
      {     
        type: Schema.Types.ObjectId,
        ref: "Comentario"
      }
    ]    
  },
  {
    timestamps: true
  }
);

module.exports = model('Noticia', noticiaSchema);