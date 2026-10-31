const mongoose = require("mongoose");
const Destination = require("../models/Destination");
const Country = require("../models/Country");
const Place = require("../models/Place");
const Trip = require("../models/Trip");

const getDestination = async (req, res) => {
    try {
        const { search, country, page = 1, limit = 10 } = req.query;

        const currentPage = Number(page);
        const pageLimit = Number(limit);

        if (
            !Number.isInteger(currentPage) ||
            currentPage < 1 ||
            !Number.isInteger(pageLimit) ||
            pageLimit < 1
        ) {
            return res.status(400).json({
                message: "Page and limit must be positive integers"
            });
        }

        const filter = {};

        if (search && search.trim()) {
            const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.name = { $regex: escapedSearch, $options: "i" };
        }

        if (country && country.trim()) {
            const escapedCountry = country.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const countryDoc = await Country.findOne({
                name: { $regex: escapedCountry, $options: "i" }
            });

            if (!countryDoc) {
                return res.status(200).json({
                    destinations: [],
                    currentPage,
                    totalPages: 0,
                    totalDestinations: 0
                });
            }

            filter.country = countryDoc._id;
        }

        const pageLimitSafe = Math.min(100, pageLimit);
        const skip = (currentPage - 1) * pageLimitSafe;

        const destinations = await Destination.find(filter)
            .populate("country")
            .skip(skip)
            .limit(pageLimitSafe);

        const total = await Destination.countDocuments(filter);

        return res.status(200).json({
            destinations,
            currentPage,
            totalPages: Math.ceil(total / pageLimitSafe),
            totalDestinations: total
        });

    } catch (error) {
        console.error("Get destinations error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createDestination = async (req, res) => {
    try {
        const { name, country, description, image } = req.body;

        if (
            typeof name !== "string" ||
            typeof description !== "string" ||
            typeof image !== "string" ||
            !name.trim() ||
            !description.trim() ||
            !image.trim() ||
            !country
        ) {
            return res.status(400).json({
                message: "Name, country, description, and image are required"
            });
        }

        if (!mongoose.isObjectIdOrHexString(country)) {
            return res.status(400).json({
                message: "Invalid country ID"
            });
        }

        const countryDoc = await Country.findById(country);

        if (!countryDoc) {
            return res.status(404).json({
                message: "Country not found"
            });
        }

        const newDestination = new Destination({
            name: name.trim(),
            country: countryDoc._id,
            description: description.trim(),
            image: image.trim()
        });

        await newDestination.save();
        await newDestination.populate("country");

        return res.status(201).json(newDestination);

    } catch (error) {
        console.error("Create destination error:", error);

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
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({
                message: "Invalid destination ID"
            });
        }

        const destination = await Destination.findById(req.params.id)
            .populate("country");

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        return res.status(200).json(destination);

    } catch (error) {
        console.error("Get destination error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: "Invalid destination ID"
            });
        }

        const allowedFields = ["name", "country", "description", "image"];
        const updateData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        for (const field of ["name", "description", "image"]) {
            if (updateData[field] !== undefined) {
                if (
                    typeof updateData[field] !== "string" ||
                    !updateData[field].trim()
                ) {
                    return res.status(400).json({
                        message: `${field} must be a non-empty string`
                    });
                }

                updateData[field] = updateData[field].trim();
            }
        }

        if (updateData.country !== undefined) {
            if (!mongoose.isObjectIdOrHexString(updateData.country)) {
                return res.status(400).json({
                    message: "Invalid country ID"
                });
            }

            const countryDoc = await Country.findById(updateData.country);

            if (!countryDoc) {
                return res.status(404).json({
                    message: "Country not found"
                });
            }

            updateData.country = countryDoc._id;
        }

        const updatedDestination = await Destination.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate("country");

        if (!updatedDestination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        return res.status(200).json(updatedDestination);

    } catch (error) {
        console.error("Update destination error:", error);

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
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: "Invalid destination ID"
            });
        }

        const destination = await Destination.findById(id);

        if (!destination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        const [placesCount, tripsCount] = await Promise.all([
            Place.countDocuments({ destination: id }),
            Trip.countDocuments({ destination: id })
        ]);

        if (placesCount > 0 || tripsCount > 0) {
            return res.status(409).json({
                message: "Cannot delete a destination that is used by places or trips"
            });
        }

        await Destination.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Destination deleted successfully"
        });

    } catch (error) {
        console.error("Delete destination error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getDestination,
    createDestination,
    getDestinationById,
    updateDestination,
    deleteDestination
};