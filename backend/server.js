const express= require("express");
const app=express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const connectDB=require("./db");
const destRoute=require("./routes/destinationRoutes");
const placeRoute = require("./routes/placeRoutes");
const tripRoutes = require("./routes/tripRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const countryRoutes = require("./routes/countryRoutes");
const activityRouter = require("./routes/activityRouter");
const profileRoutes = require("./routes/profileRoutes");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://wanderly-trips.netlify.app"
    ]
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/destinations",destRoute);
app.use("/api/places",placeRoute);
app.use("/api/trips", tripRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/activities", activityRouter);


app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to Trip Planner!</h1>
        <h2>Backend API is running successfully.</h2>
        <p>Status: Online</p>
    `);
});

const PORT = 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();