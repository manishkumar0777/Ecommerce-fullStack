const router = require("express").Router();
const {register,login} = require('../controllers/auth.controller.js');
const { protect } = require("../middlewares/auth.middleware.js");



router.post('/register', register);

router.post('/login',login);

router.get('/profile', protect, async(req, res) => {
    res.json(req.user);
})

module.exports = router;