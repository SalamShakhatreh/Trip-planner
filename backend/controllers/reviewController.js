
const mongoose = require("mongoose");
const Review = require("../models/Review");
const Place = require("../models/Place");

const getPlaceReviews = async (req, res) => {
  try {
    const { placeId } = req.params;

    if (!mongoose.isObjectIdOrHexString(placeId)) {
      return res.status(400).json({ message: "Invalid place ID" });
    }

    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const reviews = await Review.find({ place: placeId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      reviews,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error("Get reviews error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const reviews = await Review.find({ user: userId })
      .populate({
        path: "place",
        select: "name image destination",
        populate: {
          path: "destination",
          select: "name"
        }
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      reviews,
      totalReviews: reviews.length
    });
  } catch (error) {
    console.error("Get my reviews error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { placeId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.isObjectIdOrHexString(placeId)) {
      return res.status(400).json({ message: "Invalid place ID" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be an integer between 1 and 5"
      });
    }

    if (typeof comment !== "string" || !comment.trim()) {
      return res.status(400).json({
        message: "Comment is required"
      });
    }

    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    const existingReview = await Review.findOne({
      user: userId,
      place: placeId
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this place. You can update your review."
      });
    }

    const review = await Review.create({
      user: userId,
      place: placeId,
      rating,
      comment: comment.trim()
    });

    await review.populate("user", "name profileImage");

    return res.status(201).json({
      message: "Review added successfully",
      review
    });
  } catch (error) {
    console.error("Create review error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already reviewed this place"
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.isObjectIdOrHexString(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be an integer between 1 and 5"
      });
    }

    if (typeof comment !== "string" || !comment.trim()) {
      return res.status(400).json({
        message: "Comment is required"
      });
    }

    const review = await Review.findOne({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not authorized to update it"
      });
    }

    review.rating = rating;
    review.comment = comment.trim();

    await review.save();
    await review.populate("user", "name profileImage");

    return res.status(200).json({
      message: "Review updated successfully",
      review
    });
  } catch (error) {
    console.error("Update review error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { reviewId } = req.params;

    if (!mongoose.isObjectIdOrHexString(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you are not authorized to delete it"
      });
    }

    return res.status(200).json({
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error("Delete review error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPlaceReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
};
