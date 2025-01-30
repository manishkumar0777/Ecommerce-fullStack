const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const register = async (req, res) => {
    const { userName, email, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10);
    try {
        await User.create({
            userName,
            email,
            password: hashedpassword,
        })
        res.end('user created :')
    } catch (error) {
        console.log(error);
        res.end('error')
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message : 'User not Exist'
            });
        }

        const comaredPassword = await bcrypt.compare(password, user.password);
        if (!comaredPassword) {
            return res.status(404).json({
                message : 'Email or password is Incorrect'
            });
        } 

        const token = JWT.sign({
            userId : user._id,
            isAdmin : user.isAdmin,
        }, process.env.JWT_KEY);

        const info = user._doc;
        return res.status(200).json({
            data : {...info, token},
            message : "user logged in"
        });

    } catch (error) {
        return res.status(500).json({
            message : 'Error logging in',
            error : error
        })
    }
};

module.exports = {
    register, login
}