const Comentario = require('../models/Comentario');
const Destacado = require('../models/Destacado');

exports.postAddNoticiaDestacada = async (req, res, next) => {

  const {idNoticia} = req.body;

  const nuevaNoticiaDestacada = await Destacado.create({
    idNoticia
  })

  res.status(201).json({ nuevaNoticiaDestacada })

}

exports.deleteDeleteNoticiaDestacada = async (req, res, next) => {
  
  const {idDestacado} = req.params;
 
  const nuevaNoticiaDestacada = await Destacado.findByIdAndRemove(
    idDestacado
  )

  res.status(200).json({ message: "Noticia Destacada Eliminada" })
}

exports.getNoticiasDestacadasOnly = async (req, res, next) => {

  
  let noticiasDestacadas = await Destacado
  .find()
  .populate({path: 'idNoticia', options: { sort: {"fechaParaPublicacion" : "asc"}}})
  
  let noticiasInverse = [...noticiasDestacadas].reverse()

  res.status(200).json(noticiasInverse)

}