
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    }
  },
  {
    timestamps: true
  }
);

reviewSchema.index({ user: 1, place: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
