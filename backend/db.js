const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/tripPlanner");
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("Database connection error:", error);
        
    }
};

module.exports=connectDB;