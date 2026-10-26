const Trip = require("../models/Trip");

const createTrip = async (req, res) => {
    try {
        const {
            destination,
            title,
            startDate,
            duration,
            budget,
            budgetType,
            numberOfPeople
        } = req.body;

        const newTrip = new Trip({
            user: req.user.id,
            destination,
            title,
            startDate,
            duration,
            budget,
            budgetType,
            numberOfPeople
        });

        await newTrip.save();

        res.status(201).json({
            message: "Trip created successfully",
            trip: newTrip
        });
    } catch (error) {
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

        const currentPage = Math.max(1, Number(page));
        const pageLimit = Math.max(1, Math.min(100, Number(limit)));
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
        const trip = await Trip.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
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
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteTrip = async (req, res) => {
    try {
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


module.exports = { createTrip,getMyTrips,getTripById,updateTrip,deleteTrip };