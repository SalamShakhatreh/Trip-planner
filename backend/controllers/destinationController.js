const Destination = require("../models/Destination");
const Country = require("../models/Country");

const getDestination = async (req, res) => {
    try {
        const { search, country, page = 1, limit = 10 } = req.query;
        const filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (country) {
            filter.country = { $regex: country, $options: "i" };
        }

        const currentPage = Math.max(1, Number(page));
        const pageLimit = Math.max(1, Math.min(100, Number(limit)));
        const skip = (currentPage - 1) * pageLimit;

        const destinations = await Destination.find(filter)
            .populate("country")
            .skip(skip)
            .limit(pageLimit);

        const total = await Destination.countDocuments(filter);

        res.status(200).json({
            destinations,
            currentPage,
            totalPages: Math.ceil(total / pageLimit),
            totalDestinations: total
        });
    } catch (error) {
       return res.status(500).json({
    message: "Internal server error"
});
    }
};

const createDestination = async (req, res) => {
    try {
        const { name, country, description, image } = req.body;

        if (!name || !country || !description || !image) {
            return res.status(400).json({
                message: "Name, country, description, and image are required"
            });
        }

        const countryDoc = await Country.findById(country);

        if (!countryDoc) {
            return res.status(404).json({
                message: "Country not found"
            });
        }

        const newDestination = new Destination({
            name,
            country: countryDoc._id,
            description,
            image
        });

        await newDestination.save();

        await newDestination.populate("country");

        res.status(201).json(newDestination);
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid destination data"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getDestinationById = async (req, res) => {
    try {
        const dest = await Destination.findById(req.params.id)
            .populate("country");

        if (!dest) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json(dest);
    } catch (error) {
        return res.status(500).json({
    message: "Internal server error"
});
    }
};

const updateDestination = async (req, res) => {
    try {
        const { name, country, description, image } = req.body;
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (image !== undefined) updateData.image = image;

        if (country !== undefined) {
            const countryDoc = await Country.findById(country);

            if (!countryDoc) {
                return res.status(404).json({
                    message: "Country not found"
                });
            }

            updateData.country = countryDoc._id;
        }

        const updatedDest = await Destination.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate("country");

        if (!updatedDest) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json(updatedDest);
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid destination data"
            });
        }

        return res.status(500).json({
    message: "Internal server error"
});
    }
};
const deleteDestination = async (req, res) => {
    try {
        const deletedDest = await Destination.findByIdAndDelete(req.params.id);

        if (!deletedDest) {
            return res.status(404).json({ message: "Destination not found" });
        }

        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        return res.status(500).json({
    message: "Internal server error"
});
    }
};



module.exports={getDestination,createDestination, getDestinationById,updateDestination,deleteDestination};