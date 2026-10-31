const Country = require("../models/Country");

const getCountries = async (req, res) => {
    try {
        const countries = await Country.find();

        return res.status(200).json({
            countries
        });
    } catch (error) {
        console.error("Get countries error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const createCountry = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        if (
            typeof name !== "string" ||
            typeof description !== "string" ||
            typeof image !== "string" ||
            !name.trim() ||
            !description.trim() ||
            !image.trim()
        ) {
            return res.status(400).json({
                message: "Name, description, and image are required"
            });
        }

        const newCountry = new Country({
            name: name.trim(),
            description: description.trim(),
            image: image.trim()
        });

        await newCountry.save();

        return res.status(201).json({
            message: "Country created successfully",
            country: newCountry
        });

    } catch (error) {
        console.error("Create country error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "Country already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid country data"
            });
        }

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    getCountries,
    createCountry
};