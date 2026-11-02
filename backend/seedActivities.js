
const mongoose = require("mongoose");
const connectDB = require("./db");
const Country = require("./models/Country");
const Activity = require("./models/Activity");

const activitiesData = [
  // Jordan
  {
    name: "Petra Ancient City Exploration",
    country: "Jordan",
    category: "History",
    description: "Discover the ancient Nabataean city of Petra, famous for its rose-red architecture, carved monuments, and remarkable archaeological heritage.",
    whatToExpect: [
      "Walk through the narrow Siq canyon.",
      "Explore the famous Treasury monument.",
      "Discover ancient tombs and rock-carved buildings.",
    ],
    highlights: [
      "The Treasury",
      "The Siq",
      "Ancient Nabataean architecture",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "Wadi Rum Desert Adventure",
    country: "Jordan",
    category: "Adventure",
    description: "Experience the dramatic desert landscape of Wadi Rum through exciting outdoor activities surrounded by sandstone mountains and vast red dunes.",
    whatToExpect: [
      "Explore the desert in a 4x4 jeep.",
      "Walk among impressive sandstone formations.",
      "Enjoy the peaceful desert atmosphere.",
    ],
    highlights: [
      "Jeep safari",
      "Red sand dunes",
      "Desert sunset views",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "Dead Sea Floating Experience",
    country: "Jordan",
    category: "Relaxation",
    description: "Enjoy the unique experience of floating in the mineral-rich waters of the Dead Sea, one of the world's saltiest bodies of water.",
    whatToExpect: [
      "Float effortlessly in the salty water.",
      "Relax along the shoreline.",
      "Experience the region's natural mineral mud.",
    ],
    highlights: [
      "Natural floating experience",
      "Mineral-rich mud",
      "Panoramic landscape views",
    ],
    bestTimeToVisit: "Spring and autumn",
  },

  // Greece
  {
    name: "Santorini Caldera Cruise",
    country: "Greece",
    category: "Nature",
    description: "Discover Santorini's volcanic coastline by boat and enjoy spectacular views of the island's white villages and deep blue waters.",
    whatToExpect: [
      "Cruise around the volcanic coastline.",
      "Enjoy views of the caldera cliffs.",
      "Experience the island's beautiful sunset scenery.",
    ],
    highlights: [
      "Volcanic landscapes",
      "Caldera views",
      "Sunset scenery",
    ],
    bestTimeToVisit: "Late spring to early autumn",
  },
  {
    name: "Acropolis Cultural Discovery",
    country: "Greece",
    category: "History",
    description: "Explore the Acropolis of Athens and discover one of the most important archaeological sites of ancient Greek civilization.",
    whatToExpect: [
      "Walk through the historic Acropolis complex.",
      "Explore the Parthenon.",
      "Learn about ancient Greek architecture and history.",
    ],
    highlights: [
      "The Parthenon",
      "Ancient monuments",
      "Athens panoramic views",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "Traditional Greek Cooking Experience",
    country: "Greece",
    category: "Food",
    description: "Discover Greek culinary traditions through a hands-on cooking experience featuring local ingredients and traditional Mediterranean recipes.",
    whatToExpect: [
      "Prepare traditional Greek dishes.",
      "Learn about local ingredients.",
      "Taste the food you prepare.",
    ],
    highlights: [
      "Greek cuisine",
      "Traditional recipes",
      "Mediterranean ingredients",
    ],
    bestTimeToVisit: "All year",
  },

  // Switzerland
  {
    name: "Swiss Alps Scenic Hiking",
    country: "Switzerland",
    category: "Adventure",
    description: "Explore beautiful alpine trails surrounded by dramatic mountain peaks, green valleys, and breathtaking natural scenery.",
    whatToExpect: [
      "Walk along marked mountain trails.",
      "Enjoy views of alpine lakes and valleys.",
      "Discover Switzerland's mountain landscapes.",
    ],
    highlights: [
      "Alpine scenery",
      "Mountain viewpoints",
      "Fresh mountain air",
    ],
    bestTimeToVisit: "June to September",
  },
  {
    name: "Rhine Falls Nature Experience",
    country: "Switzerland",
    category: "Nature",
    description: "Visit Europe's largest plain waterfall and experience the impressive power of cascading water surrounded by natural scenery.",
    whatToExpect: [
      "Observe the powerful waterfall.",
      "Enjoy viewpoints around the falls.",
      "Take a boat trip when available.",
    ],
    highlights: [
      "Panoramic waterfall views",
      "Boat excursions",
      "Natural surroundings",
    ],
    bestTimeToVisit: "Late spring to early autumn",
  },
  {
    name: "Swiss Chocolate Workshop",
    country: "Switzerland",
    category: "Food",
    description: "Discover Switzerland's famous chocolate-making traditions through an interactive experience exploring ingredients, techniques, and chocolate tasting.",
    whatToExpect: [
      "Learn about chocolate production.",
      "Discover traditional Swiss chocolate techniques.",
      "Taste different chocolate creations.",
    ],
    highlights: [
      "Chocolate tasting",
      "Chocolate-making techniques",
      "Swiss culinary traditions",
    ],
    bestTimeToVisit: "All year",
  },

  // Italy
  {
    name: "Colosseum Ancient Rome Tour",
    country: "Italy",
    category: "History",
    description: "Explore the legendary Colosseum and discover the history of ancient Rome, its architecture, and the events held inside this famous amphitheater.",
    whatToExpect: [
      "Explore the historic amphitheater.",
      "Learn about Roman gladiators.",
      "Discover ancient Roman engineering.",
    ],
    highlights: [
      "The Colosseum",
      "Ancient Roman architecture",
      "Historical exhibitions",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "Tuscany Countryside Experience",
    country: "Italy",
    category: "Nature",
    description: "Enjoy the beauty of Tuscany's countryside, known for rolling hills, vineyards, historic villages, and peaceful rural landscapes.",
    whatToExpect: [
      "Explore scenic countryside roads.",
      "Discover traditional villages.",
      "Enjoy views of vineyards and hills.",
    ],
    highlights: [
      "Rolling landscapes",
      "Historic villages",
      "Vineyard scenery",
    ],
    bestTimeToVisit: "Spring and early autumn",
  },
  {
    name: "Italian Pasta Making Class",
    country: "Italy",
    category: "Food",
    description: "Discover the art of Italian pasta making through a hands-on cooking class focused on traditional techniques and fresh ingredients.",
    whatToExpect: [
      "Prepare fresh pasta from scratch.",
      "Learn traditional preparation techniques.",
      "Enjoy a freshly prepared Italian meal.",
    ],
    highlights: [
      "Fresh handmade pasta",
      "Traditional Italian recipes",
      "Italian culinary culture",
    ],
    bestTimeToVisit: "All year",
  },

  // France
  {
    name: "Eiffel Tower Experience",
    country: "France",
    category: "Culture",
    description: "Experience one of the world's most recognizable landmarks and enjoy remarkable views across the French capital.",
    whatToExpect: [
      "Visit the Eiffel Tower.",
      "Explore its observation levels.",
      "Enjoy panoramic city views.",
    ],
    highlights: [
      "Iconic architecture",
      "Observation platforms",
      "Panoramic views",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "French Riviera Coastal Discovery",
    country: "France",
    category: "Nature",
    description: "Discover the Mediterranean coastline of the French Riviera, with beautiful beaches, coastal scenery, and charming seaside surroundings.",
    whatToExpect: [
      "Enjoy coastal walks.",
      "Relax by the Mediterranean Sea.",
      "Explore scenic seaside areas.",
    ],
    highlights: [
      "Mediterranean coastline",
      "Coastal scenery",
      "Seaside relaxation",
    ],
    bestTimeToVisit: "May to September",
  },
  {
    name: "French Pastry Workshop",
    country: "France",
    category: "Food",
    description: "Explore French pastry traditions in a hands-on workshop dedicated to classic baking techniques and well-known French desserts.",
    whatToExpect: [
      "Learn basic pastry techniques.",
      "Prepare traditional French desserts.",
      "Taste freshly made pastries.",
    ],
    highlights: [
      "French pastry traditions",
      "Hands-on baking",
      "Classic desserts",
    ],
    bestTimeToVisit: "All year",
  },

  // Spain
  {
    name: "Flamenco Cultural Experience",
    country: "Spain",
    category: "Culture",
    description: "Discover the passion and history of flamenco, a traditional Spanish art form combining music, singing, rhythm, and expressive dance.",
    whatToExpect: [
      "Watch a live flamenco performance.",
      "Experience traditional Spanish music.",
      "Discover the cultural roots of flamenco.",
    ],
    highlights: [
      "Traditional dance",
      "Live music",
      "Spanish cultural heritage",
    ],
    bestTimeToVisit: "All year",
  },
  {
    name: "Camino de Santiago Hiking",
    country: "Spain",
    category: "Adventure",
    description: "Experience sections of the famous Camino de Santiago, a historic network of walking routes known for beautiful landscapes and cultural heritage.",
    whatToExpect: [
      "Walk along marked pilgrimage paths.",
      "Discover countryside landscapes.",
      "Visit historic villages along the route.",
    ],
    highlights: [
      "Scenic walking trails",
      "Historic route",
      "Cultural encounters",
    ],
    bestTimeToVisit: "April to October",
  },
  {
    name: "Spanish Tapas Food Tour",
    country: "Spain",
    category: "Food",
    description: "Explore Spanish food culture through traditional tapas, discovering local flavors and the social dining traditions of Spain.",
    whatToExpect: [
      "Taste a variety of traditional tapas.",
      "Discover regional Spanish dishes.",
      "Learn about local dining traditions.",
    ],
    highlights: [
      "Traditional tapas",
      "Regional flavors",
      "Spanish food culture",
    ],
    bestTimeToVisit: "All year",
  },

  // Turkey
  {
    name: "Cappadocia Hot Air Balloon Experience",
    country: "Turkey",
    category: "Adventure",
    description: "Enjoy a memorable balloon flight over Cappadocia's unusual rock formations and valleys, subject to weather conditions.",
    whatToExpect: [
      "Experience an early morning balloon flight.",
      "Observe the region from above.",
      "Enjoy views of unique rock formations.",
    ],
    highlights: [
      "Hot air balloon flight",
      "Fairy chimneys",
      "Sunrise landscapes",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "Turkish Bath Wellness Experience",
    country: "Turkey",
    category: "Relaxation",
    description: "Discover the traditional Turkish hammam, a historic bathing ritual known for its warm marble rooms and relaxing cleansing experience.",
    whatToExpect: [
      "Experience the traditional hammam setting.",
      "Enjoy a warm steam room.",
      "Discover traditional bathing rituals.",
    ],
    highlights: [
      "Traditional hammam",
      "Relaxing atmosphere",
      "Historic wellness tradition",
    ],
    bestTimeToVisit: "All year",
  },
  {
    name: "Turkish Cuisine Cooking Class",
    country: "Turkey",
    category: "Food",
    description: "Explore Turkish culinary traditions through a cooking class featuring regional ingredients, traditional recipes, and distinctive flavors.",
    whatToExpect: [
      "Prepare traditional Turkish dishes.",
      "Learn about regional ingredients.",
      "Enjoy the dishes you prepare.",
    ],
    highlights: [
      "Turkish cuisine",
      "Traditional cooking methods",
      "Regional flavors",
    ],
    bestTimeToVisit: "All year",
  },

  // United Arab Emirates
  {
    name: "Dubai Desert Safari",
    country: "United Arab Emirates",
    category: "Adventure",
    description: "Experience the desert landscape through a guided safari featuring dune driving, traditional hospitality, and desert scenery.",
    whatToExpect: [
      "Enjoy a guided 4x4 desert drive.",
      "Discover the desert dunes.",
      "Experience traditional desert hospitality.",
    ],
    highlights: [
      "Dune driving",
      "Desert landscapes",
      "Traditional cultural experiences",
    ],
    bestTimeToVisit: "November to March",
  },
  {
    name: "Sheikh Zayed Grand Mosque Visit",
    country: "United Arab Emirates",
    category: "Culture",
    description: "Discover the remarkable architecture of Sheikh Zayed Grand Mosque, known for its impressive domes, detailed decorations, and peaceful atmosphere.",
    whatToExpect: [
      "Explore the mosque's architectural spaces.",
      "Observe detailed Islamic artistic designs.",
      "Learn about its cultural significance.",
    ],
    highlights: [
      "Grand white marble architecture",
      "Decorative details",
      "Cultural heritage",
    ],
    bestTimeToVisit: "October to April",
  },
  {
    name: "Abu Dhabi Mangrove Kayaking",
    country: "United Arab Emirates",
    category: "Nature",
    description: "Explore the UAE's coastal mangrove ecosystem by kayak and discover a peaceful natural environment rich in wildlife.",
    whatToExpect: [
      "Paddle through calm mangrove waterways.",
      "Observe coastal plants and wildlife.",
      "Learn about the mangrove ecosystem.",
    ],
    highlights: [
      "Mangrove forests",
      "Kayaking",
      "Coastal wildlife",
    ],
    bestTimeToVisit: "October to April",
  },

  // Egypt
  {
    name: "Giza Pyramids Historical Discovery",
    country: "Egypt",
    category: "History",
    description: "Explore the famous Pyramids of Giza and discover the remarkable engineering and history of ancient Egyptian civilization.",
    whatToExpect: [
      "Visit the Great Pyramid.",
      "Discover the ancient pyramid complex.",
      "Learn about ancient Egyptian history.",
    ],
    highlights: [
      "Great Pyramid of Giza",
      "The Sphinx",
      "Ancient Egyptian architecture",
    ],
    bestTimeToVisit: "October to April",
  },
  {
    name: "Nile River Sailing Experience",
    country: "Egypt",
    category: "Nature",
    description: "Enjoy a relaxing sailing experience along the Nile and observe the river landscapes that have shaped Egyptian life for centuries.",
    whatToExpect: [
      "Sail along the Nile.",
      "Enjoy views of the riverbanks.",
      "Discover traditional river life.",
    ],
    highlights: [
      "Nile River scenery",
      "Traditional sailing boats",
      "Relaxing atmosphere",
    ],
    bestTimeToVisit: "October to April",
  },
  {
    name: "Traditional Egyptian Food Experience",
    country: "Egypt",
    category: "Food",
    description: "Discover Egyptian food culture through traditional dishes, local ingredients, and the flavors that define everyday Egyptian cuisine.",
    whatToExpect: [
      "Taste traditional Egyptian dishes.",
      "Discover popular local ingredients.",
      "Learn about Egyptian food traditions.",
    ],
    highlights: [
      "Traditional Egyptian cuisine",
      "Local flavors",
      "Food culture",
    ],
    bestTimeToVisit: "All year",
  },

  // Morocco
  {
    name: "Sahara Desert Camel Trek",
    country: "Morocco",
    category: "Adventure",
    description: "Experience the vast Sahara Desert through a guided camel trek across golden dunes and enjoy the peaceful atmosphere of the desert.",
    whatToExpect: [
      "Ride a camel across desert dunes.",
      "Enjoy the changing desert scenery.",
      "Experience a desert sunset.",
    ],
    highlights: [
      "Camel trekking",
      "Golden sand dunes",
      "Desert sunset",
    ],
    bestTimeToVisit: "October to April",
  },
  {
    name: "Moroccan Traditional Souk Discovery",
    country: "Morocco",
    category: "Culture",
    description: "Discover Morocco's traditional market culture through colorful souks filled with handmade crafts, textiles, spices, and local products.",
    whatToExpect: [
      "Explore traditional market streets.",
      "Discover handmade crafts and textiles.",
      "Experience local shopping traditions.",
    ],
    highlights: [
      "Traditional handicrafts",
      "Spice markets",
      "Moroccan cultural atmosphere",
    ],
    bestTimeToVisit: "Spring and autumn",
  },
  {
    name: "Moroccan Cooking Experience",
    country: "Morocco",
    category: "Food",
    description: "Explore Moroccan cuisine through a hands-on cooking experience featuring traditional spices, local ingredients, and classic regional dishes.",
    whatToExpect: [
      "Learn about Moroccan spices.",
      "Prepare traditional Moroccan recipes.",
      "Taste the dishes you prepare.",
    ],
    highlights: [
      "Traditional Moroccan cuisine",
      "Regional spices",
      "Cooking techniques",
    ],
    bestTimeToVisit: "All year",
  },
];

const seedActivities = async () => {
  try {
    await connectDB();

    const countries = await Country.find();

    const countryMap = new Map(
      countries.map((country) => [
        country.name.toLowerCase(),
        country._id,
      ])
    );

    const activitiesToInsert = activitiesData.map((activity) => {
      const countryId = countryMap.get(activity.country.toLowerCase());

      if (!countryId) {
        throw new Error(`Country not found: ${activity.country}`);
      }

      const { country, ...activityDetails } = activity;

      return {
        ...activityDetails,
        country: countryId,
      };
    });

    await Activity.deleteMany({});
    await Activity.insertMany(activitiesToInsert);

    console.log(
      `Successfully added ${activitiesToInsert.length} activities.`
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed activities:", error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

seedActivities();
