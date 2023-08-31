const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    type: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    isWireless: {
        type: Boolean,
        required: true
    },
    isRGB: {
        type: Boolean,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalOrder: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('product', productSchema);