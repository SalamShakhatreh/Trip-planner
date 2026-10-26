const express= require("express");
const app=express();
const authRoutes = require("./routes/authRoutes");
const testRoutes=require("./routes/testRoutes");

const connectDB=require("./db");
const { connect } = require("mongoose");
connectDB();

const destRoute=require("./routes/destinationRoutes");

const placeRoute = require("./routes/placeRoutes");

const tripRoutes = require("./routes/tripRoutes");



app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api",testRoutes);
app.use("/api/destinations",destRoute);
app.use("/api/places",placeRoute);
app.use("/api/trips", tripRoutes);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);

});