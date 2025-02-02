const {Schema, model} = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        match : [/.+\@.+\..+/, "Please Enter the valid email Address"],
    },

    password : {
        type : String,
        required : true,
        minLength : 6,
    },

    role : {
        type : String,
        enum : ["ADMIN","USER"],
        default : 'USER'
    },
    salt : {
        type : String,
    },

    isAdmin : {
        type : Boolean,
        default : false,
    },

}, {timestamp  : true}); 

//password hashing -middleware
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//password matching -middleware
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//
// userSchema.static('matchPassword' , async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);

// })

const User = model('users', userSchema);

module.exports = User;