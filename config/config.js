const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const ConnectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB Connected")
    }
    catch(error){
        console.log("Error Unable to connect Database")
    }
}

module.exports = ConnectDB