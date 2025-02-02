const dotenv = require("dotenv");
dotenv.config();

const express = require("express"); //imopting express to write the restful Api
const app = express();
const routes = require("./routes/routes.js");
const dbConnect = require("./database/dbConnection.js");
const cors = require('cors');

//middlewares
app.use(express.json());
app.use(cors());

//Api routes
app.use("/", routes);

app.get("/" , (req,res) => {
    
    res.send("My Backend Works")
})

//running the app on the portserver
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on ${process.env.PORT || 5000}`);
    dbConnect();
})