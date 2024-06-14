const Listing = require("../Models/Listing");
const Review = require("../Models/review");


module.exports.addReview = async(req,res,next)=>{
    let listing = await Listing.findById(req.params.id);
    let id = listing.id;
    let newReview = new Review(req.body.review);
    newReview.owner = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("reviewEdited","Review Updated!")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("reviewDeleted","Review Deleted!")
    res.redirect(`/listings/${id}`);
}