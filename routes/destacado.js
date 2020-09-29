const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")
const 
{
  postAddNoticiaDestacada,
  deleteDeleteNoticiaDestacada,
  getNoticiasDestacadasOnly

} = require("../controllers/destacado")


router.post('/', catchErrors(postAddNoticiaDestacada));
router.delete('/:idDestacado', catchErrors(deleteDeleteNoticiaDestacada));
router.get("/", catchErrors(getNoticiasDestacadasOnly))

module.exports = router;