const express = require("express");
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const asanaRoutes = require("./routes/asana");
const ConnectDB = require("./config/config");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Test Route
app.get("/", (req, res) => {
    res.send("Welcome to Mindful-Motion API!");
});

app.use("/api/auth", authRoutes);

app.use("/api/asana", asanaRoutes);


//Server Starting and Connecting to Database
const PORT = process.env.PORT || 5000;

app.listen(PORT ,async () => {
  await ConnectDB()
  console.log(`Server running on http://localhost:${PORT}`)
});
