require("dotenv").config();
const mongoose = require("mongoose");

const migrateDestinations = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        const countryId = new mongoose.Types.ObjectId("6ae5d37f78d9858cb3d26206");

        const result = await mongoose.connection.collection("destinations").updateMany(
            { country: "Jordan" },
            { $set: { country: countryId } }
        );

        console.log("Updated destinations:", result.modifiedCount);
    } catch (error) {
        console.log("Migration error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

migrateDestinations();