require("dotenv").config();
const mongoose = require("mongoose");
const Country = require("./models/Country");
const Destination = require("./models/Destination");

const destinations = [
  {
    name: "Athens",
    countryName: "Greece",
    description: "Explore Greece’s historic capital, known for the Acropolis, ancient landmarks, lively neighborhoods, and Greek cuisine.",
    image: "https://loremflickr.com/900/600/Athens,Greece"
  },
  {
    name: "Thessaloniki",
    countryName: "Greece",
    description: "Discover a lively coastal city with Byzantine landmarks, waterfront walks, museums, and a celebrated food scene.",
    image: "https://loremflickr.com/900/600/Thessaloniki,Greece"
  },
  {
    name: "Patras",
    countryName: "Greece",
    description: "Visit a vibrant port city known for its historic center, waterfront, castle, and lively cultural events.",
    image: "https://loremflickr.com/900/600/Patras,Greece"
  },
  {
    name: "Heraklion",
    countryName: "Greece",
    description: "Explore Crete’s capital, with access to the Palace of Knossos, archaeological museums, and traditional markets.",
    image: "https://loremflickr.com/900/600/Heraklion,Greece"
  },
  {
    name: "Chania",
    countryName: "Greece",
    description: "Enjoy a picturesque old harbor, Venetian architecture, narrow streets, and beautiful nearby beaches.",
    image: "https://loremflickr.com/900/600/Chania,Greece"
  },
  {
    name: "Rhodes Town",
    countryName: "Greece",
    description: "Wander through a medieval old town, historic fortifications, museums, and a charming harbor.",
    image: "https://loremflickr.com/900/600/Rhodes,Town,Greece"
  },
  {
    name: "Corfu Town",
    countryName: "Greece",
    description: "Discover pastel-colored streets, Venetian fortresses, elegant squares, and a distinctive island atmosphere.",
    image: "https://loremflickr.com/900/600/Corfu,Town,Greece"
  },
  {
    name: "Zurich",
    countryName: "Switzerland",
    description: "Explore a lakeside city with a charming old town, museums, shopping streets, and views of the Alps.",
    image: "https://loremflickr.com/900/600/Zurich,Switzerland"
  },
  {
    name: "Geneva",
    countryName: "Switzerland",
    description: "Discover an international city on Lake Geneva, known for its waterfront, parks, museums, and historic center.",
    image: "https://loremflickr.com/900/600/Geneva,Switzerland"
  },
  {
    name: "Lucerne",
    countryName: "Switzerland",
    description: "Enjoy a beautiful lakeside setting, the Chapel Bridge, old-town streets, and nearby mountain excursions.",
    image: "https://loremflickr.com/900/600/Lucerne,Switzerland"
  },
  {
    name: "Interlaken",
    countryName: "Switzerland",
    description: "Use this scenic town between two lakes as a base for mountain views and outdoor adventures.",
    image: "https://loremflickr.com/900/600/Interlaken,Switzerland"
  },
  {
    name: "Bern",
    countryName: "Switzerland",
    description: "Explore Switzerland’s capital, with medieval arcades, a historic old town, and riverside scenery.",
    image: "https://loremflickr.com/900/600/Bern,Switzerland"
  },
  {
    name: "Lausanne",
    countryName: "Switzerland",
    description: "Discover a hillside city overlooking Lake Geneva, with museums, a cathedral, and lively waterfront areas.",
    image: "https://loremflickr.com/900/600/Lausanne,Switzerland"
  },
  {
    name: "Zermatt",
    countryName: "Switzerland",
    description: "Visit a mountain village famous for its views of the Matterhorn, hiking, and alpine scenery.",
    image: "https://loremflickr.com/900/600/Zermatt,Switzerland"
  },
  {
    name: "Rome",
    countryName: "Italy",
    description: "Explore ancient landmarks, grand piazzas, museums, and neighborhoods filled with Italian food and culture.",
    image: "https://loremflickr.com/900/600/Rome,Italy"
  },
  {
    name: "Venice",
    countryName: "Italy",
    description: "Discover canals, bridges, historic palaces, and atmospheric squares in this unique lagoon city.",
    image: "https://loremflickr.com/900/600/Venice,Italy"
  },
  {
    name: "Florence",
    countryName: "Italy",
    description: "Enjoy Renaissance art and architecture, elegant streets, galleries, and classic Tuscan cuisine.",
    image: "https://loremflickr.com/900/600/Florence,Italy"
  },
  {
    name: "Milan",
    countryName: "Italy",
    description: "Explore a stylish city known for its cathedral, fashion district, museums, and vibrant dining scene.",
    image: "https://loremflickr.com/900/600/Milan,Italy"
  },
  {
    name: "Naples",
    countryName: "Italy",
    description: "Discover a lively historic center, waterfront views, archaeological sites, and the birthplace of pizza.",
    image: "https://loremflickr.com/900/600/Naples,Italy"
  },
  {
    name: "Bologna",
    countryName: "Italy",
    description: "Enjoy medieval porticoes, historic towers, a university atmosphere, and celebrated regional food.",
    image: "https://loremflickr.com/900/600/Bologna,Italy"
  },
  {
    name: "Verona",
    countryName: "Italy",
    description: "Visit a romantic historic city known for its Roman arena, elegant squares, and riverside streets.",
    image: "https://loremflickr.com/900/600/Verona,Italy"
  },
    {
    name: "Paris",
    countryName: "France",
    description: "Explore world-famous museums, historic monuments, elegant boulevards, and distinctive neighborhoods.",
    image: "https://loremflickr.com/900/600/Paris,France"
  },
  {
    name: "Nice",
    countryName: "France",
    description: "Enjoy the French Riviera, with a seaside promenade, colorful old town, and Mediterranean views.",
    image: "https://loremflickr.com/900/600/Nice,France"
  },
  {
    name: "Lyon",
    countryName: "France",
    description: "Discover a historic city known for its architecture, riverside districts, and renowned food culture.",
    image: "https://loremflickr.com/900/600/Lyon,France"
  },
  {
    name: "Marseille",
    countryName: "France",
    description: "Explore a lively Mediterranean port, its old harbor, coastal scenery, and diverse neighborhoods.",
    image: "https://loremflickr.com/900/600/Marseille,France"
  },
  {
    name: "Bordeaux",
    countryName: "France",
    description: "Visit a graceful city known for its architecture, riverfront, museums, and nearby wine country.",
    image: "https://loremflickr.com/900/600/Bordeaux,France"
  },
  {
    name: "Strasbourg",
    countryName: "France",
    description: "Discover a picturesque old town, canals, half-timbered houses, and a striking cathedral.",
    image: "https://loremflickr.com/900/600/Strasbourg,France"
  },
  {
    name: "Toulouse",
    countryName: "France",
    description: "Enjoy a warm-colored historic center, riverside walks, museums, and southern French culture.",
    image: "https://loremflickr.com/900/600/Toulouse,France"
  },
  {
    name: "Tokyo",
    countryName: "Japan",
    description: "Explore a dynamic capital blending modern districts, traditional temples, shopping, and food experiences.",
    image: "https://loremflickr.com/900/600/Tokyo,Japan"
  },
  {
    name: "Kyoto",
    countryName: "Japan",
    description: "Discover historic temples, traditional streets, gardens, and classic Japanese cultural experiences.",
    image: "https://loremflickr.com/900/600/Kyoto,Japan"
  },
  {
    name: "Osaka",
    countryName: "Japan",
    description: "Enjoy lively food streets, historic Osaka Castle, shopping districts, and energetic nightlife.",
    image: "https://loremflickr.com/900/600/Osaka,Japan"
  },
  {
    name: "Hiroshima",
    countryName: "Japan",
    description: "Visit important peace memorial sites, museums, gardens, and the nearby island of Miyajima.",
    image: "https://loremflickr.com/900/600/Hiroshima,Japan"
  },
  {
    name: "Nara",
    countryName: "Japan",
    description: "Explore ancient temples, traditional gardens, and the famous free-roaming deer in Nara Park.",
    image: "https://loremflickr.com/900/600/Nara,Japan"
  },
  {
    name: "Sapporo",
    countryName: "Japan",
    description: "Discover a northern city known for seasonal festivals, parks, local cuisine, and nearby nature.",
    image: "https://loremflickr.com/900/600/Sapporo,Japan"
  },
  {
    name: "Fukuoka",
    countryName: "Japan",
    description: "Enjoy a welcoming city with historic shrines, seaside areas, shopping, and famous street-food stalls.",
    image: "https://loremflickr.com/900/600/Fukuoka,Japan"
  },
  {
    name: "Ubud",
    countryName: "Indonesia",
    description: "Discover Bali’s cultural heart, with temples, art markets, rice terraces, and lush surroundings.",
    image: "https://loremflickr.com/900/600/Ubud,Indonesia"
  },
  {
    name: "Denpasar",
    countryName: "Indonesia",
    description: "Explore Bali’s capital, with traditional markets, museums, temples, and local city life.",
    image: "https://loremflickr.com/900/600/Denpasar,Indonesia"
  },
  {
    name: "Yogyakarta",
    countryName: "Indonesia",
    description: "Visit a cultural center known for royal heritage, traditional arts, and access to Borobudur and Prambanan.",
    image: "https://loremflickr.com/900/600/Yogyakarta,Indonesia"
  },
  {
    name: "Jakarta",
    countryName: "Indonesia",
    description: "Discover Indonesia’s busy capital, with museums, historic districts, shopping, and diverse cuisine.",
    image: "https://loremflickr.com/900/600/Jakarta,Indonesia"
  },
  {
    name: "Bandung",
    countryName: "Indonesia",
    description: "Enjoy a highland city known for creative culture, colonial architecture, and nearby volcanic landscapes.",
    image: "https://loremflickr.com/900/600/Bandung,Indonesia"
  },
  {
    name: "Malang",
    countryName: "Indonesia",
    description: "Explore a relaxed East Java city with colorful neighborhoods, historic buildings, and mountain scenery.",
    image: "https://loremflickr.com/900/600/Malang,Indonesia"
  },
  {
    name: "Banyuwangi",
    countryName: "Indonesia",
    description: "Discover coastal landscapes, local culture, and access to the Ijen volcanic region.",
    image: "https://loremflickr.com/900/600/Banyuwangi,Indonesia"
  },
    {
    name: "Bangkok",
    countryName: "Thailand",
    description: "Explore ornate temples, lively markets, riverside landmarks, and a celebrated street-food scene.",
    image: "https://loremflickr.com/900/600/Bangkok,Thailand"
  },
  {
    name: "Chiang Mai",
    countryName: "Thailand",
    description: "Discover historic temples, night markets, mountain scenery, and northern Thai culture.",
    image: "https://loremflickr.com/900/600/Chiang,Mai,Thailand"
  },
  {
    name: "Phuket Town",
    countryName: "Thailand",
    description: "Enjoy colorful Sino-Portuguese streets, local markets, cafés, and access to Phuket’s beaches.",
    image: "https://loremflickr.com/900/600/Phuket,Town,Thailand"
  },
  {
    name: "Pattaya",
    countryName: "Thailand",
    description: "Visit a coastal city with beaches, waterfront attractions, markets, and entertainment options.",
    image: "https://loremflickr.com/900/600/Pattaya,Thailand"
  },
  {
    name: "Ayutthaya",
    countryName: "Thailand",
    description: "Explore the ruins of the former Siamese capital, with historic temples and archaeological sites.",
    image: "https://loremflickr.com/900/600/Ayutthaya,Thailand"
  },
  {
    name: "Krabi Town",
    countryName: "Thailand",
    description: "Discover a relaxed riverside town and a gateway to limestone cliffs, islands, and beaches.",
    image: "https://loremflickr.com/900/600/Krabi,Town,Thailand"
  },
  {
    name: "Sukhothai",
    countryName: "Thailand",
    description: "Visit a historic city known for its remarkable ancient temple complex and peaceful landscapes.",
    image: "https://loremflickr.com/900/600/Sukhothai,Thailand"
  },
  {
    name: "Madrid",
    countryName: "Spain",
    description: "Explore grand plazas, art museums, royal landmarks, parks, and lively Spanish neighborhoods.",
    image: "https://loremflickr.com/900/600/Madrid,Spain"
  },
  {
    name: "Barcelona",
    countryName: "Spain",
    description: "Discover striking architecture, Mediterranean beaches, markets, and vibrant cultural districts.",
    image: "https://loremflickr.com/900/600/Barcelona,Spain"
  },
  {
    name: "Seville",
    countryName: "Spain",
    description: "Enjoy Andalusian architecture, flamenco traditions, historic palaces, and charming old streets.",
    image: "https://loremflickr.com/900/600/Seville,Spain"
  },
  {
    name: "Valencia",
    countryName: "Spain",
    description: "Explore a sunny coastal city with historic squares, beaches, gardens, and modern architecture.",
    image: "https://loremflickr.com/900/600/Valencia,Spain"
  },
  {
    name: "Granada",
    countryName: "Spain",
    description: "Visit the Alhambra, historic Albaicín streets, and scenic viewpoints over the city.",
    image: "https://loremflickr.com/900/600/Granada,Spain"
  },
  {
    name: "Malaga",
    countryName: "Spain",
    description: "Discover a Mediterranean waterfront, museums, historic fortifications, and lively plazas.",
    image: "https://loremflickr.com/900/600/Malaga,Spain"
  },
  {
    name: "Bilbao",
    countryName: "Spain",
    description: "Explore contemporary architecture, art museums, riverside walks, and Basque cuisine.",
    image: "https://loremflickr.com/900/600/Bilbao,Spain"
  },
  {
    name: "Istanbul",
    countryName: "Turkey",
    description: "Discover a city spanning two continents, with historic mosques, bazaars, palaces, and Bosphorus views.",
    image: "https://loremflickr.com/900/600/Istanbul,Turkey"
  },
  {
    name: "Ankara",
    countryName: "Turkey",
    description: "Explore Turkey’s capital, with national museums, historic sites, and modern city districts.",
    image: "https://loremflickr.com/900/600/Ankara,Turkey"
  },
  {
    name: "Izmir",
    countryName: "Turkey",
    description: "Enjoy a lively Aegean waterfront, historic neighborhoods, markets, and nearby ancient sites.",
    image: "https://loremflickr.com/900/600/Izmir,Turkey"
  },
  {
    name: "Antalya",
    countryName: "Turkey",
    description: "Discover a Mediterranean city with an old harbor, historic streets, beaches, and mountain views.",
    image: "https://loremflickr.com/900/600/Antalya,Turkey"
  },
  {
    name: "Bursa",
    countryName: "Turkey",
    description: "Explore Ottoman heritage, historic mosques, traditional markets, and nearby mountain scenery.",
    image: "https://loremflickr.com/900/600/Bursa,Turkey"
  },
  {
    name: "Gaziantep",
    countryName: "Turkey",
    description: "Visit a city celebrated for its historic center, museums, and distinctive regional cuisine.",
    image: "https://loremflickr.com/900/600/Gaziantep,Turkey"
  },
  {
    name: "Trabzon",
    countryName: "Turkey",
    description: "Discover Black Sea scenery, historic landmarks, and access to green mountain landscapes.",
    image: "https://loremflickr.com/900/600/Trabzon,Turkey"
  },
  {
    name: "Dubai",
    countryName: "United Arab Emirates",
    description: "Explore modern landmarks, waterfront districts, traditional markets, and desert experiences.",
    image: "https://loremflickr.com/900/600/Dubai,UAE"
  },
  {
    name: "Abu Dhabi",
    countryName: "United Arab Emirates",
    description: "Discover grand cultural landmarks, museums, waterfront promenades, and modern architecture.",
    image: "https://loremflickr.com/900/600/Abu,Dhabi,UAE"
  },
  {
    name: "Sharjah",
    countryName: "United Arab Emirates",
    description: "Visit museums, heritage districts, art spaces, and traditional markets.",
    image: "https://loremflickr.com/900/600/Sharjah,UAE"
  },
  {
    name: "Al Ain",
    countryName: "United Arab Emirates",
    description: "Explore oasis landscapes, historic forts, gardens, and cultural heritage sites.",
    image: "https://loremflickr.com/900/600/Al,Ain,UAE"
  },
  {
    name: "Ras Al Khaimah",
    countryName: "United Arab Emirates",
    description: "Enjoy mountain scenery, beaches, historic sites, and outdoor activities.",
    image: "https://loremflickr.com/900/600/Ras,Al,Khaimah,UAE"
  },
  {
    name: "Fujairah",
    countryName: "United Arab Emirates",
    description: "Discover an east-coast setting with beaches, forts, and mountain landscapes.",
    image: "https://loremflickr.com/900/600/Fujairah,UAE"
  },
  {
    name: "Ajman",
    countryName: "United Arab Emirates",
    description: "Visit a relaxed coastal city with a waterfront promenade, museum, and traditional souks.",
    image: "https://loremflickr.com/900/600/Ajman,UAE"
  },
  {
    name: "Amman",
    countryName: "Jordan",
    description: "Explore the capital’s historic citadel, Roman Theater, lively neighborhoods, and local food scene.",
    image: "https://loremflickr.com/900/600/Amman,Jordan"
  },
  {
    name: "Petra",
    countryName: "Jordan",
    description: "Discover the ancient Nabataean city carved into rose-colored rock, including the famous Treasury.",
    image: "https://loremflickr.com/900/600/Petra,Jordan"
  },
  {
    name: "Aqaba",
    countryName: "Jordan",
    description: "Enjoy Red Sea beaches, coral reefs, waterfront dining, and water activities.",
    image: "https://loremflickr.com/900/600/Aqaba,Jordan"
  },
  {
    name: "Wadi Musa",
    countryName: "Jordan",
    description: "Stay near Petra and explore local viewpoints, restaurants, and the surrounding desert landscape.",
    image: "https://loremflickr.com/900/600/Wadi,Musa,Jordan"
  },
  {
    name: "Madaba",
    countryName: "Jordan",
    description: "Discover Byzantine mosaics, historic churches, and the famous ancient map of the Holy Land.",
    image: "https://loremflickr.com/900/600/Madaba,Jordan"
  },
  {
    name: "Jerash",
    countryName: "Jordan",
    description: "Explore remarkably preserved Roman streets, temples, theaters, and colonnaded plazas.",
    image: "https://loremflickr.com/900/600/Jerash,Jordan"
  },
  {
    name: "Salt",
    countryName: "Jordan",
    description: "Visit a historic hill town known for traditional architecture, heritage houses, and old streets.",
    image: "https://loremflickr.com/900/600/Salt,Jordan"
  },
  {
    name: "London",
    countryName: "United Kingdom",
    description: "Explore world-class museums, royal landmarks, historic neighborhoods, parks, and theater.",
    image: "https://loremflickr.com/900/600/London,UK"
  },
  {
    name: "Edinburgh",
    countryName: "United Kingdom",
    description: "Discover a dramatic castle, medieval old town, elegant streets, and cultural festivals.",
    image: "https://loremflickr.com/900/600/Edinburgh,UK"
  },
  {
    name: "Manchester",
    countryName: "United Kingdom",
    description: "Enjoy music heritage, museums, football culture, shopping, and lively neighborhoods.",
    image: "https://loremflickr.com/900/600/Manchester,UK"
  },
  {
    name: "Liverpool",
    countryName: "United Kingdom",
    description: "Explore maritime history, music landmarks, museums, and a lively waterfront.",
    image: "https://loremflickr.com/900/600/Liverpool,UK"
  },
  {
    name: "Oxford",
    countryName: "United Kingdom",
    description: "Discover historic university colleges, libraries, gardens, and charming riverside walks.",
    image: "https://loremflickr.com/900/600/Oxford,UK"
  },
  {
    name: "Cambridge",
    countryName: "United Kingdom",
    description: "Explore beautiful university buildings, museums, green spaces, and punting along the river.",
    image: "https://loremflickr.com/900/600/Cambridge,UK"
  },
  {
    name: "Bath",
    countryName: "United Kingdom",
    description: "Visit elegant Georgian streets, Roman Baths, historic architecture, and relaxing gardens.",
    image: "https://loremflickr.com/900/600/Bath,UK"
  },
  {
    name: "Lisbon",
    countryName: "Portugal",
    description: "Explore colorful hills, historic trams, tiled streets, viewpoints, and waterfront neighborhoods.",
    image: "https://loremflickr.com/900/600/Lisbon,Portugal"
  },
  {
    name: "Porto",
    countryName: "Portugal",
    description: "Discover riverside districts, historic bridges, tiled churches, and traditional food and drink culture.",
    image: "https://loremflickr.com/900/600/Porto,Portugal"
  },
  {
    name: "Sintra",
    countryName: "Portugal",
    description: "Visit romantic palaces, gardens, and castles set among green hills.",
    image: "https://loremflickr.com/900/600/Sintra,Portugal"
  },
  {
    name: "Faro",
    countryName: "Portugal",
    description: "Explore the Algarve’s historic center, marina, and nearby coastal nature areas.",
    image: "https://loremflickr.com/900/600/Faro,Portugal"
  },
  {
    name: "Coimbra",
    countryName: "Portugal",
    description: "Discover a historic university city with libraries, old streets, and riverside scenery.",
    image: "https://loremflickr.com/900/600/Coimbra,Portugal"
  },
  {
    name: "Braga",
    countryName: "Portugal",
    description: "Visit historic churches, lively squares, and the hilltop sanctuary of Bom Jesus.",
    image: "https://loremflickr.com/900/600/Braga,Portugal"
  },
  {
    name: "Evora",
    countryName: "Portugal",
    description: "Explore a beautifully preserved historic center, Roman temple, and traditional Alentejo architecture.",
    image: "https://loremflickr.com/900/600/Evora,Portugal"
  },
    {
    name: "Berlin",
    countryName: "Germany",
    description: "Discover major historical landmarks, museums, creative neighborhoods, and a lively cultural scene.",
    image: "https://loremflickr.com/900/600/Berlin,Germany"
  },
  {
    name: "Munich",
    countryName: "Germany",
    description: "Enjoy grand squares, museums, gardens, traditional markets, and Bavarian culture.",
    image: "https://loremflickr.com/900/600/Munich,Germany"
  },
  {
    name: "Hamburg",
    countryName: "Germany",
    description: "Explore a historic port, canals, waterfront districts, and striking modern architecture.",
    image: "https://loremflickr.com/900/600/Hamburg,Germany"
  },
  {
    name: "Cologne",
    countryName: "Germany",
    description: "Visit the famous cathedral, riverside promenades, museums, and lively old town.",
    image: "https://loremflickr.com/900/600/Cologne,Germany"
  },
  {
    name: "Frankfurt",
    countryName: "Germany",
    description: "Discover a modern skyline alongside historic squares, museums, and riverfront walks.",
    image: "https://loremflickr.com/900/600/Frankfurt,Germany"
  },
  {
    name: "Dresden",
    countryName: "Germany",
    description: "Explore baroque architecture, art collections, historic churches, and the Elbe riverfront.",
    image: "https://loremflickr.com/900/600/Dresden,Germany"
  },
  {
    name: "Heidelberg",
    countryName: "Germany",
    description: "Enjoy a romantic old town, castle ruins, university heritage, and riverside scenery.",
    image: "https://loremflickr.com/900/600/Heidelberg,Germany"
  },
  {
    name: "Amsterdam",
    countryName: "Netherlands",
    description: "Explore canals, historic houses, museums, markets, and lively neighborhoods.",
    image: "https://loremflickr.com/900/600/Amsterdam,Netherlands"
  },
  {
    name: "Rotterdam",
    countryName: "Netherlands",
    description: "Discover bold modern architecture, a busy harbor, museums, and contemporary food spaces.",
    image: "https://loremflickr.com/900/600/Rotterdam,Netherlands"
  },
  {
    name: "Utrecht",
    countryName: "Netherlands",
    description: "Enjoy picturesque canals, a medieval center, historic towers, and welcoming cafés.",
    image: "https://loremflickr.com/900/600/Utrecht,Netherlands"
  },
  {
    name: "The Hague",
    countryName: "Netherlands",
    description: "Explore royal landmarks, museums, elegant streets, and nearby seaside areas.",
    image: "https://loremflickr.com/900/600/The,Hague,Netherlands"
  },
  {
    name: "Maastricht",
    countryName: "Netherlands",
    description: "Discover cobbled streets, historic squares, riverside walks, and distinctive southern Dutch culture.",
    image: "https://loremflickr.com/900/600/Maastricht,Netherlands"
  },
  {
    name: "Leiden",
    countryName: "Netherlands",
    description: "Visit a historic university city with canals, museums, courtyards, and botanical gardens.",
    image: "https://loremflickr.com/900/600/Leiden,Netherlands"
  },
  {
    name: "Delft",
    countryName: "Netherlands",
    description: "Explore charming canals, historic market squares, traditional pottery, and old churches.",
    image: "https://loremflickr.com/900/600/Delft,Netherlands"
  },
  {
    name: "Vienna",
    countryName: "Austria",
    description: "Discover imperial palaces, classical music heritage, museums, cafés, and elegant boulevards.",
    image: "https://loremflickr.com/900/600/Vienna,Austria"
  },
  {
    name: "Salzburg",
    countryName: "Austria",
    description: "Explore baroque streets, historic fortresses, music heritage, and alpine views.",
    image: "https://loremflickr.com/900/600/Salzburg,Austria"
  },
  {
    name: "Innsbruck",
    countryName: "Austria",
    description: "Enjoy a mountain-framed city with a colorful old town and access to alpine activities.",
    image: "https://loremflickr.com/900/600/Innsbruck,Austria"
  },
  {
    name: "Graz",
    countryName: "Austria",
    description: "Discover a historic center, castle hill, museums, and a lively culinary scene.",
    image: "https://loremflickr.com/900/600/Graz,Austria"
  },
  {
    name: "Linz",
    countryName: "Austria",
    description: "Explore riverside culture, contemporary art, museums, and historic squares.",
    image: "https://loremflickr.com/900/600/Linz,Austria"
  },
  {
    name: "Hallstatt",
    countryName: "Austria",
    description: "Visit a picturesque lakeside village surrounded by mountains and traditional architecture.",
    image: "https://loremflickr.com/900/600/Hallstatt,Austria"
  },
  {
    name: "Klagenfurt",
    countryName: "Austria",
    description: "Enjoy a lakeside city with historic streets, parks, and access to the Wörthersee region.",
    image: "https://loremflickr.com/900/600/Klagenfurt,Austria"
  },
  {
    name: "Oslo",
    countryName: "Norway",
    description: "Explore waterfront architecture, museums, parks, and a lively Scandinavian capital.",
    image: "https://loremflickr.com/900/600/Oslo,Norway"
  },
  {
    name: "Bergen",
    countryName: "Norway",
    description: "Discover a colorful historic harbor, mountain viewpoints, and access to fjord landscapes.",
    image: "https://loremflickr.com/900/600/Bergen,Norway"
  },
  {
    name: "Trondheim",
    countryName: "Norway",
    description: "Visit a historic cathedral, colorful riverside warehouses, and a lively student city.",
    image: "https://loremflickr.com/900/600/Trondheim,Norway"
  },
  {
    name: "Tromso",
    countryName: "Norway",
    description: "Enjoy Arctic scenery, museums, northern lights opportunities, and outdoor adventures.",
    image: "https://loremflickr.com/900/600/Tromso,Norway"
  },
  {
    name: "Stavanger",
    countryName: "Norway",
    description: "Explore a charming old town, coastal scenery, and access to the famous Pulpit Rock area.",
    image: "https://loremflickr.com/900/600/Stavanger,Norway"
  },
  {
    name: "Alesund",
    countryName: "Norway",
    description: "Discover distinctive Art Nouveau architecture, harbor views, and nearby fjords.",
    image: "https://loremflickr.com/900/600/Alesund,Norway"
  },
  {
    name: "Bodo",
    countryName: "Norway",
    description: "Visit a northern coastal city with dramatic landscapes and access to Saltstraumen.",
    image: "https://loremflickr.com/900/600/Bodo,Norway"
  },
  {
    name: "Stockholm",
    countryName: "Sweden",
    description: "Explore an island capital with a historic old town, museums, waterfront views, and green spaces.",
    image: "https://loremflickr.com/900/600/Stockholm,Sweden"
  },
  {
    name: "Gothenburg",
    countryName: "Sweden",
    description: "Discover canals, seafood, cultural venues, and a relaxed west-coast atmosphere.",
    image: "https://loremflickr.com/900/600/Gothenburg,Sweden"
  },
  {
    name: "Malmo",
    countryName: "Sweden",
    description: "Enjoy modern architecture, historic squares, parks, and a lively food scene.",
    image: "https://loremflickr.com/900/600/Malmo,Sweden"
  },
  {
    name: "Uppsala",
    countryName: "Sweden",
    description: "Explore a historic university city with a cathedral, gardens, and museums.",
    image: "https://loremflickr.com/900/600/Uppsala,Sweden"
  },
  {
    name: "Kiruna",
    countryName: "Sweden",
    description: "Discover Arctic landscapes, winter activities, and access to the northern wilderness.",
    image: "https://loremflickr.com/900/600/Kiruna,Sweden"
  },
  {
    name: "Visby",
    countryName: "Sweden",
    description: "Visit a medieval walled town with cobbled lanes, historic ruins, and Baltic Sea views.",
    image: "https://loremflickr.com/900/600/Visby,Sweden"
  },
  {
    name: "Orebro",
    countryName: "Sweden",
    description: "Explore a picturesque castle, riverside walks, and a historic town center.",
    image: "https://loremflickr.com/900/600/Orebro,Sweden"
  },
  {
    name: "Helsinki",
    countryName: "Finland",
    description: "Discover design districts, waterfront markets, museums, and elegant Nordic architecture.",
    image: "https://loremflickr.com/900/600/Helsinki,Finland"
  },
  {
    name: "Turku",
    countryName: "Finland",
    description: "Explore a historic riverside city with a castle, cathedral, and lively cultural scene.",
    image: "https://loremflickr.com/900/600/Turku,Finland"
  },
  {
    name: "Tampere",
    countryName: "Finland",
    description: "Visit a lakeside city known for museums, industrial heritage, and sauna culture.",
    image: "https://loremflickr.com/900/600/Tampere,Finland"
  },
  {
    name: "Rovaniemi",
    countryName: "Finland",
    description: "Discover Arctic experiences, winter activities, and the official hometown of Santa Claus.",
    image: "https://loremflickr.com/900/600/Rovaniemi,Finland"
  },
  {
    name: "Oulu",
    countryName: "Finland",
    description: "Enjoy northern Finnish culture, waterfront paths, markets, and nearby nature.",
    image: "https://loremflickr.com/900/600/Oulu,Finland"
  },
  {
    name: "Porvoo",
    countryName: "Finland",
    description: "Explore colorful wooden houses, cobbled streets, and a charming riverside old town.",
    image: "https://loremflickr.com/900/600/Porvoo,Finland"
  },
  {
    name: "Kuopio",
    countryName: "Finland",
    description: "Visit a lakeside city with scenic viewpoints, markets, and access to Finnish nature.",
    image: "https://loremflickr.com/900/600/Kuopio,Finland"
  },
  {
    name: "Reykjavik",
    countryName: "Iceland",
    description: "Explore Iceland’s capital, with colorful streets, museums, cafés, and nearby geothermal attractions.",
    image: "https://loremflickr.com/900/600/Reykjavik,Iceland"
  },
  {
    name: "Akureyri",
    countryName: "Iceland",
    description: "Discover a northern town with botanical gardens, mountain views, and a welcoming center.",
    image: "https://loremflickr.com/900/600/Akureyri,Iceland"
  },
  {
    name: "Vik",
    countryName: "Iceland",
    description: "Visit a small coastal village near black-sand beaches, cliffs, and dramatic landscapes.",
    image: "https://loremflickr.com/900/600/Vik,Iceland"
  },
  {
    name: "Hofn",
    countryName: "Iceland",
    description: "Enjoy harbor scenery and access to glaciers, mountains, and southeast Iceland.",
    image: "https://loremflickr.com/900/600/Hofn,Iceland"
  },
  {
    name: "Selfoss",
    countryName: "Iceland",
    description: "Use this southern town as a base for waterfalls, hot springs, and countryside exploration.",
    image: "https://loremflickr.com/900/600/Selfoss,Iceland"
  },
  {
    name: "Isafjordur",
    countryName: "Iceland",
    description: "Discover a remote Westfjords town surrounded by steep mountains and coastal scenery.",
    image: "https://loremflickr.com/900/600/Isafjordur,Iceland"
  },
  {
    name: "Egilsstadir",
    countryName: "Iceland",
    description: "Explore eastern Iceland’s lakes, forests, and nearby villages.",
    image: "https://loremflickr.com/900/600/Egilsstadir,Iceland"
  },
    {
    name: "Dubrovnik",
    countryName: "Croatia",
    description: "Explore a walled coastal city with historic streets, fortifications, and Adriatic views.",
    image: "https://loremflickr.com/900/600/Dubrovnik,Croatia"
  },
  {
    name: "Split",
    countryName: "Croatia",
    description: "Discover Roman heritage, a lively waterfront, beaches, and the historic Diocletian’s Palace.",
    image: "https://loremflickr.com/900/600/Split,Croatia"
  },
  {
    name: "Zagreb",
    countryName: "Croatia",
    description: "Enjoy museums, historic squares, cafés, and the character of Croatia’s capital.",
    image: "https://loremflickr.com/900/600/Zagreb,Croatia"
  },
  {
    name: "Zadar",
    countryName: "Croatia",
    description: "Explore Roman ruins, medieval churches, waterfront installations, and sunset views.",
    image: "https://loremflickr.com/900/600/Zadar,Croatia"
  },
  {
    name: "Rovinj",
    countryName: "Croatia",
    description: "Discover a picturesque Istrian harbor, narrow streets, and colorful waterfront buildings.",
    image: "https://loremflickr.com/900/600/Rovinj,Croatia"
  },
  {
    name: "Pula",
    countryName: "Croatia",
    description: "Visit a remarkably preserved Roman amphitheater, historic sites, and nearby beaches.",
    image: "https://loremflickr.com/900/600/Pula,Croatia"
  },
  {
    name: "Sibenik",
    countryName: "Croatia",
    description: "Explore a stone-built old town, a UNESCO-listed cathedral, and coastal fortresses.",
    image: "https://loremflickr.com/900/600/Sibenik,Croatia"
  },
  {
    name: "Cairo",
    countryName: "Egypt",
    description: "Discover the Egyptian Museum, historic mosques, lively markets, and access to the Giza pyramids.",
    image: "https://loremflickr.com/900/600/Cairo,Egypt"
  },
  {
    name: "Luxor",
    countryName: "Egypt",
    description: "Explore monumental temples, ancient tombs, and the rich heritage of the Nile Valley.",
    image: "https://loremflickr.com/900/600/Luxor,Egypt"
  },
  {
    name: "Aswan",
    countryName: "Egypt",
    description: "Enjoy Nile scenery, colorful Nubian culture, islands, and ancient monuments.",
    image: "https://loremflickr.com/900/600/Aswan,Egypt"
  },
  {
    name: "Alexandria",
    countryName: "Egypt",
    description: "Discover Mediterranean waterfronts, historic sites, museums, and the modern Bibliotheca Alexandrina.",
    image: "https://loremflickr.com/900/600/Alexandria,Egypt"
  },
  {
    name: "Sharm El Sheikh",
    countryName: "Egypt",
    description: "Visit a Red Sea resort known for coral reefs, beaches, and water activities.",
    image: "https://loremflickr.com/900/600/Sharm,El,Sheikh,Egypt"
  },
  {
    name: "Hurghada",
    countryName: "Egypt",
    description: "Enjoy Red Sea beaches, diving, boat trips, and desert excursions.",
    image: "https://loremflickr.com/900/600/Hurghada,Egypt"
  },
  {
    name: "Dahab",
    countryName: "Egypt",
    description: "Discover a laid-back coastal town known for snorkeling, diving, and mountain scenery.",
    image: "https://loremflickr.com/900/600/Dahab,Egypt"
  },
  {
    name: "Marrakech",
    countryName: "Morocco",
    description: "Explore lively souks, historic palaces, gardens, and the atmosphere of Jemaa el-Fnaa.",
    image: "https://loremflickr.com/900/600/Marrakech,Morocco"
  },
  {
    name: "Fes",
    countryName: "Morocco",
    description: "Discover a remarkable medieval medina, traditional crafts, historic schools, and cultural heritage.",
    image: "https://loremflickr.com/900/600/Fes,Morocco"
  },
  {
    name: "Casablanca",
    countryName: "Morocco",
    description: "Visit a modern coastal city with grand architecture, markets, and the Hassan II Mosque.",
    image: "https://loremflickr.com/900/600/Casablanca,Morocco"
  },
  {
    name: "Chefchaouen",
    countryName: "Morocco",
    description: "Enjoy blue-painted streets, mountain views, and a relaxed old-town atmosphere.",
    image: "https://loremflickr.com/900/600/Chefchaouen,Morocco"
  },
  {
    name: "Rabat",
    countryName: "Morocco",
    description: "Explore Morocco’s capital, with historic kasbahs, gardens, museums, and coastal promenades.",
    image: "https://loremflickr.com/900/600/Rabat,Morocco"
  },
  {
    name: "Essaouira",
    countryName: "Morocco",
    description: "Discover a breezy Atlantic port, fortified medina, art galleries, and beaches.",
    image: "https://loremflickr.com/900/600/Essaouira,Morocco"
  },
  {
    name: "Tangier",
    countryName: "Morocco",
    description: "Visit a historic port city with a lively medina, seaside views, and cultural influences.",
    image: "https://loremflickr.com/900/600/Tangier,Morocco"
  },
  {
    name: "Cape Town",
    countryName: "South Africa",
    description: "Explore Table Mountain, beaches, waterfront attractions, and diverse neighborhoods.",
    image: "https://loremflickr.com/900/600/Cape,Town,South,Africa"
  },
  {
    name: "Johannesburg",
    countryName: "South Africa",
    description: "Discover museums, urban culture, historic sites, and lively creative districts.",
    image: "https://loremflickr.com/900/600/Johannesburg,South,Africa"
  },
  {
    name: "Durban",
    countryName: "South Africa",
    description: "Enjoy warm beaches, a vibrant waterfront, markets, and distinctive food culture.",
    image: "https://loremflickr.com/900/600/Durban,South,Africa"
  },
  {
    name: "Pretoria",
    countryName: "South Africa",
    description: "Explore jacaranda-lined streets, historic buildings, gardens, and national landmarks.",
    image: "https://loremflickr.com/900/600/Pretoria,South,Africa"
  },
  {
    name: "Stellenbosch",
    countryName: "South Africa",
    description: "Visit a historic university town surrounded by vineyards and scenic countryside.",
    image: "https://loremflickr.com/900/600/Stellenbosch,South,Africa"
  },
  {
    name: "Port Elizabeth",
    countryName: "South Africa",
    description: "Discover coastal beaches, historic attractions, and access to wildlife experiences.",
    image: "https://loremflickr.com/900/600/Port,Elizabeth,South,Africa"
  },
  {
    name: "Knysna",
    countryName: "South Africa",
    description: "Enjoy lagoon views, forest landscapes, waterfront dining, and outdoor activities.",
    image: "https://loremflickr.com/900/600/Knysna,South,Africa"
  },
  {
    name: "New York City",
    countryName: "United States",
    description: "Explore iconic landmarks, museums, neighborhoods, parks, and a diverse food scene.",
    image: "https://loremflickr.com/900/600/New,York,City,USA"
  },
  {
    name: "Los Angeles",
    countryName: "United States",
    description: "Discover beaches, entertainment landmarks, museums, and varied neighborhoods.",
    image: "https://loremflickr.com/900/600/Los,Angeles,USA"
  },
  {
    name: "San Francisco",
    countryName: "United States",
    description: "Enjoy waterfront scenery, distinctive neighborhoods, parks, and famous city landmarks.",
    image: "https://loremflickr.com/900/600/San,Francisco,USA"
  },
  {
    name: "Chicago",
    countryName: "United States",
    description: "Explore architecture, lakefront parks, museums, and celebrated local food.",
    image: "https://loremflickr.com/900/600/Chicago,USA"
  },
  {
    name: "Las Vegas",
    countryName: "United States",
    description: "Discover entertainment venues, striking resorts, shows, and nearby desert landscapes.",
    image: "https://loremflickr.com/900/600/Las,Vegas,USA"
  },
  {
    name: "Washington DC",
    countryName: "United States",
    description: "Visit national monuments, Smithsonian museums, historic neighborhoods, and cultural institutions.",
    image: "https://loremflickr.com/900/600/Washington,DC,USA"
  },
  {
    name: "New Orleans",
    countryName: "United States",
    description: "Enjoy live music, historic architecture, distinctive cuisine, and lively cultural traditions.",
    image: "https://loremflickr.com/900/600/New,Orleans,USA"
  },
  {
    name: "Toronto",
    countryName: "Canada",
    description: "Explore a multicultural city with waterfront areas, museums, markets, and iconic skyline views.",
    image: "https://loremflickr.com/900/600/Toronto,Canada"
  },
  {
    name: "Vancouver",
    countryName: "Canada",
    description: "Discover oceanfront parks, mountain scenery, neighborhoods, and outdoor activities.",
    image: "https://loremflickr.com/900/600/Vancouver,Canada"
  },
  {
    name: "Montreal",
    countryName: "Canada",
    description: "Enjoy historic streets, festivals, museums, and a distinctive blend of cultures.",
    image: "https://loremflickr.com/900/600/Montreal,Canada"
  },
  {
    name: "Quebec City",
    countryName: "Canada",
    description: "Explore fortified old-town streets, historic architecture, and French-Canadian culture.",
    image: "https://loremflickr.com/900/600/Quebec,City,Canada"
  },
  {
    name: "Ottawa",
    countryName: "Canada",
    description: "Visit national museums, Parliament Hill, canals, and attractive riverside spaces.",
    image: "https://loremflickr.com/900/600/Ottawa,Canada"
  },
  {
    name: "Calgary",
    countryName: "Canada",
    description: "Discover a modern city with cultural attractions and access to the Canadian Rockies.",
    image: "https://loremflickr.com/900/600/Calgary,Canada"
  },
  {
    name: "Victoria",
    countryName: "Canada",
    description: "Enjoy harbor scenery, gardens, historic buildings, and a relaxed island atmosphere.",
    image: "https://loremflickr.com/900/600/Victoria,Canada"
  },
  {
    name: "Mexico City",
    countryName: "Mexico",
    description: "Explore major museums, historic plazas, colorful neighborhoods, and renowned cuisine.",
    image: "https://loremflickr.com/900/600/Mexico,City,Mexico"
  },
  {
    name: "Cancun",
    countryName: "Mexico",
    description: "Enjoy Caribbean beaches, turquoise water, resorts, and access to nearby Mayan sites.",
    image: "https://loremflickr.com/900/600/Cancun,Mexico"
  },
  {
    name: "Oaxaca",
    countryName: "Mexico",
    description: "Discover traditional markets, colonial streets, regional food, and rich cultural heritage.",
    image: "https://loremflickr.com/900/600/Oaxaca,Mexico"
  },
  {
    name: "Guadalajara",
    countryName: "Mexico",
    description: "Explore historic plazas, museums, mariachi traditions, and local cuisine.",
    image: "https://loremflickr.com/900/600/Guadalajara,Mexico"
  },
  {
    name: "Merida",
    countryName: "Mexico",
    description: "Visit a charming colonial city with lively squares, museums, and nearby archaeological sites.",
    image: "https://loremflickr.com/900/600/Merida,Mexico"
  },
  {
    name: "Puebla",
    countryName: "Mexico",
    description: "Discover colorful architecture, historic churches, and celebrated regional dishes.",
    image: "https://loremflickr.com/900/600/Puebla,Mexico"
  },
  {
    name: "San Miguel de Allende",
    countryName: "Mexico",
    description: "Enjoy cobbled streets, art galleries, historic buildings, and a lively central square.",
    image: "https://loremflickr.com/900/600/San,Miguel,de,Allende,Mexico"
  },
    {
    name: "Rio de Janeiro",
    countryName: "Brazil",
    description: "Discover famous beaches, Sugarloaf Mountain, Christ the Redeemer, and lively neighborhoods.",
    image: "https://loremflickr.com/900/600/Rio,de,Janeiro,Brazil"
  },
  {
    name: "Sao Paulo",
    countryName: "Brazil",
    description: "Explore a major cultural center filled with museums, restaurants, art, and city attractions.",
    image: "https://loremflickr.com/900/600/Sao,Paulo,Brazil"
  },
  {
    name: "Salvador",
    countryName: "Brazil",
    description: "Enjoy colorful colonial streets, Afro-Brazilian culture, music, and coastal scenery.",
    image: "https://loremflickr.com/900/600/Salvador,Brazil"
  },
  {
    name: "Florianopolis",
    countryName: "Brazil",
    description: "Discover beautiful beaches, island landscapes, surfing spots, and outdoor activities.",
    image: "https://loremflickr.com/900/600/Florianopolis,Brazil"
  },
  {
    name: "Brasilia",
    countryName: "Brazil",
    description: "Explore modernist architecture, monumental public spaces, and the distinctive design of Brazil’s capital.",
    image: "https://loremflickr.com/900/600/Brasilia,Brazil"
  },
  {
    name: "Foz do Iguacu",
    countryName: "Brazil",
    description: "Visit the spectacular Iguazu Falls and enjoy nature trails and wildlife experiences.",
    image: "https://loremflickr.com/900/600/Foz,do,Iguacu,Brazil"
  },
  {
    name: "Paraty",
    countryName: "Brazil",
    description: "Explore a charming colonial town with cobbled streets, beaches, and nearby islands.",
    image: "https://loremflickr.com/900/600/Paraty,Brazil"
  },
  {
    name: "Sydney",
    countryName: "Australia",
    description: "Discover the Opera House, Harbour Bridge, famous beaches, and vibrant waterfront areas.",
    image: "https://loremflickr.com/900/600/Sydney,Australia"
  },
  {
    name: "Melbourne",
    countryName: "Australia",
    description: "Enjoy laneways, cafés, street art, museums, and a lively cultural scene.",
    image: "https://loremflickr.com/900/600/Melbourne,Australia"
  },
  {
    name: "Brisbane",
    countryName: "Australia",
    description: "Explore riverside attractions, green spaces, galleries, and nearby coastal destinations.",
    image: "https://loremflickr.com/900/600/Brisbane,Australia"
  },
  {
    name: "Perth",
    countryName: "Australia",
    description: "Discover sunny beaches, Kings Park, waterfront areas, and nearby nature attractions.",
    image: "https://loremflickr.com/900/600/Perth,Australia"
  },
  {
    name: "Gold Coast",
    countryName: "Australia",
    description: "Enjoy sandy beaches, surfing, theme parks, and scenic hinterland landscapes.",
    image: "https://loremflickr.com/900/600/Gold,Coast,Australia"
  },
  {
    name: "Adelaide",
    countryName: "Australia",
    description: "Explore cultural festivals, museums, gardens, and nearby wine regions.",
    image: "https://loremflickr.com/900/600/Adelaide,Australia"
  },
  {
    name: "Cairns",
    countryName: "Australia",
    description: "Discover tropical scenery and access to the Great Barrier Reef and rainforest.",
    image: "https://loremflickr.com/900/600/Cairns,Australia"
  },
  {
    name: "Auckland",
    countryName: "New Zealand",
    description: "Explore harbors, volcanic viewpoints, waterfront attractions, and nearby islands.",
    image: "https://loremflickr.com/900/600/Auckland,New,Zealand"
  },
  {
    name: "Wellington",
    countryName: "New Zealand",
    description: "Discover museums, a scenic harbor, creative neighborhoods, and the capital’s café culture.",
    image: "https://loremflickr.com/900/600/Wellington,New,Zealand"
  },
  {
    name: "Queenstown",
    countryName: "New Zealand",
    description: "Enjoy dramatic mountain scenery, lake views, and outdoor adventure activities.",
    image: "https://loremflickr.com/900/600/Queenstown,New,Zealand"
  },
  {
    name: "Christchurch",
    countryName: "New Zealand",
    description: "Explore gardens, riverside areas, historic buildings, and creative city spaces.",
    image: "https://loremflickr.com/900/600/Christchurch,New,Zealand"
  },
  {
    name: "Rotorua",
    countryName: "New Zealand",
    description: "Discover geothermal landscapes, hot springs, and Maori cultural experiences.",
    image: "https://loremflickr.com/900/600/Rotorua,New,Zealand"
  },
  {
    name: "Taupo",
    countryName: "New Zealand",
    description: "Enjoy a large volcanic lake, waterfalls, hiking trails, and outdoor recreation.",
    image: "https://loremflickr.com/900/600/Taupo,New,Zealand"
  },
  {
    name: "Dunedin",
    countryName: "New Zealand",
    description: "Explore historic architecture, coastal scenery, wildlife, and the Otago Peninsula.",
    image: "https://loremflickr.com/900/600/Dunedin,New,Zealand"
  },
  {
    name: "Kuala Lumpur",
    countryName: "Malaysia",
    description: "Discover the Petronas Towers, lively markets, cultural neighborhoods, and diverse food.",
    image: "https://loremflickr.com/900/600/Kuala,Lumpur,Malaysia"
  },
  {
    name: "George Town",
    countryName: "Malaysia",
    description: "Explore colorful street art, heritage buildings, temples, and famous local food.",
    image: "https://loremflickr.com/900/600/George,Town,Penang,Malaysia"
  },
  {
    name: "Langkawi",
    countryName: "Malaysia",
    description: "Enjoy tropical beaches, island scenery, waterfalls, and the Langkawi Sky Bridge.",
    image: "https://loremflickr.com/900/600/Langkawi,Malaysia"
  },
  {
    name: "Malacca",
    countryName: "Malaysia",
    description: "Discover historic streets, riverside attractions, museums, and a blend of cultural influences.",
    image: "https://loremflickr.com/900/600/Malacca,Malaysia"
  },
  {
    name: "Kota Kinabalu",
    countryName: "Malaysia",
    description: "Explore coastal islands, lively markets, and access to Mount Kinabalu.",
    image: "https://loremflickr.com/900/600/Kota,Kinabalu,Malaysia"
  },
  {
    name: "Ipoh",
    countryName: "Malaysia",
    description: "Enjoy colonial architecture, cave temples, local food, and nearby limestone landscapes.",
    image: "https://loremflickr.com/900/600/Ipoh,Malaysia"
  },
  {
    name: "Kuching",
    countryName: "Malaysia",
    description: "Discover riverside attractions, cultural museums, and access to Borneo’s nature reserves.",
    image: "https://loremflickr.com/900/600/Kuching,Malaysia"
  },
  {
    name: "Hanoi",
    countryName: "Vietnam",
    description: "Explore the Old Quarter, historic temples, lakes, and traditional Vietnamese food.",
    image: "https://loremflickr.com/900/600/Hanoi,Vietnam"
  },
  {
    name: "Ho Chi Minh City",
    countryName: "Vietnam",
    description: "Discover bustling markets, historic landmarks, museums, and energetic city streets.",
    image: "https://loremflickr.com/900/600/Ho,Chi,Minh,City,Vietnam"
  },
  {
    name: "Da Nang",
    countryName: "Vietnam",
    description: "Enjoy sandy beaches, the Marble Mountains, and access to nearby cultural attractions.",
    image: "https://loremflickr.com/900/600/Da,Nang,Vietnam"
  },
  {
    name: "Hoi An",
    countryName: "Vietnam",
    description: "Explore lantern-lit streets, historic architecture, riverside cafés, and traditional markets.",
    image: "https://loremflickr.com/900/600/Hoi,An,Vietnam"
  },
  {
    name: "Hue",
    countryName: "Vietnam",
    description: "Discover the Imperial City, royal tombs, historic pagodas, and riverside scenery.",
    image: "https://loremflickr.com/900/600/Hue,Vietnam"
  },
  {
    name: "Nha Trang",
    countryName: "Vietnam",
    description: "Enjoy coastal beaches, island excursions, snorkeling, and waterfront attractions.",
    image: "https://loremflickr.com/900/600/Nha,Trang,Vietnam"
  },
  {
    name: "Sapa",
    countryName: "Vietnam",
    description: "Explore mountain scenery, terraced rice fields, trekking routes, and local villages.",
    image: "https://loremflickr.com/900/600/Sapa,Vietnam"
  },
  {
    name: "Seoul",
    countryName: "South Korea",
    description: "Discover royal palaces, modern districts, markets, museums, and Korean food culture.",
    image: "https://loremflickr.com/900/600/Seoul,South,Korea"
  },
  {
    name: "Busan",
    countryName: "South Korea",
    description: "Enjoy beaches, seafood markets, coastal temples, and colorful hillside neighborhoods.",
    image: "https://loremflickr.com/900/600/Busan,South,Korea"
  },
  {
    name: "Jeju Island",
    countryName: "South Korea",
    description: "Explore volcanic landscapes, waterfalls, scenic coastlines, and outdoor trails.",
    image: "https://loremflickr.com/900/600/Jeju,Island,South,Korea"
  },
  {
    name: "Gyeongju",
    countryName: "South Korea",
    description: "Discover ancient tombs, temples, historic sites, and the heritage of the Silla Kingdom.",
    image: "https://loremflickr.com/900/600/Gyeongju,South,Korea"
  },
  {
    name: "Incheon",
    countryName: "South Korea",
    description: "Explore waterfront districts, cultural neighborhoods, parks, and modern architecture.",
    image: "https://loremflickr.com/900/600/Incheon,South,Korea"
  },
  {
    name: "Suwon",
    countryName: "South Korea",
    description: "Visit Hwaseong Fortress, historic gates, traditional streets, and cultural attractions.",
    image: "https://loremflickr.com/900/600/Suwon,South,Korea"
  },
  {
    name: "Jeonju",
    countryName: "South Korea",
    description: "Enjoy traditional hanok houses, local cuisine, cultural workshops, and historic streets.",
    image: "https://loremflickr.com/900/600/Jeonju,South,Korea"
  },
  {
    name: "Singapore",
    countryName: "Singapore",
    description: "Discover Marina Bay, Gardens by the Bay, diverse neighborhoods, and famous food centers.",
    image: "https://loremflickr.com/900/600/Singapore"
  },
  {
    name: "Sentosa",
    countryName: "Singapore",
    description: "Enjoy resort attractions, sandy beaches, entertainment, and family-friendly activities.",
    image: "https://loremflickr.com/900/600/Sentosa,Singapore"
  },
  {
    name: "Jurong",
    countryName: "Singapore",
    description: "Explore gardens, science attractions, parks, and cultural experiences in western Singapore.",
    image: "https://loremflickr.com/900/600/Jurong,Singapore"
  },
  {
    name: "Changi",
    countryName: "Singapore",
    description: "Discover waterfront walks, coastal parks, and the famous Jewel complex.",
    image: "https://loremflickr.com/900/600/Changi,Singapore"
  },
  {
    name: "Little India",
    countryName: "Singapore",
    description: "Explore colorful streets, temples, traditional shops, and Indian cuisine.",
    image: "https://loremflickr.com/900/600/Little,India,Singapore"
  },
  {
    name: "Chinatown",
    countryName: "Singapore",
    description: "Discover heritage streets, temples, markets, and a variety of local food.",
    image: "https://loremflickr.com/900/600/Chinatown,Singapore"
  },
  {
    name: "Kampong Glam",
    countryName: "Singapore",
    description: "Enjoy historic architecture, independent shops, cafés, and the Sultan Mosque area.",
    image: "https://loremflickr.com/900/600/Kampong,Glam,Singapore"
  },
    {
    name: "Mumbai",
    countryName: "India",
    description: "Discover historic landmarks, lively markets, coastal promenades, and a diverse food scene.",
    image: "https://loremflickr.com/900/600/Mumbai,India"
  },
  {
    name: "Delhi",
    countryName: "India",
    description: "Explore historic forts, grand monuments, colorful markets, and famous street food.",
    image: "https://loremflickr.com/900/600/Delhi,India"
  },
  {
    name: "Jaipur",
    countryName: "India",
    description: "Discover pink-colored architecture, royal palaces, forts, and traditional bazaars.",
    image: "https://loremflickr.com/900/600/Jaipur,India"
  },
  {
    name: "Agra",
    countryName: "India",
    description: "Visit the Taj Mahal, Agra Fort, and other remarkable Mughal-era landmarks.",
    image: "https://loremflickr.com/900/600/Agra,India"
  },
  {
    name: "Goa",
    countryName: "India",
    description: "Enjoy tropical beaches, Portuguese-influenced architecture, markets, and coastal villages.",
    image: "https://loremflickr.com/900/600/Goa,India"
  },
  {
    name: "Varanasi",
    countryName: "India",
    description: "Experience riverside ghats, ancient temples, and the cultural traditions of the Ganges.",
    image: "https://loremflickr.com/900/600/Varanasi,India"
  },
  {
    name: "Udaipur",
    countryName: "India",
    description: "Explore lakeside palaces, historic streets, gardens, and scenic views.",
    image: "https://loremflickr.com/900/600/Udaipur,India"
  },
  {
    name: "Colombo",
    countryName: "Sri Lanka",
    description: "Discover coastal promenades, temples, museums, markets, and the capital’s urban culture.",
    image: "https://loremflickr.com/900/600/Colombo,Sri,Lanka"
  },
  {
    name: "Kandy",
    countryName: "Sri Lanka",
    description: "Explore the Temple of the Tooth, scenic lake views, and surrounding hills.",
    image: "https://loremflickr.com/900/600/Kandy,Sri,Lanka"
  },
  {
    name: "Galle",
    countryName: "Sri Lanka",
    description: "Discover a historic Dutch fort, colonial streets, coastal views, and charming cafés.",
    image: "https://loremflickr.com/900/600/Galle,Sri,Lanka"
  },
  {
    name: "Ella",
    countryName: "Sri Lanka",
    description: "Enjoy mountain scenery, tea plantations, waterfalls, and scenic hiking trails.",
    image: "https://loremflickr.com/900/600/Ella,Sri,Lanka"
  },
  {
    name: "Sigiriya",
    countryName: "Sri Lanka",
    description: "Visit the famous rock fortress, ancient gardens, and surrounding countryside.",
    image: "https://loremflickr.com/900/600/Sigiriya,Sri,Lanka"
  },
  {
    name: "Nuwara Eliya",
    countryName: "Sri Lanka",
    description: "Explore tea estates, cool mountain landscapes, gardens, and colonial-era architecture.",
    image: "https://loremflickr.com/900/600/Nuwara,Eliya,Sri,Lanka"
  },
  {
    name: "Mirissa",
    countryName: "Sri Lanka",
    description: "Enjoy sandy beaches, coastal cafés, whale-watching excursions, and ocean views.",
    image: "https://loremflickr.com/900/600/Mirissa,Sri,Lanka"
  },
  {
    name: "Manila",
    countryName: "Philippines",
    description: "Explore historic Intramuros, museums, markets, and the capital’s lively neighborhoods.",
    image: "https://loremflickr.com/900/600/Manila,Philippines"
  },
  {
    name: "Cebu City",
    countryName: "Philippines",
    description: "Discover historic landmarks, island excursions, beaches, and local food.",
    image: "https://loremflickr.com/900/600/Cebu,City,Philippines"
  },
  {
    name: "Boracay",
    countryName: "Philippines",
    description: "Enjoy white-sand beaches, turquoise waters, water sports, and island sunsets.",
    image: "https://loremflickr.com/900/600/Boracay,Philippines"
  },
  {
    name: "Palawan",
    countryName: "Philippines",
    description: "Explore limestone cliffs, clear lagoons, island beaches, and snorkeling spots.",
    image: "https://loremflickr.com/900/600/Palawan,Philippines"
  },
  {
    name: "Bohol",
    countryName: "Philippines",
    description: "Discover the Chocolate Hills, river cruises, beaches, and unique wildlife.",
    image: "https://loremflickr.com/900/600/Bohol,Philippines"
  },
  {
    name: "Davao",
    countryName: "Philippines",
    description: "Enjoy mountain landscapes, parks, local markets, and access to nature attractions.",
    image: "https://loremflickr.com/900/600/Davao,Philippines"
  },
  {
    name: "Baguio",
    countryName: "Philippines",
    description: "Explore cool mountain scenery, gardens, local markets, and cultural attractions.",
    image: "https://loremflickr.com/900/600/Baguio,Philippines"
  },
  {
    name: "Dublin",
    countryName: "Ireland",
    description: "Discover historic streets, museums, literary landmarks, parks, and traditional pubs.",
    image: "https://loremflickr.com/900/600/Dublin,Ireland"
  },
  {
    name: "Galway",
    countryName: "Ireland",
    description: "Enjoy colorful streets, live music, coastal scenery, and a lively arts scene.",
    image: "https://loremflickr.com/900/600/Galway,Ireland"
  },
  {
    name: "Cork",
    countryName: "Ireland",
    description: "Explore historic markets, riverside streets, museums, and nearby coastal attractions.",
    image: "https://loremflickr.com/900/600/Cork,Ireland"
  },
  {
    name: "Killarney",
    countryName: "Ireland",
    description: "Discover lakes, mountains, national park trails, and scenic countryside.",
    image: "https://loremflickr.com/900/600/Killarney,Ireland"
  },
  {
    name: "Kilkenny",
    countryName: "Ireland",
    description: "Visit a medieval castle, historic lanes, traditional pubs, and cultural attractions.",
    image: "https://loremflickr.com/900/600/Kilkenny,Ireland"
  },
  {
    name: "Limerick",
    countryName: "Ireland",
    description: "Explore King John's Castle, riverside walks, museums, and historic landmarks.",
    image: "https://loremflickr.com/900/600/Limerick,Ireland"
  },
  {
    name: "Dingle",
    countryName: "Ireland",
    description: "Enjoy a scenic coastal town with colorful buildings, harbor views, and countryside drives.",
    image: "https://loremflickr.com/900/600/Dingle,Ireland"
  },
  {
    name: "Brussels",
    countryName: "Belgium",
    description: "Discover the Grand Place, museums, historic architecture, and famous Belgian food.",
    image: "https://loremflickr.com/900/600/Brussels,Belgium"
  },
  {
    name: "Bruges",
    countryName: "Belgium",
    description: "Explore medieval canals, cobbled streets, historic squares, and charming old buildings.",
    image: "https://loremflickr.com/900/600/Bruges,Belgium"
  },
  {
    name: "Ghent",
    countryName: "Belgium",
    description: "Discover historic guild houses, canals, castles, and a lively cultural atmosphere.",
    image: "https://loremflickr.com/900/600/Ghent,Belgium"
  },
  {
    name: "Antwerp",
    countryName: "Belgium",
    description: "Explore fashion districts, historic architecture, museums, and a vibrant harbor area.",
    image: "https://loremflickr.com/900/600/Antwerp,Belgium"
  },
  {
    name: "Leuven",
    countryName: "Belgium",
    description: "Enjoy a historic university town with beautiful architecture, squares, and cafés.",
    image: "https://loremflickr.com/900/600/Leuven,Belgium"
  },
  {
    name: "Namur",
    countryName: "Belgium",
    description: "Visit a hilltop citadel, riverside areas, historic streets, and scenic viewpoints.",
    image: "https://loremflickr.com/900/600/Namur,Belgium"
  },
  {
    name: "Dinant",
    countryName: "Belgium",
    description: "Discover a picturesque riverside town with a cliffside citadel and distinctive architecture.",
    image: "https://loremflickr.com/900/600/Dinant,Belgium"
  },
  {
    name: "Prague",
    countryName: "Czech Republic",
    description: "Explore Charles Bridge, Prague Castle, historic squares, and beautiful old-town streets.",
    image: "https://loremflickr.com/900/600/Prague,Czech,Republic"
  },
  {
    name: "Brno",
    countryName: "Czech Republic",
    description: "Discover historic architecture, lively cafés, museums, and a vibrant cultural scene.",
    image: "https://loremflickr.com/900/600/Brno,Czech,Republic"
  },
  {
    name: "Cesky Krumlov",
    countryName: "Czech Republic",
    description: "Enjoy a fairytale-like old town, riverside views, and a historic castle.",
    image: "https://loremflickr.com/900/600/Cesky,Krumlov,Czech,Republic"
  },
  {
    name: "Karlovy Vary",
    countryName: "Czech Republic",
    description: "Explore elegant spa buildings, mineral springs, and scenic riverside promenades.",
    image: "https://loremflickr.com/900/600/Karlovy,Vary,Czech,Republic"
  },
  {
    name: "Kutna Hora",
    countryName: "Czech Republic",
    description: "Discover medieval architecture, the famous Sedlec Ossuary, and historic mining heritage.",
    image: "https://loremflickr.com/900/600/Kutna,Hora,Czech,Republic"
  },
  {
    name: "Olomouc",
    countryName: "Czech Republic",
    description: "Explore historic squares, fountains, churches, and a welcoming university-town atmosphere.",
    image: "https://loremflickr.com/900/600/Olomouc,Czech,Republic"
  },
  {
    name: "Pilsen",
    countryName: "Czech Republic",
    description: "Discover historic streets, cultural attractions, and the city’s brewing heritage.",
    image: "https://loremflickr.com/900/600/Pilsen,Czech,Republic"
  },
  {
    name: "Budapest",
    countryName: "Hungary",
    description: "Explore the Danube riverfront, grand architecture, thermal baths, and historic neighborhoods.",
    image: "https://loremflickr.com/900/600/Budapest,Hungary"
  },
  {
    name: "Eger",
    countryName: "Hungary",
    description: "Discover a historic castle, baroque streets, thermal baths, and nearby vineyards.",
    image: "https://loremflickr.com/900/600/Eger,Hungary"
  },
  {
    name: "Pecs",
    countryName: "Hungary",
    description: "Explore museums, historic architecture, lively squares, and cultural landmarks.",
    image: "https://loremflickr.com/900/600/Pecs,Hungary"
  },
  {
    name: "Szeged",
    countryName: "Hungary",
    description: "Enjoy grand squares, riverside walks, impressive architecture, and local food.",
    image: "https://loremflickr.com/900/600/Szeged,Hungary"
  },
  {
    name: "Debrecen",
    countryName: "Hungary",
    description: "Discover historic churches, museums, parks, and the cultural life of eastern Hungary.",
    image: "https://loremflickr.com/900/600/Debrecen,Hungary"
  },
  {
    name: "Szentendre",
    countryName: "Hungary",
    description: "Explore colorful streets, art galleries, museums, and a charming riverside setting.",
    image: "https://loremflickr.com/900/600/Szentendre,Hungary"
  },
  {
    name: "Lake Balaton",
    countryName: "Hungary",
    description: "Enjoy lakeside towns, beaches, cycling routes, and scenic countryside.",
    image: "https://loremflickr.com/900/600/Lake,Balaton,Hungary"
  },
  {
    name: "Warsaw",
    countryName: "Poland",
    description: "Discover the reconstructed Old Town, museums, royal landmarks, and modern city districts.",
    image: "https://loremflickr.com/900/600/Warsaw,Poland"
  },
  {
    name: "Krakow",
    countryName: "Poland",
    description: "Explore medieval squares, Wawel Castle, historic churches, and lively cafés.",
    image: "https://loremflickr.com/900/600/Krakow,Poland"
  },
  {
    name: "Gdansk",
    countryName: "Poland",
    description: "Discover a historic Baltic port with colorful architecture, waterfront walks, and museums.",
    image: "https://loremflickr.com/900/600/Gdansk,Poland"
  },
  {
    name: "Wroclaw",
    countryName: "Poland",
    description: "Enjoy charming bridges, colorful market squares, historic buildings, and riverside islands.",
    image: "https://loremflickr.com/900/600/Wroclaw,Poland"
  },
  {
    name: "Poznan",
    countryName: "Poland",
    description: "Explore a lively old market square, historic architecture, museums, and local cuisine.",
    image: "https://loremflickr.com/900/600/Poznan,Poland"
  },
  {
    name: "Zakopane",
    countryName: "Poland",
    description: "Discover mountain scenery, wooden architecture, hiking trails, and winter sports.",
    image: "https://loremflickr.com/900/600/Zakopane,Poland"
  },
  {
    name: "Lodz",
    countryName: "Poland",
    description: "Explore industrial heritage, street art, creative spaces, and lively cultural streets.",
    image: "https://loremflickr.com/900/600/Lodz,Poland"
  },
  {
    name: "Buenos Aires",
    countryName: "Argentina",
    description: "Discover tango culture, elegant architecture, historic cafés, and lively neighborhoods.",
    image: "https://loremflickr.com/900/600/Buenos,Aires,Argentina"
  },
  {
    name: "Mendoza",
    countryName: "Argentina",
    description: "Enjoy vineyards, mountain views, outdoor adventures, and regional food.",
    image: "https://loremflickr.com/900/600/Mendoza,Argentina"
  },
  {
    name: "Bariloche",
    countryName: "Argentina",
    description: "Explore alpine-style architecture, lakes, forests, and mountain activities.",
    image: "https://loremflickr.com/900/600/Bariloche,Argentina"
  },
  {
    name: "Ushuaia",
    countryName: "Argentina",
    description: "Discover dramatic mountain and sea scenery, national parks, and southern adventure routes.",
    image: "https://loremflickr.com/900/600/Ushuaia,Argentina"
  },
  {
    name: "Salta",
    countryName: "Argentina",
    description: "Explore colonial architecture, mountain landscapes, traditional markets, and regional culture.",
    image: "https://loremflickr.com/900/600/Salta,Argentina"
  },
  {
    name: "Cordoba",
    countryName: "Argentina",
    description: "Discover historic churches, university heritage, museums, and lively cultural spaces.",
    image: "https://loremflickr.com/900/600/Cordoba,Argentina"
  },
  {
    name: "El Calafate",
    countryName: "Argentina",
    description: "Visit a gateway to glaciers, mountain landscapes, and spectacular Patagonian scenery.",
    image: "https://loremflickr.com/900/600/El,Calafate,Argentina"
  },
  {
    name: "Santiago",
    countryName: "Chile",
    description: "Explore museums, historic neighborhoods, mountain viewpoints, and lively city markets.",
    image: "https://loremflickr.com/900/600/Santiago,Chile"
  },
  {
    name: "Valparaiso",
    countryName: "Chile",
    description: "Discover colorful hillside houses, street art, historic elevators, and harbor views.",
    image: "https://loremflickr.com/900/600/Valparaiso,Chile"
  },
  {
    name: "San Pedro de Atacama",
    countryName: "Chile",
    description: "Explore desert landscapes, salt flats, geysers, and remarkable night skies.",
    image: "https://loremflickr.com/900/600/San,Pedro,de,Atacama,Chile"
  },
  {
    name: "Puerto Varas",
    countryName: "Chile",
    description: "Enjoy lakeside scenery, volcano views, and outdoor activities in the Lake District.",
    image: "https://loremflickr.com/900/600/Puerto,Varas,Chile"
  },
  {
    name: "Punta Arenas",
    countryName: "Chile",
    description: "Discover Patagonian history, coastal scenery, and access to wildlife excursions.",
    image: "https://loremflickr.com/900/600/Punta,Arenas,Chile"
  },
  {
    name: "La Serena",
    countryName: "Chile",
    description: "Explore beaches, historic churches, coastal attractions, and nearby observatories.",
    image: "https://loremflickr.com/900/600/La,Serena,Chile"
  },
  {
    name: "Easter Island",
    countryName: "Chile",
    description: "Discover the famous moai statues, volcanic landscapes, and the unique heritage of Rapa Nui.",
    image: "https://loremflickr.com/900/600/Easter,Island,Chile"
  },
  {
    name: "Lima",
    countryName: "Peru",
    description: "Explore historic plazas, coastal cliffs, museums, and Peru’s celebrated food scene.",
    image: "https://loremflickr.com/900/600/Lima,Peru"
  },
  {
    name: "Cusco",
    countryName: "Peru",
    description: "Discover Inca heritage, colonial streets, traditional markets, and access to Machu Picchu.",
    image: "https://loremflickr.com/900/600/Cusco,Peru"
  },
  {
    name: "Arequipa",
    countryName: "Peru",
    description: "Explore white volcanic-stone architecture, historic plazas, and nearby canyon landscapes.",
    image: "https://loremflickr.com/900/600/Arequipa,Peru"
  },
  {
    name: "Puno",
    countryName: "Peru",
    description: "Discover Lake Titicaca, traditional communities, and the region’s cultural heritage.",
    image: "https://loremflickr.com/900/600/Puno,Peru"
  },
  {
    name: "Iquitos",
    countryName: "Peru",
    description: "Explore Amazon rainforest experiences, river journeys, and distinctive local culture.",
    image: "https://loremflickr.com/900/600/Iquitos,Peru"
  },
  {
    name: "Paracas",
    countryName: "Peru",
    description: "Enjoy coastal desert scenery, wildlife excursions, and boat trips to the Ballestas Islands.",
    image: "https://loremflickr.com/900/600/Paracas,Peru"
  },
  {
    name: "Huaraz",
    countryName: "Peru",
    description: "Discover the Andes, turquoise mountain lakes, and challenging hiking routes.",
    image: "https://loremflickr.com/900/600/Huaraz,Peru"
  },
  {
    name: "Nairobi",
    countryName: "Kenya",
    description: "Explore urban culture, museums, markets, and the unique Nairobi National Park.",
    image: "https://loremflickr.com/900/600/Nairobi,Kenya"
  },
  {
    name: "Mombasa",
    countryName: "Kenya",
    description: "Discover historic coastal streets, sandy beaches, Fort Jesus, and Swahili culture.",
    image: "https://loremflickr.com/900/600/Mombasa,Kenya"
  },
  {
    name: "Maasai Mara",
    countryName: "Kenya",
    description: "Experience wildlife safaris, open savannah landscapes, and seasonal animal migrations.",
    image: "https://loremflickr.com/900/600/Maasai,Mara,Kenya"
  },
  {
    name: "Nakuru",
    countryName: "Kenya",
    description: "Explore Lake Nakuru National Park, wildlife habitats, and scenic landscapes.",
    image: "https://loremflickr.com/900/600/Nakuru,Kenya"
  },
  {
    name: "Naivasha",
    countryName: "Kenya",
    description: "Enjoy lake views, boat excursions, birdwatching, and nearby nature reserves.",
    image: "https://loremflickr.com/900/600/Naivasha,Kenya"
  },
  {
    name: "Diani Beach",
    countryName: "Kenya",
    description: "Relax on white-sand beaches, enjoy water sports, and discover coastal nature.",
    image: "https://loremflickr.com/900/600/Diani,Beach,Kenya"
  },
  {
    name: "Amboseli",
    countryName: "Kenya",
    description: "Discover elephant herds, open plains, and spectacular views of Mount Kilimanjaro.",
    image: "https://loremflickr.com/900/600/Amboseli,Kenya"
  },
  {
    name: "Zanzibar City",
    countryName: "Tanzania",
    description: "Explore Stone Town’s historic streets, markets, architecture, and coastal atmosphere.",
    image: "https://loremflickr.com/900/600/Zanzibar,City,Tanzania"
  },
  {
    name: "Arusha",
    countryName: "Tanzania",
    description: "Discover a lively gateway to safari parks, mountain landscapes, and local markets.",
    image: "https://loremflickr.com/900/600/Arusha,Tanzania"
  },
  {
    name: "Dar es Salaam",
    countryName: "Tanzania",
    description: "Enjoy coastal attractions, markets, museums, and access to nearby islands.",
    image: "https://loremflickr.com/900/600/Dar,es,Salaam,Tanzania"
  },
  {
    name: "Moshi",
    countryName: "Tanzania",
    description: "Explore the foothills of Mount Kilimanjaro, coffee farms, and scenic countryside.",
    image: "https://loremflickr.com/900/600/Moshi,Tanzania"
  },
  {
    name: "Serengeti",
    countryName: "Tanzania",
    description: "Experience iconic wildlife safaris, vast plains, and the Great Migration.",
    image: "https://loremflickr.com/900/600/Serengeti,Tanzania"
  },
  {
    name: "Ngorongoro",
    countryName: "Tanzania",
    description: "Discover a remarkable volcanic crater, rich wildlife, and dramatic natural scenery.",
    image: "https://loremflickr.com/900/600/Ngorongoro,Tanzania"
  },
  {
    name: "Mwanza",
    countryName: "Tanzania",
    description: "Enjoy Lake Victoria views, rocky landscapes, local markets, and lakeside culture.",
    image: "https://loremflickr.com/900/600/Mwanza,Tanzania"
  },];

const seedDestinations = async () => {
  let addedCount = 0;
  let skippedCount = 0;
  let missingCountryCount = 0;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");

    for (const destinationData of destinations) {
      const country = await Country.findOne({
        name: destinationData.countryName
      });

      if (!country) {
        console.log(`Country not found: ${destinationData.countryName}`);
        missingCountryCount++;
        continue;
      }

      const result = await Destination.updateOne(
        {
          name: destinationData.name,
          country: country._id
        },
        {
          $setOnInsert: {
            name: destinationData.name,
            country: country._id,
            description: destinationData.description,
            image: destinationData.image
          }
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        addedCount++;
      } else {
        skippedCount++;
      }
    }

    console.log("--------------------------------");
    console.log("Total destinations in file:", destinations.length);
    console.log("Added destinations:", addedCount);
    console.log("Already existing destinations:", skippedCount);
    console.log("Missing countries:", missingCountryCount);
    console.log("--------------------------------");

  } catch (error) {
    console.error("Error seeding destinations:", error);

  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
    }
  }
};

seedDestinations();