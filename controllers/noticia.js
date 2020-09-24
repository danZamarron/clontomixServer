const User = require('../models/User');
const Noticia = require('../models/Noticia');
const Comentario = require('../models/Comentario');

const moment = require('moment')


exports.getAllNoticias = async (req, res, next) =>
{
    const noticias = await Noticia.find({
        $and: [ 
            { noticiaAprobada: true}, 
            { fechaParaPublicacion: {
                $lte: moment().endOf('day').toDate()
              } 
            } 
        ]        
      }).sort({ fechaParaPublicacion : "desc"});

    return res.status(200).json({noticias})
}

exports.getAllNoticiasByPage = async (req, res, next) =>
{
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }
    console.log(`Page: ${pageOptions.page}`)
    console.log(`Limit: ${pageOptions.limit}`)


    const noticias = await Noticia.find({
        $and: [ 
            { noticiaAprobada: true}, 
            { fechaParaPublicacion: {
                $lte: moment().endOf('day').toDate()
              } 
            } 
        ]        
      })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ fechaParaPublicacion : "desc"});

    return res.status(200).json({noticias})
}

exports.getAllNoticiasByUser = async (req, res, next) =>
{
    if(!req.user)
    {
        res.status(401).json({ message: "no estas logeado" })
        return
    }
    
    const noticiasByUser = await Noticia.find({ idUser: req.user.id });
    return res.status(200).json({noticiasByUser})
}

exports.getAllNoticiasNotApproved = async (req, res, next) =>
{
    const noticiasNotApproved = await Noticia.find({ noticiaAprobada: false });
    return res.status(200).json({noticiasNotApproved})
}

exports.postCreateNoticia = async (req, res, next) =>
{
    const { titulo, contenido, fechaParaPublicacion, tipoNoticia } = req.body

    //#region  Validar 2 Campos

    if(!req.user)
    {
        res.status(401).json({ message: "no estas logeado" })
        return
    }

    let msg = "";    

    if (!titulo || titulo === "") {
        msg = "El titulo de la noticia es campo requerido"
    }       

    if (!contenido || contenido === "") {
        const defaultMsg = "El contenido de la noticia es un campo requerido"
        if(msg === "")
            msg = defaultMsg
        else
            msg +=", " + defaultMsg;
    }

    if(msg !== "")
    {
        res.status(401).json({ message: msg })
        return
    }

    //#endregion

    const nuevaNoticia = await Noticia.create({
        titulo,
        contenido,
        fechaParaPublicacion,
        tipoNoticia,
        idUser: req.user.id
    })
    res.status(201).json({ nuevaNoticia })
}

exports.putUpdateNoticia = async (req, res, next) =>
{
    const { titulo, contenido, fechaParaPublicacion, tipoNoticia } = req.body
    const { noticiaId } = req.params
    
    //#region  Validar 2 Campos

    if(!req.user)
    {
        res.status(401).json({ message: "no estas logeado" })
        return
    }

    let msg = "";    

    if (!titulo || titulo === "") {
        msg = "El titulo de la noticia es campo requerido"
    }       

    if (!contenido || contenido === "") {
        const defaultMsg = "El contenido de la noticia es un campo requerido"
        if(msg === "")
            msg = defaultMsg
        else
            msg +=", " + defaultMsg;
    }

    if(msg !== "")
    {
        res.status(401).json({ message: msg })
        return
    }

    //#endregion

    const noticiaAct = await Noticia.findByIdAndUpdate(noticiaId,
        {
        titulo,
        contenido,
        fechaParaPublicacion,
        tipoNoticia
        },
        {
            new: true
        }
    )
    res.status(201).json({ noticiaAct })
}

exports.deleteDeleteNoticia = async (req, res, next) => {

    const { noticiaId } = req.params
    await Noticia.findByIdAndRemove(noticiaId)
    await Comentario.deleteMany({ idNoticia: noticiaId })
    res.status(200).json({ message: "Noticia Eliminada" })
}

exports.putNoticiaApproved = async (req, res, next) => {

    const { noticiaId } = req.params
    const noticiaAct = await Noticia.findByIdAndUpdate(noticiaId,
        {
            noticiaAprobada: true,
            idUserRevision: req.user.id
        },
        {
            new: true
        }
    )
    res.status(201).json({ noticiaAct })
}