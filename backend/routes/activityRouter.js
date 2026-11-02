
const express = require("express");
const router = express.Router();

const {
  getActivitiesByCountry,
} = require("../controllers/activityController");

router.get("/", getActivitiesByCountry);

module.exports = router;
