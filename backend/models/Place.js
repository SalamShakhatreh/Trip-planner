const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    }
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;