
const mongoose = require("mongoose");

const travelPhotoSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        image: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: ""
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const TravelPhoto = mongoose.model("TravelPhoto", travelPhotoSchema);

module.exports = TravelPhoto;
