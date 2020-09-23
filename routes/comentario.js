const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")
const 
{
    getAllComentariosByUser,
    postCreateComentario,
    putUpdateComentario,
    deleteDeleteComentario
} = require("../controllers/comentario")

router.get('/', catchErrors(getAllComentariosByUser));
router.post('/:noticiaId', catchErrors(postCreateComentario));
router.put('/:comentarioId', catchErrors(putUpdateComentario));
router.delete('/:comentarioId', catchErrors(deleteDeleteComentario));

module.exports = router;