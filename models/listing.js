const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({

    title:{
       type:String,
       required:true,
    },
    description:{
        type: String,
    },
    image:{
       url: String,
       filename: String,
    },
    price:{
        type: Number
    },
    location :{
        type:String
    },
    Category :{
        type: String,
        enum: ["Camping","Trending","Domes","Iconic City","Poolside","Tropical","Mansion","Top of the World","Farm","Ski in-out","Games","Creative Place"]
    },
    country : {
       type: String
    },
    reviews : [
        {
       type: Schema.Types.ObjectId,
       ref:"Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref: "User",
    },
    geometry : {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
    await Review.deleteMany({_id:{ $in: listing.reviews}});
   }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports =Listing;
