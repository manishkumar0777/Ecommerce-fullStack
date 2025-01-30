const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    title : {
        type : String,
        required : true,
    },

    desc : {
        type : String,
        required : true,
    },

    imageURL : {
        type : String,
        required : true,
    },

    categories : {
        type : Array,
        default : [],
    },

    size : {
        type : String,
    },

    color : {
        type : String,
    },

    price : {
        type : String,
    },


}, {timeStamp : true})

const Product = model('product', productSchema);

module.exports = Product;