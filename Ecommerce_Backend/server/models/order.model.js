const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
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

    amount : {
        type : Number,
        required : true,
    },

    address : {
        type : Object,
        required : true,
    },

    status : {
        type : String,
        default : "In Progress"
    },



}, {timeStamp : true})

const Order = model('order', orderSchema);

module.exports = Order;