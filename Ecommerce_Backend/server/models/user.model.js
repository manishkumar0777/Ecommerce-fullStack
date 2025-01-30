const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },

}, {timestamp  : true}); 

const User = model('users', userSchema);

module.exports = User;