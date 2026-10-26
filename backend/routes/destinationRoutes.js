const express=require("express");
const router=express.Router();

const {getDestination,createDestination,getDestinationById,updateDestination,deleteDestination}=require("../controllers/destinationController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/",getDestination);
router.get("/:id",getDestinationById);
router.post("/", authMiddleware, adminMiddleware, createDestination);
router.put("/:id", authMiddleware, adminMiddleware, updateDestination);
router.delete("/:id", authMiddleware, adminMiddleware, deleteDestination);


module.exports=router;



