const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, validateListing, isOWner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

router
 .route("/")
 // Index Route
 .get(wrapAsync(listingController.index))

 //Create Route
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
 );
//New Route

router.get("/new",
isLoggedIn, listingController.renderNewForm);

router
 .route("/:id")
 //Show Route
 .get(
  wrapAsync(listingController.showListings)
  )
  // Update Route
  .put(
  isLoggedIn, 
  isOWner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
  )
  // Delete Route
  .delete(
  isLoggedIn, 
  isOWner,
  wrapAsync(listingController.deleteListing)
 );
  
// Edit route
router.get(
    "/:id/edit",
    isLoggedIn, 
    isOWner,
wrapAsync(listingController.renderEditForm)
);



module.exports = router;