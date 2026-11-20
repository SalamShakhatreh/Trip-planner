
require("dotenv").config();

const mongoose = require("mongoose");
const Country = require("./models/Country");
const Destination = require("./models/Destination");

const destinations = [
  // Jordan
  {
    name: "Amman",
    country: "Jordan",
    description: "Modern capital with ancient citadel and Roman theater.",
    image: "/photos/Amman.jpg"
  },
  {
    name: "Petra",
    country: "Jordan",
    description: "World-famous ancient city carved into rose-red cliffs.",
    image: "/photos/Petra.jpg"
  },
  {
    name: "Aqaba",
    country: "Jordan",
    description: "Red Sea resort city with beaches and diving.",
    image: "/photos/Aqaba.jpg"
  },
  {
    name: "Salt",
    country: "Jordan",
    description: "Historic town with traditional architecture.",
    image: "/photos/Salt.jpg"
  },
  {
    name: "Jerash",
    country: "Jordan",
    description: "Well-preserved Roman city with colonnaded streets.",
    image: "/photos/Jerash.jpg"
  },

  // United Arab Emirates
  {
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Futuristic city of skyscrapers and luxury.",
    image: "/photos/Dubai.jpg"
  },
  {
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    description: "Capital known for the Sheikh Zayed Grand Mosque.",
    image: "/photos/Abu Dhabi.jpg"
  },
  {
    name: "Sharjah",
    country: "United Arab Emirates",
    description: "Cultural emirate with museums and heritage areas.",
    image: "/photos/Sharqa.jpg"
  },
  {
    name: "Al Ain",
    country: "United Arab Emirates",
    description: "Garden city with oases and archaeological sites.",
    image: "/photos/Al Ain.jpg"
  },

  // Egypt
  {
    name: "Cairo",
    country: "Egypt",
    description: "Bustling capital home to the Pyramids of Giza.",
    image: "/photos/Cairo.jpg"
  },
  {
    name: "Alexandria",
    country: "Egypt",
    description: "Mediterranean city with Greco-Roman history.",
    image: "/photos/Alexandria.jpg"
  },
  {
    name: "Sharm El Sheikh",
    country: "Egypt",
    description: "Red Sea resort famous for diving and beaches.",
    image: "/photos/Sharm El Sheikh.jpg"
  },
  {
    name: "Luxor",
    country: "Egypt",
    description: "Open-air museum of ancient temples and the Valley of the Kings.",
    image: "/photos/Luxor.jpg"
  },

  // Turkey
  {
    name: "Antalya",
    country: "Turkey",
    description: "Mediterranean resort city with beaches and old town.",
    image: "/photos/Antalya.jpg"
  },
  {
    name: "Bursa",
    country: "Turkey",
    description: "Historic city at the foot of Mount Uludağ.",
    image: "/photos/Bursa.jpg"
  },
  {
    name: "Trabzon",
    country: "Turkey",
    description: "Black Sea city with mountains and Sumela Monastery.",
    image: "/photos/Trabzon.jpg"
  },
  {
    name: "Istanbul",
    country: "Turkey",
    description: "City spanning two continents with historic mosques.",
    image: "/photos/Istanbul.jpg"
  },
  {
    name: "Cappadocia",
    country: "Turkey",
    description: "Unique landscape of fairy chimneys and hot-air balloons.",
    image: "/photos/Cappadocia.jpg"
  },

  // Morocco
  {
    name: "Marrakech",
    country: "Morocco",
    description: "Vibrant city of souks and Jemaa el-Fnaa.",
    image: "/photos/Marrakech.jpg"
  },
  {
    name: "Casablanca",
    country: "Morocco",
    description: "Modern economic capital with the Hassan II Mosque.",
    image: "/photos/Casablanca.jpg"
  },
  {
    name: "Chefchaouen",
    country: "Morocco",
    description: "Famous blue-painted mountain town.",
    image: "/photos/Chefchaouen.jpg"
  },

  // Italy
  {
    name: "Rome",
    country: "Italy",
    description: "Eternal city with the Colosseum and ancient ruins.",
    image: "/photos/Rome.jpg"
  },
  {
    name: "Venice",
    country: "Italy",
    description: "City of canals, gondolas, and historic squares.",
    image: "/photos/Venice.jpg"
  },
  {
    name: "Florence",
    country: "Italy",
    description: "Renaissance city of the Duomo and art.",
    image: "/photos/Florence.jpg"
  },
  {
    name: "Milan",
    country: "Italy",
    description: "Fashion capital with the Duomo.",
    image: "/photos/Milan.jpg"
  },
  {
    name: "Naples",
    country: "Italy",
    description: "Vibrant southern city near Pompeii and the Amalfi Coast.",
    image: "/photos/Naples.jpg"
  },

  // France
  {
    name: "Paris",
    country: "France",
    description: "City of Light with the Eiffel Tower and Louvre.",
    image: "/photos/Paris.jpg"
  },
  {
    name: "Nice",
    country: "France",
    description: "Sunny Riviera city with the Promenade des Anglais.",
    image: "/photos/Nice.jpg"
  },
  {
    name: "Lyon",
    country: "France",
    description: "Gastronomic capital with historic architecture.",
    image: "/photos/Lyon.jpg"
  },
  {
    name: "Marseille",
    country: "France",
    description: "Port city with Mediterranean charm.",
    image: "/photos/Marseille.jpg"
  },
  {
    name: "Bordeaux",
    country: "France",
    description: "Elegant wine capital.",
    image: "/photos/Bordeaux.jpg"
  },

  // Switzerland
  {
    name: "Zurich",
    country: "Switzerland",
    description: "Cosmopolitan city on Lake Zurich.",
    image: "/photos/Zurich.jpg"
  },
  {
    name: "Geneva",
    country: "Switzerland",
    description: "International city on Lake Geneva.",
    image: "/photos/Geneva.jpg"
  },
  {
    name: "Lucerne",
    country: "Switzerland",
    description: "Lakeside city famous for the Chapel Bridge.",
    image: "/photos/Lucerne.jpg"
  },
  {
    name: "Interlaken",
    country: "Switzerland",
    description: "Adventure town between two lakes.",
    image: "/photos/Interlaken.jpg"
  },
  {
    name: "Bern",
    country: "Switzerland",
    description: "UNESCO medieval capital.",
    image: "/photos/Bern.jpg"
  },

  // Spain
  {
    name: "Madrid",
    country: "Spain",
    description: "Dynamic capital with world-class museums.",
    image: "/photos/Madrid.jpg"
  },
  {
    name: "Seville",
    country: "Spain",
    description: "Andalusian gem with the Alcázar.",
    image: "/photos/Seville.jpg"
  },
  {
    name: "Granada",
    country: "Spain",
    description: "Home to the Alhambra palace.",
    image: "/photos/Granada.jpg"
  },

  // Greece
  {
    name: "Athens",
    country: "Greece",
    description: "Ancient capital home to the Acropolis.",
    image: "/photos/Athens.jpg"
  },
  {
    name: "Santorini",
    country: "Greece",
    description: "Iconic white-washed villages on volcanic cliffs.",
    image: "/photos/Santorini.jpg"
  },
  {
    name: "Thessaloniki",
    country: "Greece",
    description: "Cultural capital with Byzantine churches.",
    image: "/photos/Thessaloniki.jpg"
  },
  {
    name: "Crete",
    country: "Greece",
    description: "Largest Greek island with mountains and beaches.",
    image: "/photos/Crete.jpg"
  }
];

const seedDestinations = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected.");

    const countryNames = [
      ...new Set(destinations.map(dest => dest.country))
    ];

    let totalDeleted = 0;

    for (const countryName of countryNames) {
      const country = await Country.findOne({ name: countryName });

      if (!country) {
        console.log(`Country not found: ${countryName}`);
        continue;
      }

      const countryDestinations = destinations.filter(
        dest => dest.country === countryName
      );

      const allowedNames = countryDestinations.map(
        dest => dest.name
      );

      for (const dest of countryDestinations) {
        await Destination.updateOne(
          {
            name: dest.name,
            country: country._id
          },
          {
            $set: {
              name: dest.name,
              country: country._id,
              description: dest.description,
              image: dest.image
            }
          },
          { upsert: true }
        );

        console.log(`Updated: ${countryName} - ${dest.name}`);
      }

      const result = await Destination.deleteMany({
        country: country._id,
        name: { $nin: allowedNames }
      });

      totalDeleted += result.deletedCount;

      console.log(
        `${countryName}: ${result.deletedCount} extra destinations deleted.`
      );
    }

    const finalCount = await Destination.countDocuments({
      country: {
        $in: await Country.find({
          name: { $in: countryNames }
        }).distinct("_id")
      }
    });

    console.log("\nDestinations cleanup completed.");
    console.log(`Expected destinations: ${destinations.length}`);
    console.log(`Extra destinations deleted: ${totalDeleted}`);
    console.log(`Final destinations count: ${finalCount}`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected.");
    }
  }
};

seedDestinations();
