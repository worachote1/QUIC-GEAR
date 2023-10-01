const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'product'
            },
            imgPath: {
                type: String,
                required: true
            },
            brand: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            subType: {
                type: String,
                required: true
            }
        }
    ],
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    shippingInfo: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);