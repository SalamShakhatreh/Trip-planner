
require("dotenv").config();

const mongoose = require("mongoose");
const Country = require("./models/Country");

const countries = [
  {
    name: "Greece",
    description: "Discover beautiful islands, ancient ruins, and Mediterranean beaches.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Switzerland",
    description: "Explore the Alps, peaceful lakes, and charming mountain villages.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85"
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
    name: "Japan",
    description: "Explore traditional temples, modern cities, and beautiful nature.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Indonesia",
    description: "Discover tropical islands, lush landscapes, and cultural experiences.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Thailand",
    description: "Enjoy tropical beaches, vibrant markets, and beautiful temples.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Spain",
    description: "Experience lively cities, historic architecture, and sunny beaches.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Turkey",
    description: "Explore historic landmarks, colorful bazaars, and coastal destinations.",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "United Arab Emirates",
    description: "Discover modern skylines, desert adventures, and luxury experiences.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85"
  },
  {
  name: "Jordan",
  description: "Discover Petra, the Dead Sea, Wadi Rum, and rich history.",
  image: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?auto=format&fit=crop&w=1200&q=85"
},
  {
    name: "United Kingdom",
    description: "Explore historic castles, famous landmarks, and vibrant cities.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Portugal",
    description: "Discover colorful streets, coastal towns, and beautiful beaches.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Germany",
    description: "Explore historic towns, castles, and modern city life.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Netherlands",
    description: "Enjoy canals, windmills, flower fields, and charming cities.",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Austria",
    description: "Discover alpine scenery, historic palaces, and beautiful villages.",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Norway",
    description: "Explore dramatic fjords, mountains, and scenic coastal villages.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Sweden",
    description: "Discover peaceful forests, lakes, and Scandinavian cities.",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Finland",
    description: "Experience beautiful lakes, forests, and northern lights.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Iceland",
    description: "Explore waterfalls, glaciers, volcanoes, and dramatic landscapes.",
    image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Croatia",
    description: "Discover historic coastal towns and beautiful Adriatic beaches.",
    image: "https://images.unsplash.com/photo-1555990793-da11153b2473?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Egypt",
    description: "Explore ancient pyramids, temples, and the Nile River.",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Morocco",
    description: "Discover colorful markets, desert landscapes, and historic cities.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "South Africa",
    description: "Experience wildlife safaris, mountains, and beautiful coastlines.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "United States",
    description: "Explore famous cities, national parks, and diverse landscapes.",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Canada",
    description: "Discover mountain scenery, lakes, forests, and vibrant cities.",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56cd938?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Mexico",
    description: "Enjoy colorful towns, ancient ruins, and tropical beaches.",
    image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Brazil",
    description: "Discover tropical rainforests, lively cities, and beautiful beaches.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Australia",
    description: "Explore stunning coastlines, unique wildlife, and modern cities.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "New Zealand",
    description: "Discover dramatic mountains, lakes, and breathtaking nature.",
    image: "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Malaysia",
    description: "Explore tropical islands, rainforests, and modern city skylines.",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Vietnam",
    description: "Discover beautiful rice terraces, historic towns, and scenic bays.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "South Korea",
    description: "Explore modern cities, traditional palaces, and beautiful landscapes.",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Singapore",
    description: "Discover futuristic architecture, gardens, and vibrant city life.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "India",
    description: "Experience colorful culture, historic monuments, and diverse landscapes.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Sri Lanka",
    description: "Explore tropical beaches, tea plantations, and ancient temples.",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd5d6b0e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Philippines",
    description: "Discover tropical islands, turquoise waters, and beautiful beaches.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Ireland",
    description: "Enjoy green countryside, historic castles, and coastal scenery.",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Belgium",
    description: "Discover medieval towns, historic squares, and charming architecture.",
    image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Czech Republic",
    description: "Explore historic castles, charming streets, and beautiful old towns.",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Hungary",
    description: "Discover historic architecture, thermal baths, and riverside views.",
    image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Poland",
    description: "Explore historic cities, colorful squares, and mountain landscapes.",
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Argentina",
    description: "Discover vibrant cities, mountain scenery, and natural wonders.",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Chile",
    description: "Explore dramatic mountains, deserts, and beautiful coastlines.",
    image: "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Peru",
    description: "Discover ancient Inca sites, mountain trails, and rich culture.",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Kenya",
    description: "Experience wildlife safaris, national parks, and scenic landscapes.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85"
  },
  {
    name: "Tanzania",
    description: "Explore wildlife, Mount Kilimanjaro, and tropical islands.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85"
  }
];

const seedCountries = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    for (const country of countries) {
      await Country.updateOne(
        { name: country.name },
        { $set: country },
        { upsert: true }
      );
    }

    console.log("Countries seeded successfully");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

seedCountries();
