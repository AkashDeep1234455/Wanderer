const User = require("../Models/user.js");

module.exports.signupForm = (req,res)=>{
    try{
    res.render("user/signup.ejs");
    }catch(err){
        console.log("err");
    }
}
module.exports.signup = async(req,res,next)=>{
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    let registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","user registered");
        if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
        }else{
            res.redirect("/listings");
        }
    });
    } catch(err){
        req.flash("failure",err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = async(req,res)=>{
    res.render("user/login.ejs");
}
module.exports.login = async(req,res)=>{
    req.flash("success","log in successful");
    if(res.locals.redirectUrl){
        console.log(res.locals.redirectUrl+"asahj");
        res.redirect(res.locals.redirectUrl);
        }else{
        res.redirect("/listings");
    }
}
module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","LogOut successful");
        res.redirect("/listings");
    });
}