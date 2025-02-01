const User = require('../models/user.model');

const updateUser  = async(req , res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new : true,
        })

        if(!updatedUser) {
            return res.status(404).json({
                message : 'User not found'
            })
        } 
        res.status(200).json({
            message : "User has been Updated",
            date : updatedUser
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : 'User Update failed',
            error : error
        })
    }
};

const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : 'user has been deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "user deletion failed"
        })
    }
};

const getAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if(!admin){
            return res.status(404).json({
                message : "user not Found"
            })
        } else {
            return res.status(200).json({
                message : "user has been found successfully",
                data : admin,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "usr query failed",
            error : error,
        })
    }
};

const getAllUsers = async(req , res) => {
    try {
        const users = await User.find();
        
        return res.status(200).json({
            message  : "User has been Found",
            data : users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'Error Finding user',
            error : error,
        })
    }
}

module.exports = {
    updateUser, deleteUser, getAdmin, getAllUsers
}