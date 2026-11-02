
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Adventure",
        "Culture",
        "Nature",
        "Food",
        "History",
        "Entertainment",
        "Relaxation",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    whatToExpect: {
      type: [String],
      required: true,
    },

    highlights: {
      type: [String],
      required: true,
    },

    bestTimeToVisit: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
