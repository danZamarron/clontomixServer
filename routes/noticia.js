const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")
const 
{
    getAllNoticias,
    getAllNoticiasByUser,
    getAllNoticiasByPage,
    getAllNoticiasNotApproved,
    postCreateNoticia,
    putUpdateNoticia,
    deleteDeleteNoticia,
    putNoticiaApproved
} = require("../controllers/noticia")

router.get('/', catchErrors(getAllNoticias));
router.get('/user', catchErrors(getAllNoticiasByUser));
router.get('/pagination', catchErrors(getAllNoticiasByPage));
router.post('/', catchErrors(postCreateNoticia));
router.put('/:noticiaId', catchErrors(putUpdateNoticia));
router.delete('/:noticiaId', catchErrors(deleteDeleteNoticia));

router.get('/notApproved', catchErrors(getAllNoticiasNotApproved));
router.put('/approved/:noticiaId', catchErrors(putNoticiaApproved));

module.exports = router;