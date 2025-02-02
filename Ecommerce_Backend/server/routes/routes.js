//imporing the routr from modules and express
const router = require("express").Router();

//importing the user route 
const authRoute = require("./auth.route.js");
const productRoute = require("./product.route.js");

//creating a base url
const base = "/api";


//All api routes
router.use(`${base}/auth`, authRoute);
router.use(`${base}/product`, productRoute);

//exporing the module
module.exports = router;