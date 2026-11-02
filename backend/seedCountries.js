require("dotenv").config();

const mongoose = require("mongoose");
const Country = require("./models/Country");
const Destination = require("./models/Destination");

const countries = [
  {
    name: "Jordan",
    description: "Discover Petra, the Dead Sea, Wadi Rum, and rich history.",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "United Arab Emirates",
    description: "Discover modern skylines, desert adventures, and luxury experiences.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Egypt",
    description: "Explore ancient pyramids, temples, and the Nile River.",
    image: "https://images.unsplash.com/photo-1771142901371-b226c0c527d3?auto=format&fit=crop&fm=jpg&q=85&w=1200"
  },
  {
    name: "Turkey",
    description: "Explore historic landmarks, colorful bazaars, and coastal destinations.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Morocco",
    description: "Discover colorful markets, desert landscapes, and historic cities.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Italy",
    description: "Experience historic cities, delicious food, and beautiful coastlines.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "France",
    description: "Discover iconic landmarks, charming towns, and French culture.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Switzerland",
    description: "Explore the Alps, peaceful lakes, and charming mountain villages.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Spain",
    description: "Experience lively cities, historic architecture, and sunny beaches.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Greece",
    description: "Discover beautiful islands, ancient ruins, and Mediterranean beaches.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85"
  }
];

const seedCountries = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    const allowedCountryNames = countries.map(country => country.name);

    // Find countries that are not in the approved list.
    const excludedCountries = await Country.find({
      name: { $nin: allowedCountryNames }
    });

    const excludedCountryIds = excludedCountries.map(country => country._id);

    // Delete destinations belonging to excluded countries.
    if (excludedCountryIds.length > 0) {
      await Destination.deleteMany({
        country: { $in: excludedCountryIds }
      });
    }

    // Delete countries that are not in the approved list.
    await Country.deleteMany({
      name: { $nin: allowedCountryNames }
    });

    // Add or update the approved countries.
    for (const country of countries) {
      await Country.updateOne(
        { name: country.name },
        { $set: country },
        { upsert: true }
      );
    }

    console.log("Countries seeded successfully");
    console.log("Only the approved countries remain in the database.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

seedCountries();