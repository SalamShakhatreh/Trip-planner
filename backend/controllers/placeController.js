
const Place=require("../models/Place")
const getPlaces = async (req, res) => {
    try {
        const places = await Place.find().populate("destination");
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate("destination");

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createPlace = async (req, res) => {
    try {
        const { name, description, image, destination } = req.body;

        const newPlace = new Place({
            name,
            description,
            image,
            destination
        });

        await newPlace.save();

        res.status(201).json(newPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true } 
        ).populate("destination");

        if (!updatedPlace) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json(updatedPlace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePlace = async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id);

        if (!deletedPlace) {
            return res.status(404).json({ message: "Place not found" });
        }

        res.status(200).json({ message: "Place deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={getPlaces, createPlace,getPlaceById,updatePlace,deletePlace};