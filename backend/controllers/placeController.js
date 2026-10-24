const { model } = require("mongoose");
const Place=require("../models/Place")
const getPlaces = async (req, res) => {
    try {
        const places = await Place.find().populate("destination");
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPlace = async (req, res) => {
    try {
        const newPlace = await Place.create(req.body);
        res.status(201).json(newPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={getPlaces, createPlace};