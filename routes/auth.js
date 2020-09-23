const { Router } = require('express');
const router  = new Router();

const {catchErrors} = require("../middlewares/index")

const {
    postSignUp,
    postLogin,
    getLogOut,
    getCurrentUser,
    getGoogleLogin,
    getGoogleCallback,
} = require ("../controllers/auth")

router.post("/login", catchErrors(postLogin))
router.post("/signup", catchErrors(postSignUp))
router.get("/logout", getLogOut)
router.get("/currentUser", getCurrentUser)
router.get("/google", getCurrentUser)
router.get("/google/callback", getCurrentUser)


module.exports = router;