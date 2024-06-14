const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const fs = require('fs');
const defaultImagePath = path.join(__dirname, 'public', 'defaultImage.png');
const defaultImageData = fs.readFileSync(defaultImagePath);
const Review = require("./review.js");
const { type } = require("os");
const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        data:Buffer,
    },
    //modified for cloud entry
    // image:{
    //     url:String
    //     filename:String
    // }
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true,
        },
        coordinates:{
            type:[Number],
            required:true,
        }
    }
});
listingSchema.pre('save', function(next) {
    // Check if image data is provided
    if (!this.image || !this.image.data || this.image.data.length === 0) {
        this.image = { data: defaultImageData };
    }
    next();
});

listingSchema.post("findOneAndDelete",async function(listing){
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;

