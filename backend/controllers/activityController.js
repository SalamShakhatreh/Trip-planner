
const Activity = require("../models/Activity");
const Country = require("../models/Country");

const getActivitiesByCountry = async (req, res) => {
  try {
    const { country } = req.query;

    if (!country) {
      return res.status(400).json({
        message: "Country name is required",
      });
    }

    const countryData = await Country.findOne({
      name: { $regex: `^${country}$`, $options: "i" },
    });

    if (!countryData) {
      return res.status(404).json({
        message: "Country not found",
      });
    }

    const activities = await Activity.find({
      country: countryData._id,
    });

    return res.status(200).json({
      count: activities.length,
      activities,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};

module.exports = {
  getActivitiesByCountry,
};
