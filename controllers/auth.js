const {hashSync, genSaltSync} = require('bcrypt');
const saltRounds = 12;
const User = require('../models/User');
const passport = require("../configs/passport")
const DEFAULT_ROLE_TYPE = "User"


exports.postLogin = async (req,res,next) => 
{
    passport.authenticate("local", (err, user, failureDetails) => {
        if (err) {
          console.log(failureDetails)
          res
            .status(500)
            .json({ message: "Something went wrong authenticating user" })
          return
        }
    
        if (!user) {
          res.status(401).json(failureDetails)
          return
        }
        req.login(user, err => {
          if (err) {
            res.status(500).json({ message: "Session save went bad." })
            return
          }
          res.status(200).json(user)
        })
      })(req, res, next)
}

exports.postSignUp = async (req, res, next) => 
{
    console.log(req.body)
    const { username, email, password } = req.body
    const roleType = DEFAULT_ROLE_TYPE

    //#region  Validar 3 Campos y regresar cuales eran

    let msg = "";    
    
    if (!username || username === "") {
        msg = "Nombre del usuario es un campo requerido"
    }       

    if (!email || email === "") {
        const defaultMsg = "Email es un campo requerido"
        if(msg === "")
            msg = defaultMsg
        else
            msg +=", " + defaultMsg;
    }       
    
    if (!password || password === "") {
        const defaultMsg = "Password es un campo requerido"
        if(msg === "")
            msg = defaultMsg
        else
            msg += ", " + defaultMsg;
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (password && password !== "" && !regex.test(password)) {
        const defaultMsg = 'El password necesita tener al menos una mayuscula, un digito y una longitud minima de 6'
        if(msg === "")
            msg = defaultMsg
        else
            msg += ", " + defaultMsg;
    }

    if(msg !== "")
    {
        res.status(401).json({ message: msg })
        return
    }

    //#endregion

    const existingUser = await User.findOne({ email })
  
    if (existingUser) {
        res.status(401).json({ message: "Error, intenta de nuevo." })
        return
    }
  
    const hashPwd = hashSync(password, genSaltSync(saltRounds))
  
    await User.create({
        username,
        email,
        password: hashPwd,
        roleType
    })
    .then(() => {
        res.status(200).json({ message: "Usuario creado" })
    })
    .catch(err => {
        res.status(500).json({ message: "Algo sucedio al crear el usuario" })
    })     
}

exports.getLogOut = (req, res, next) => {
    req.logout()
    res.status(200).json({ message: "Usuario cerro sesion satisfactoriamente" })
}

exports.getCurrentUser = (req,res,next) => {
    res.status(200).json({ user: req.user })
}

exports.getGoogleLogin = (req, res, next) => {
    next();
}

exports.getGoogleCallback = (req, res, next) => {
    next();
}