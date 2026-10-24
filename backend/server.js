const express= require("express");
const app=express();
const testRoutes=require("./routes/testRoutes");

const connectDB=require("./db");
const { connect } = require("mongoose");
connectDB();

const destRoute=require("./routes/destinationRoutes");

const placeRoute = require("./routes/placeRoutes");



app.use(express.json());
app.use("/api",testRoutes);
app.use("/api/destinations",destRoute);
app.use("/api/places",placeRoute);

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);

});