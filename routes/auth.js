const { Router } = require('express');
const router  = new Router();
const passport = require("../configs/passport")

const {catchErrors} = require("../middlewares/index")

const {
    postSignUp,
    postLogin,
    getLogOut,
    getCurrentUser,
    getGoogleLogin,
    getGoogleCallback,
    getProfileData,
    postUpdateProfileData,
    postUpdateProfileAvatar
} = require ("../controllers/auth")

router.post("/login", catchErrors(postLogin))
router.post("/signup", catchErrors(postSignUp))
router.get("/logout", getLogOut)
router.get("/currentUser", getCurrentUser)
router.get("/google",  getGoogleLogin)
router.get("/google/callback", getGoogleCallback)

router.get("/profile", getProfileData)
router.post("/profile", catchErrors(postUpdateProfileData))
router.post("/profileAvatar", catchErrors(postUpdateProfileAvatar))


module.exports = router;