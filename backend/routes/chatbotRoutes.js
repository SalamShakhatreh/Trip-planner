const express = require("express");
const router = express.Router();

const { generateItinerary } = require("../controllers/chatbotController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/itinerary", authMiddleware, generateItinerary);

module.exports = router;