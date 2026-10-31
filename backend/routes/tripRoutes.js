const express = require("express");
const router = express.Router();

const { createTrip, getMyTrips, getTripById, updateTrip, deleteTrip, getAllTrips } = require("../controllers/tripController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/",authMiddleware,createTrip);
router.get("/", authMiddleware, getMyTrips);
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip );
router.get("/admin/all", authMiddleware, adminMiddleware, getAllTrips);

module.exports = router;