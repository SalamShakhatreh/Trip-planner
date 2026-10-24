const express=require("express");
const router=express.Router();

const {getDestination,createDestination}=require("../controllers/destinationController");
router.get("/",getDestination);
router.post("/",createDestination);

module.exports=router;