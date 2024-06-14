const Listing = require("../Models/Listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken});

module.exports.index = async (req,res,next)=>{
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}
module.exports.new = (req, res) => {
    res.render("listings/new.ejs");   
}
module.exports.postnew = async (req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
      })
        .send()
    let {title,description,price,location,country} = req.body;
    let imageData = req.file?req.file.buffer:null;
    const newListing = new Listing({
        title:title,
        description:description,
        image:{
            data:imageData,
        },
        price:price,
        location:location,
        country:country,
    })
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    let saved =await newListing.save();
    console.log(saved);
    req.flash("success","New Listing Created!")
    console.log("saved");
    res.redirect("/listings");
}

////one for cloud entry
///module.exports.postnew = async (req,res,next)=>{
    //let url = req.file.path;
    //let filename = req.file.filename;
//     let {title,description,price,location,country} = req.body;
//     let imageData = req.file?req.file.buffer:null;
//     const newListing = new Listing({
//         title:title,
//         description:description,
//         image:{
//             data:imageData,
//         },
//         price:price,
//         location:location,
//         country:country,
//     })
//     newListing.owner = req.user._id;
//     await newListing.save();
//     req.flash("success","New Listing Created!")
//     console.log("saved");
//     res.redirect("/listings");
// }

module.exports.show = async (req,res,next)=>{
    let {id} =  req.params;
        let listing =await Listing.findById(id).populate({path:"reviews",populate:{path:"owner"}}).populate("owner");
        if(!listing){
           req.flash("listingNotExist","Listing Doesn't Exist")
           res.redirect("/listings");
        }
        let title = listing.title;
        res.render("listings/detail.ejs",{listing,title});  
}

module.exports.edit = async (req,res,next)=>{
    let{id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("listingNotExist","Listing Doesn't Exist")
        res.redirect("/listings");
     }
    let title = listing.title;
    res.render("listings/edit.ejs",{listing,title});
}

module.exports.editUpload = async (req,res,next)=>{
    let {title,description,price,location,country} = req.body;
    let imageData = req.file?req.file.buffer:null;
    let{id} = req.params;
        // Construct the update object based on provided fields
        let updateObject = {};
        if (title) updateObject.title = title;
        if (description) updateObject.description = description;
        if (price) updateObject.price = price;
        if (location) updateObject.location = location;
        if (country) updateObject.country = country;
        if (imageData) updateObject.image = { data: imageData };
        console.log(updateObject);
        // Update the listing
        await Listing.findByIdAndUpdate(id, updateObject);
        req.flash("edited","Listing Updated!")
        res.redirect(`/listings/${id}`);
}

module.exports.delete = async (req,res,next)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted","Listing Deleted")
    res.redirect("/listings");
}