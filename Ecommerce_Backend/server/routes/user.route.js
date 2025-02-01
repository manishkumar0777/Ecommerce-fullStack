//imporing the router from express
const router = require("express").Router();
const { updateUser, deleteUser, getAdmin, getAllUsers } = require("../controllers/user.controller.js");
const {verifyToken, verifyAdmin} = require("../middlewares/verifyToken.js")

//getting the user to the server
router.get("/get-users", (req, res) => {
    res.send("User ahs been gotten")
}); 

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyAdmin, deleteUser);
router.get('/get-admin/:id', verifyAdmin, getAdmin);
router.get('/', verifyToken, getAllUsers);


module.exports = router;