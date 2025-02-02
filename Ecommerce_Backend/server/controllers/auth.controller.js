const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const register = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        //registration
        let user = await User.findOne({email});

        if(user) return res.status(400).json({message : "User Already Exist"});

        user = await User.create({name, email, password});
        await user.save();

        //jwt payload
        const payload = {user : {
            id : user._id,
            role : user.role,
        }}
        
        //jwt sign
        JWT.sign(payload, process.env.JWT_KEY, {expiresIn : "100h"}, (err, token) => {
            if(err) throw err;

            //send user and Token in res
            const info = user._doc;
            return res.status(200).json({
            data : {...info, token},
            message : "user logged in"
            })
        });


        res.status(200).json({
            message : "user Created",
            data : user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};


//logging in user and authentication

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email });
        if (!user) {
            return res.status(400).json({
                message : 'Invalid credentials'
            });
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({
            message : 'Invalid Email or Password'
        });

        //jwt payload
        const payload = {user : {
            id : user._id,
            role : user.role,
        }}
        
        //jwt sign
        JWT.sign(payload, process.env.JWT_KEY, {expiresIn : "100h"}, (err, token) => {
            if(err) throw err;

            //send user and Token in res
            const info = user._doc;
            return res.status(200).json({
            data : {...info, token},
            message : "user logged in"
            })
        });

        // const token = JWT.sign({
        //     userId : user._id,
        //     isAdmin : user.isAdmin,
        // }, process.env.JWT_KEY);

        // const info = user._doc;
        // return res.status(200).json({
        //     data : {...info, token},
        //     message : "user logged in"
        // });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'server error',
            error : error
        })
    }
};

module.exports = {
    register, login
}