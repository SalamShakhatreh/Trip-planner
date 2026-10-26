const express=require("express");
const router=express.Router();

const {getPlaces,createPlace,getPlaceById,updatePlace,deletePlace}=require("../controllers/placeController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/",getPlaces);
router.get("/:id", getPlaceById);
router.post("/", authMiddleware, adminMiddleware, createPlace);
router.put("/:id", authMiddleware, adminMiddleware, updatePlace);
router.delete("/:id", authMiddleware, adminMiddleware, deletePlace);
module.exports=router;