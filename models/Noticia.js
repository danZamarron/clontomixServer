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
        enum: ["Editorial", "Rumor", "Review", "Admin"],
        default: "Editorial"
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
    ],
    tipoPresentacion: {
        type: String,
        enum: ["Imagen", "Video"],
        default: "Imagen"
    },
    ytLink: {
        type: String
    },
    imgArray: [{
        type: String
    }]
  },
  {
    timestamps: true
  }
);

module.exports = model('Noticia', noticiaSchema);