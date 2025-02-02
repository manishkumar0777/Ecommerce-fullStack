const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("database connected sucessfully");
        
    } catch (err) {
        console.error("DataBase connection failed")
    }
};

module.exports = dbConnect;