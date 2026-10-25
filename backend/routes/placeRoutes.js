const express=require("express");
const router=express.Router();

const {getPlaces,createPlace,getPlaceById,updatePlace,deletePlace}=require("../controllers/placeController");

router.get("/",getPlaces);
router.get("/:id", getPlaceById);
router.post("/",createPlace);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);
module.exports=router;