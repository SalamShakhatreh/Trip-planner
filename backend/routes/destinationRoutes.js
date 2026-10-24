const express=require("express");
const router=express.Router();

const {getDestination,createDestination,getDestinationById}=require("../controllers/destinationController");
router.get("/",getDestination);
router.get("/:id",getDestinationById);
router.post("/",createDestination);




module.exports=router;



