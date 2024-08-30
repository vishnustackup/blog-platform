
const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected");

    } catch (err) {
        console.error("could not connect to db")
    }
}

module.exports = connectDB