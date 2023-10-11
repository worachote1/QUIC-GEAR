const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderItems:[{
        productID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
    orderStatus: {
        type: String,
        default: 'order received'
    },
    trackingNumber: {
        type: String,
        default: "THDL122XSE"
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