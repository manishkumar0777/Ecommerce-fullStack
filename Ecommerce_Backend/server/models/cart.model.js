const {Schema, model} = require('mongoose');

const cartSchema = new Schema({
    userId : {
        type : String,
        required : true,
    },

    product : [
        {
            productId : {
                type : String,
            },
            quantity : {
                type : Number,
                default : 1,
            },

        }
    ],


}, {timeStamp : true})

const Cart = model('cart', cartSchema);

module.exports = Cart;