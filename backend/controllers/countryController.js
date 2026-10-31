const Country = require("../models/Country");

const getCountries = async (req, res) => {
    try {
        const countries = await Country.find();

        res.status(200).json({
            countries
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createCountry = async (req, res) => {
    try {
        const { name, description, image } = req.body;

        const newCountry = new Country({
            name,
            description,
            image
        });

        await newCountry.save();

        res.status(201).json({
            message: "Country created successfully",
            country: newCountry
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Country already exists"
            });
        }

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

module.exports = {
    getCountries,
    createCountry
};