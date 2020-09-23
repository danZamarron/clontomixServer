const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")
const 
{
  getIndexAPI
} = require("../controllers/index")

/* GET home page */
router.get('/', catchErrors(getIndexAPI));

module.exports = router;
