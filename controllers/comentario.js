const User = require('../models/User');
const Noticia = require('../models/Noticia');
const Comentario = require('../models/Comentario');

exports.getAllComentariosByUser = async (req, res, next) => {
    const comentariosPorUser = await Comentario.find({idUser : req.user.id})
    return res.status(200).json({comentariosPorUser})
}

exports.getAllComentariosByUserParam = async (req, res, next) => {
    
    const { userId } = req.params
    const comentariosPorUser = await Comentario.find({idUser : userId})
    return res.status(200).json({comentariosPorUser})
}

exports.getAllComentariosByNoticiaParamByPage = async (req, res, next) => {
        
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }
    const { noticiaId } = req.params
    const comentariosPorNoticia = await Comentario.find({idNoticia: noticiaId})
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ createdAt : "desc"});

    return res.status(200).json(comentariosPorNoticia)
}

exports.getComentarioByIdParam = async (req, res, next) => {    
    const { comentarioId } = req.params
    const comentario = await Comentario.findById(comentarioId);
    res.status(200).json(comentario)
}   

exports.postCreateComentario = async (req, res, next) => {

    const { comentario } = req.body
    const { noticiaId } = req.params

    //#region  Validar 1 Campos

    if(!req.user)
    {
        res.status(401).json({ message: "no estas logeado" })
        return
    }

    let msg = "";    

    if (!comentario || comentario === "") {
        msg = "El comentario de la noticia es campo requerido"
    }

    if(msg !== "")
    {
        res.status(401).json({ message: msg })
        return
    }

    //#endregion

    const nuevoComentario = await Comentario.create({
        comentario,
        idUser: req.user.id,
        idNoticia: noticiaId
    })

    await Noticia.findByIdAndUpdate(noticiaId,{
        $push: {idComentarios: nuevoComentario._id}
    })

    res.status(201).json({ nuevoComentario })

}

exports.putUpdateComentario = async (req, res, next) => {
    const { comentario } = req.body
    const { comentarioId } = req.params

    //#region  Validar 1 Campos

    if(!req.user)
    {
        res.status(401).json({ message: "no estas logeado" })
        return
    }

    let msg = "";    

    if (!comentario || comentario === "") {
        msg = "El comentario actualizado es campo requerido"
    }

    if(msg !== "")
    {
        res.status(401).json({ message: msg })
        return
    }

    //#endregion
    const comentarioAct = await Comentario.findByIdAndUpdate(
        comentarioId,
        {
        comentario
        },
        {
            new:true
        })


    res.status(201).json({ comentarioAct })
}

exports.deleteDeleteComentario = async (req, res, next) => {
    
    const { comentarioId } = req.params
    const {idNoticia} = await Comentario.findById(comentarioId);
    await Comentario.findOneAndRemove(comentarioId)
    await Noticia.findByIdAndUpdate(idNoticia, { $pull: {idComentarios: comentarioId } })
    res.status(200).json({ message: "Comentario Eliminada" })
}

