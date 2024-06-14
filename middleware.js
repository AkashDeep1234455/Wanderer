const Listing = require("./Models/Listing");
const Review = require("./Models/review");

module.exports.isloggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        return res.redirect("/signup");
    }
    next();
}
module.exports.saveredirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        console.log(req.session.redirectUrl);
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let{id} = req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permision to make changes in this listing");
        res.redirect(`/listings/${id}`);
    } 
    next();
}
module.exports.isReviewOwner = async (req,res,next)=>{
    let{id,reviewId} = req.params;
    let review =await Review.findById(reviewId);
    if(!review.owner.equals(res.locals.currUser._id)){
        req.flash("error","You dont have permision to make changes in this listing");
        return res.redirect(`/listings/${id}`);
    } 
    next();
}