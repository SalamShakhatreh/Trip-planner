
const Trip = require("../models/Trip");
const Destination = require("../models/Destination");
const mongoose = require("mongoose");

const createTrip = async (req, res) => {
    try {
        const {
            destination,
            title,
            startDate,
            duration,
            budget,
            currency,
            budgetType,
            numberOfPeople
        } = req.body;

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

        const newTrip = new Trip({
            user: req.user.id,
            destination,
            title,
            startDate,
            duration,
            budget,
            currency,
            budgetType,
            numberOfPeople
        });

        await newTrip.save();

        res.status(201).json({
            message: "Trip created successfully",
            trip: newTrip
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};


const getMyTrips = async (req, res) => {
    try {
        const {
            search,
            status,
            destination,
            page = 1,
            limit = 5
        } = req.query;

        const filter = {
            user: req.user.id
        };

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        if (status) {
            filter.status = status;
        }

        if (destination) {
            filter.destination = destination;
        }

        const parsedPage = Number(page);
        const parsedLimit = Number(limit);

        if (
            !Number.isInteger(parsedPage) ||
            parsedPage < 1 ||
            !Number.isInteger(parsedLimit) ||
            parsedLimit < 1
        ) {
            return res.status(400).json({
                message: "Page and limit must be positive integers"
            });
        }

        const currentPage = parsedPage;
        const pageLimit = Math.min(100, parsedLimit);
        const skip = (currentPage - 1) * pageLimit;

        const trips = await Trip.find(filter)
            .populate("destination")
            .skip(skip)
            .limit(pageLimit);

        const total = await Trip.countDocuments(filter);

        res.status(200).json({
            trips,
            currentPage,
            totalPages: Math.ceil(total / pageLimit),
            totalTrips: total
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getTripById = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({
                message: "Invalid trip ID"
            });
        }

        const trip = await Trip.findOne({
            _id: req.params.id,
            user: req.user.id
        }).populate("destination");

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json({ trip });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateTrip = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
            return res.status(400).json({
                message: "Invalid trip ID"
            });
        }

        if (req.body.destination !== undefined) {
            if (!mongoose.isObjectIdOrHexString(req.body.destination)) {
                return res.status(400).json({
                    message: "Invalid destination ID"
                });
            }

            const existingDestination = await Destination.findById(
                req.body.destination
            );

            if (!existingDestination) {
                return res.status(404).json({
                    message: "Destination not found"
                });
            }
        }

        const allowedFields = [
            "destination",
            "title",
            "startDate",
            "duration",
            "budget",
            "budgetType",
            "currency",
            "numberOfPeople",
            "status"
        ];

        const updates = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });

        const trip = await Trip.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updates,
            { new: true, runValidators: true }
        ).populate("destination");

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json({
            message: "Trip updated successfully",
            trip
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};


const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate("user", "name email")
            .populate("destination");

        res.status(200).json({
            trips
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching all trips",
            error: error.message
        });
    }
};


const deleteTrip = async (req, res) => {
    try {
        if (!mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({
        message: "Invalid trip ID"
    });
}
        const trip = await Trip.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json({
            message: "Trip deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createTrip,
    getMyTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    getAllTrips
};
