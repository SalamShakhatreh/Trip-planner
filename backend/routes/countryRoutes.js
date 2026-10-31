const express = require("express");
const router = express.Router();

const { getCountries, createCountry } = require("../controllers/countryController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", getCountries);
router.post("/", authMiddleware, adminMiddleware, createCountry);

module.exports = router;
