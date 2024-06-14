

const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../Models/Listing.js");
const multer = require("multer");
const {isloggedIn,isOwner} = require("../middleware.js");



//configuring multer for memory storage //file upload
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

///cloud
// const {storage} = require("../cloudConfig.js");
// const upload = multer({storage});


//controller require
const listingController = require("../controllers/listing.js");



//validation
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(" ");
        throw new ExpressError (400,errMsg);
    }else{
        next();
    }
}



///using router.route

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    upload.single('image'),
    isloggedIn,
    validateListing,
    wrapAsync(listingController.postnew)
)



//indexRoute
// router.get("/",wrapAsync(listingController.index));




////Route for new Entry
router.get("/new",isloggedIn,listingController.new);

// router.post("/",upload.single('image'),isloggedIn,validateListing,wrapAsync(listingController.postnew));

//showRoute  //route for seeing data to something specific
router.get("/:id",wrapAsync(listingController.show));



////edit route
router.get("/:id/edit",isloggedIn,wrapAsync(listingController.edit))

router.put("/:id",upload.single("image"),isloggedIn,isOwner,validateListing,wrapAsync(listingController.editUpload)
);


router.delete("/:id",isloggedIn,isOwner,wrapAsync(listingController.delete));


module.exports = router;