const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    budget: {
        type: Number,
        required: true,
        min: 0
    },

    currency: {
    type: String,
    enum: ["JOD", "USD", "EUR"],
    default: "JOD",
    required: true
},


    budgetType: {
        type: String,
        enum: ["perPerson", "group"],
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ["planned", "ongoing", "completed"],
        default: "planned"
    }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;