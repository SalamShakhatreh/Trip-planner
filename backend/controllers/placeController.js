
const Place=require("../models/Place")

const getPlaces = async (req, res) => {
    try {
        const {
            search,
            destination,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (destination) {
            filter.destination = destination;
        }

        const currentPage = Math.max(1, Number(page));
        const pageLimit = Math.max(1, Math.min(100, Number(limit)));
        const skip = (currentPage - 1) * pageLimit;

        const places = await Place.find(filter)
            .populate("destination")
            .skip(skip)
            .limit(pageLimit);

        const total = await Place.countDocuments(filter);

        res.status(200).json({
            places,
            currentPage,
            totalPages: Math.ceil(total / pageLimit),
            totalPlaces: total
        });
    } catch (error) {
        return res.status(500).json({
    message: "Internal server error"
});
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
        return res.status(500).json({
    message: "Internal server error"
});
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
       return res.status(500).json({
    message: "Internal server error"
});
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
       return res.status(500).json({
    message: "Internal server error"
});
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
        return res.status(500).json({
    message: "Internal server error"
});
    }
};

module.exports={getPlaces, createPlace,getPlaceById,updatePlace,deletePlace};