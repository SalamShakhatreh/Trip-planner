const mongoose=require("mongoose");

const placeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type: String,
        required:true
    },

    image:{
        type:String,
        required:true
    },
    destination:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required:true
    }
});


const Place=mongoose.model("Place",placeSchema);
module.exports=Place;