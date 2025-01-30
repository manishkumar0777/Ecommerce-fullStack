//imporing the routr from modules and express
const router = require("express").Router();

//importing the user route 
const userRoute = require("./user.route.js");
const authRoute = require("./auth.route.js");

//creating a base url
const base = "/api/v1";


router.use(`${base}/users`, userRoute);
router.use(`${base}/auth`, authRoute);


//exporing the module
module.exports = router;