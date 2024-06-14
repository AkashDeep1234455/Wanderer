const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../Models/Listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderer";
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}
let data2;
async function getdata(){
    data2 = await Listing.find();
    for(let i=0;i<data2.length;i++){
        let curr = data2[i];
        curr.owner = '66649cfae4dd9fe787c4cbdc';
    }
    console.log(data2);
    await Listing.deleteMany({});
    await Listing.insertMany(data2);
}
getdata();

