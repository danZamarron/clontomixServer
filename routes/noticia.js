const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")
const 
{
    getAllNoticias,
    getAllNoticiasByUser,
    getAllNoticiasByUserParam,
    getAllNoticiasByPage,
    getAllNoticiasNotApproved,
    postCreateNoticia,
    getOneNoticia,
    putUpdateNoticia,
    deleteDeleteNoticia,
    putNoticiaApproved,
    getNoticiasDestacadas
} = require("../controllers/noticia")

router.get('/', catchErrors(getAllNoticias));
router.get('/user', catchErrors(getAllNoticiasByUser));
router.get('/user/:userId', catchErrors(getAllNoticiasByUserParam));
router.get('/pagination', catchErrors(getAllNoticiasByPage));
router.post('/', catchErrors(postCreateNoticia));
router.get('/detail/:noticiaId', catchErrors(getOneNoticia));
router.put('/edit/:noticiaId', catchErrors(putUpdateNoticia));
router.delete('/delete/:noticiaId', catchErrors(deleteDeleteNoticia));

router.get('/notApproved', catchErrors(getAllNoticiasNotApproved));
router.put('/approved/:noticiaId', catchErrors(putNoticiaApproved));

router.get("/noticiasDestacadas", catchErrors(getNoticiasDestacadas))
module.exports = router;