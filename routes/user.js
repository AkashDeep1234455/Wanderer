const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../Models/user.js");
const passport = require("passport");
const {saveredirectUrl} = require("../middleware.js");
const userController = require("../controllers/user.js");

///signUp
router.get("/signup",userController.signupForm)
router.post("/signup",saveredirectUrl,wrapAsync(userController.signup))


///login
router.get("/login",wrapAsync(userController.loginForm))

router.post("/login",saveredirectUrl,
    passport.authenticate('local',{
        failureRedirect:'/login',
        failureFlash:true
    }),wrapAsync(userController.login)
)
//logout
router.get("/logout",userController.logout)



module.exports = router;
