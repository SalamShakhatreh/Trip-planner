const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
         trim: true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true
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
    }
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;