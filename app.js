if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}



const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodoverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js"); 
const reviewRouter = require("./routes/review.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const cookie_parser = require("cookie-parser");
const passport = require("passport");
const User = require("./Models/user.js");
const LocalStrategy = require("passport-local");
const userRouter = require("./routes/user.js");
const { error } = require('console');
const dbUrl= process.env.ATLAS_DB_URL;
const secret = process.env.SECRET;

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:secret
    },
    touchAfter:24*3600,
})

store.on("error",()=>{
    console.log("Error in Mongo Session Store", error)
})

const sessionOptions = ({
    store,
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
});
const secretCookieCode = process.env.SECRET_COOKIE_CODE;


app.use(session(sessionOptions));
app.use(flash());
app.use(cookie_parser(secretCookieCode));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use(methodoverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true})); 
app.engine("ejs",ejsMate);





//Database Connection made
//this is used to connect to our local host
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderer";

//for making connection with cloud

main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbUrl);
}



app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    res.locals.error = req.flash("error");
    res.locals.edited = req.flash("edited");
    res.locals.deleted= req.flash("deleted");
    res.locals.reviewEdited = req.flash("reviewEdited")
    res.locals.reviewDeleted = req.flash("reviewDeleted");
    res.locals.listingNotExist = req.flash("listingNotExist");
    res.locals.currUser = req.user;
    next();
})
///route creation
///handle favicon requesst route
app.get('/favicon.ico', (req, res) => {
    res.send(path.join(__dirname, 'public', 'favicon.ico'));
});




///listing route
app.use("/listings",listingRouter);
///review route
app.use("/listings/:id/reviews",reviewRouter);
///user route
app.use("/",userRouter);






















//////error handling
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})
app.use((err,req,res,next)=>{
    if (err instanceof ExpressError) {
        res.status(err.statusCode).render("errors.ejs", { err });
    } else {
        // Handle other types of errors (e.g., 500 Internal Server Error)
        res.status(500).render("errors.ejs", { err });
    }
})
app.listen(port,()=>{
    console.log(`Server listening to port:${port}`);
});
