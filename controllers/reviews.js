const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.reviewListing = async(req,res)=>{
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    console.log(listing);
    req.flash("success","new review saved");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
}

