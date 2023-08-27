const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select : false
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
        type: Boolean
    }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
};

module.exports = mongoose.model('user', userSchema);