const express=require("express");
const router=express.Router();

const {getDestination,createDestination,getDestinationById,updateDestination,deleteDestination}=require("../controllers/destinationController");
router.get("/",getDestination);
router.get("/:id",getDestinationById);
router.post("/",createDestination);
router.put("/:id", updateDestination);
router.delete("/:id",deleteDestination)


module.exports=router;



