const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {ratingSchema, reviewSchema} = require("../revSchema.js");
const Listing = require("../Models/Listing.js");
const Review = require("../Models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const {isloggedIn,isReviewOwner} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


///review server-side validation
const validateReview = (req,res,next)=>{
    let{error} = reviewSchema.validate(req.body);
    if(error){
        let = errMsg = error.details.map((el)=>el.message).join(" ");
        throw new ExpressError (400,errMsg);
    }else{
        next();
    }
}



////to add reviews
router.post("/",isloggedIn,validateReview,wrapAsync(reviewController.addReview));
////to delete
router.post("/:reviewId",isloggedIn,isReviewOwner,wrapAsync(reviewController.deleteReview));




module.exports = router;