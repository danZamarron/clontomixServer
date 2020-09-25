const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")
const 
{
    getAllComentariosByUser,
    getAllComentariosByUserParam,
    getAllComentariosByNoticiaParamByPage,
    getComentarioByIdParam,
    postCreateComentario,
    putUpdateComentario,
    deleteDeleteComentario
} = require("../controllers/comentario")

router.get('/', catchErrors(getAllComentariosByUser));
router.get('/user/:userId', catchErrors(getAllComentariosByUserParam));
router.get('/noticia/:noticiaId', catchErrors(getAllComentariosByNoticiaParamByPage));
router.get("/:comentarioId", catchErrors(getComentarioByIdParam))
router.post('/:noticiaId', catchErrors(postCreateComentario));
router.put('/:comentarioId', catchErrors(putUpdateComentario));
router.delete('/:comentarioId', catchErrors(deleteDeleteComentario));

module.exports = router;