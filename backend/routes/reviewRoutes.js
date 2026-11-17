
const express = require("express");
const router = express.Router();

const {
  getPlaceReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/my", authMiddleware, getMyReviews);

router.get("/place/:placeId", getPlaceReviews);

router.post("/place/:placeId", authMiddleware, createReview);

router.put("/:reviewId", authMiddleware, updateReview);

router.delete("/:reviewId", authMiddleware, deleteReview);

module.exports = router;
