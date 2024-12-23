const express = require("express"); //imopting express to write the restful Api
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//importing module dbconnect

const dbConnect = require("./dbConnect/dbConnection")

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on ${process.env.PORT || 5000}`);
    dbConnect();
})