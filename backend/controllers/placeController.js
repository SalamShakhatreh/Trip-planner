const mongoose = require("mongoose");
const Place = require("../models/Place");
const Destination = require("../models/Destination");

const getPlaces = async (req, res) => {
    try {
        const {
            search,
            destination,
            page = 1,
            limit = 10
        } = req.query;

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
            filter.name = {
                $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                $options: "i"
            };
        }

        if (destination) {
            if (!mongoose.isObjectIdOrHexString(destination)) {
                return res.status(400).json({
                    message: "Invalid destination ID"
                });
            }

            filter.destination = destination;
        }

        const pageLimitSafe = Math.min(100, pageLimit);
        const skip = (currentPage - 1) * pageLimitSafe;

        const places = await Place.find(filter)
            .populate("destination")
            .skip(skip)
            .limit(pageLimitSafe);

        const total = await Place.countDocuments(filter);

        return res.status(200).json({
            places,
            currentPage,
            totalPages: Math.ceil(total / pageLimitSafe),
            totalPlaces: total
        });

    } catch (error) {
        console.error("Get places error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getPlaceById = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({
                message: "Invalid place ID"
            });
        }

        const place = await Place.findById(req.params.id)
            .populate("destination");

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        return res.status(200).json(place);

    } catch (error) {
        console.error("Get place error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createPlace = async (req, res) => {
    try {
        const { name, description, image, destination } = req.body;

        if (
            typeof name !== "string" ||
            typeof description !== "string" ||
            typeof image !== "string" ||
            !name.trim() ||
            !description.trim() ||
            !image.trim() ||
            !destination
        ) {
            return res.status(400).json({
                message: "Name, description, image, and destination are required"
            });
        }

        if (!mongoose.isObjectIdOrHexString(destination)) {
            return res.status(400).json({
                message: "Invalid destination ID"
            });
        }

        const existingDestination = await Destination.findById(destination);

        if (!existingDestination) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        const newPlace = new Place({
            name: name.trim(),
            description: description.trim(),
            image: image.trim(),
            destination
        });

        await newPlace.save();

        return res.status(201).json(newPlace);

    } catch (error) {
        console.error("Create place error:", error);

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid place data"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updatePlace = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: "Invalid place ID"
            });
        }

        const allowedFields = ["name", "description", "image", "destination"];
        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        for (const field of ["name", "description", "image"]) {
            if (updates[field] !== undefined) {
                if (
                    typeof updates[field] !== "string" ||
                    !updates[field].trim()
                ) {
                    return res.status(400).json({
                        message: `${field} must be a non-empty string`
                    });
                }

                updates[field] = updates[field].trim();
            }
        }

        if (updates.destination !== undefined) {
            if (!mongoose.isObjectIdOrHexString(updates.destination)) {
                return res.status(400).json({
                    message: "Invalid destination ID"
                });
            }

            const existingDestination = await Destination.findById(
                updates.destination
            );

            if (!existingDestination) {
                return res.status(404).json({
                    message: "Destination not found"
                });
            }
        }

        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).populate("destination");

        if (!updatedPlace) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        return res.status(200).json(updatedPlace);

    } catch (error) {
        console.error("Update place error:", error);

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid place data"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deletePlace = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({
                message: "Invalid place ID"
            });
        }

        const deletedPlace = await Place.findByIdAndDelete(req.params.id);

        if (!deletedPlace) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        return res.status(200).json({
            message: "Place deleted successfully"
        });

    } catch (error) {
        console.error("Delete place error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getPlaces,
    createPlace,
    getPlaceById,
    updatePlace,
    deletePlace
};