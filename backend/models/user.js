const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bankAccount: {
        bank: {
            type: String,
            required: true
        },
        account_number: {
            type: String,
            required: true
        },
        account_name: {
            type: String,
            required: true
        },
    },
    coins: {
        type: Number,
        required: true
    },
    isGoogleAccount: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);