//imporing the router from express
const router = require("express").Router();
const {verifyToken} = require("../middlewares/verifyToken.js")

//getting the user to the server
router.get("/get-users", (req, res) => {
    res.send("User ahs been gotten")
}); 

router.put("/:id", verifyToken, async (req, res) => {

});

module.exports = router;