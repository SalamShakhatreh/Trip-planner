const express=require("express");
const router=express();

const {getPlaces,createPlace}=require("../controllers/placeController");

router.get("/",getPlaces);
router.post("/",createPlace);

module.exports=router;