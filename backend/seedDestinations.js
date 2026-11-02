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
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Petra",
    country: "Jordan",
    description: "World-famous ancient city carved into rose-red cliffs.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Aqaba",
    country: "Jordan",
    description: "Red Sea resort city with beaches and diving.",
    image: "https://images.unsplash.com/photo-1601581875034-4b6b0f0b0b0b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Salt",
    country: "Jordan",
    description: "Historic town with traditional architecture.",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Jerash",
    country: "Jordan",
    description: "Well-preserved Roman city with colonnaded streets.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=85"
  },

  // United Arab Emirates
  {
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Futuristic city of skyscrapers and luxury.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    description: "Capital known for the Sheikh Zayed Grand Mosque.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Sharjah",
    country: "United Arab Emirates",
    description: "Cultural emirate with museums and heritage areas.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Al Ain",
    country: "United Arab Emirates",
    description: "Garden city with oases and archaeological sites.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85"
  },

  // Egypt
  {
    name: "Cairo",
    country: "Egypt",
    description: "Bustling capital home to the Pyramids of Giza.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Alexandria",
    country: "Egypt",
    description: "Mediterranean city with Greco-Roman history.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Sharm El Sheikh",
    country: "Egypt",
    description: "Red Sea resort famous for diving and beaches.",
    image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Luxor",
    country: "Egypt",
    description: "Open-air museum of ancient temples and the Valley of the Kings.",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85"
  },

  // Turkey
  {
    name: "Antalya",
    country: "Turkey",
    description: "Mediterranean resort city with beaches and old town.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Bursa",
    country: "Turkey",
    description: "Historic city at the foot of Mount Uludağ.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Trabzon",
    country: "Turkey",
    description: "Black Sea city with mountains and Sumela Monastery.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Istanbul",
    country: "Turkey",
    description: "City spanning two continents with historic mosques.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Cappadocia",
    country: "Turkey",
    description: "Unique landscape of fairy chimneys and hot-air balloons.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85"
  },

  // Morocco
  {
    name: "Marrakech",
    country: "Morocco",
    description: "Vibrant city of souks and Jemaa el-Fnaa.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Casablanca",
    country: "Morocco",
    description: "Modern economic capital with the Hassan II Mosque.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Chefchaouen",
    country: "Morocco",
    description: "Famous blue-painted mountain town.",
    image: "https://images.unsplash.com/photo-1539020140153-e4951137da68?auto=format&fit=crop&w=1200&q=85"
  },

  // Italy
  {
    name: "Rome",
    country: "Italy",
    description: "Eternal city with the Colosseum and ancient ruins.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Venice",
    country: "Italy",
    description: "City of canals, gondolas, and historic squares.",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Florence",
    country: "Italy",
    description: "Renaissance city of the Duomo and art.",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Milan",
    country: "Italy",
    description: "Fashion capital with the Duomo.",
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Naples",
    country: "Italy",
    description: "Vibrant southern city near Pompeii and the Amalfi Coast.",
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=85"
  },

  // France
  {
    name: "Paris",
    country: "France",
    description: "City of Light with the Eiffel Tower and Louvre.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Nice",
    country: "France",
    description: "Sunny Riviera city with the Promenade des Anglais.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Lyon",
    country: "France",
    description: "Gastronomic capital with historic architecture.",
    image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Marseille",
    country: "France",
    description: "Port city with Mediterranean charm.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Bordeaux",
    country: "France",
    description: "Elegant wine capital.",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=85"
  },

  // Switzerland
  {
    name: "Zurich",
    country: "Switzerland",
    description: "Cosmopolitan city on Lake Zurich.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Geneva",
    country: "Switzerland",
    description: "International city on Lake Geneva.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Lucerne",
    country: "Switzerland",
    description: "Lakeside city famous for the Chapel Bridge.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Interlaken",
    country: "Switzerland",
    description: "Adventure town between two lakes.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Bern",
    country: "Switzerland",
    description: "UNESCO medieval capital.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=85"
  },

  // Spain
  {
    name: "Madrid",
    country: "Spain",
    description: "Dynamic capital with world-class museums.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Seville",
    country: "Spain",
    description: "Andalusian gem with the Alcázar.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Granada",
    country: "Spain",
    description: "Home to the Alhambra palace.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85"
  },

  // Greece
  {
    name: "Athens",
    country: "Greece",
    description: "Ancient capital home to the Acropolis.",
    image: "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Santorini",
    country: "Greece",
    description: "Iconic white-washed villages on volcanic cliffs.",
    image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Thessaloniki",
    country: "Greece",
    description: "Cultural capital with Byzantine churches.",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Crete",
    country: "Greece",
    description: "Largest Greek island with mountains and beaches.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85"
  }
];

const seedDestinations = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    for (const dest of destinations) {
      const country = await Country.findOne({ name: dest.country });

      if (!country) {
        console.log(`Country not found: ${dest.country}`);
        continue;
      }

      await Destination.updateOne(
        { name: dest.name, country: country._id },
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

      console.log(`OK  ${dest.country} - ${dest.name}`);
    }

    console.log("Destinations seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

seedDestinations();