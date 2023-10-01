const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// Get all users => GET api/users
const getAllUser = asyncHandler(async (req, res) => {
    const users = await user.find();
    res.status(200).json(users);
});

// Create new user => POST api/users/create
const createUser = asyncHandler(async (req, res) => {
    try {
        const { username,
                password,
                imgPath,
                role,
                email,
                address,
                phone,
                bankAccount: {
                    bank,
                    account_number,
                    account_name
                },
                coins,
                isGoogleAccount } = req.body;

        const users = await user.create({
            username,
            password,
            imgPath,
            role,
            email,
            address,
            phone,
            bankAccount: {
                bank,
                account_number,
                account_name
            },
            coins,
            isGoogleAccount 
        });

        res.status(200).json(users);
    } catch(err) {
        console.log(err)
    }
});

// Delete user => api/users/delete/:id
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        const deleteUserId = await user.findById(userId);

        if(!deleteUserId) {
            return res.status(404).send('User ID not found!');
        }

        await user.findByIdAndDelete(userId);

        res.status(200).send({
            message: `Deleted ${userId} from database`
        });
    } catch(err) {
        console.log(err);
    }
});

// Update user => api/users/update/:id
const updateUser = asyncHandler(async (req, res) => {
    let users = await user.findById(req.params.id);

    if(!users) {
        return res.status(404).send('User not found!');
    }

    users = await user.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(users)
});

// Login user => api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send('Please enter email & password');
    }

    const users = await user.findOne({ email }).select('+password');

    if(!users) {
        return res.status(400).send('Invalid Email or Password');
    }

    const isPasswordMatched = await users.comparePassword(password);

    if(!isPasswordMatched) {
        return res.status(401).send('Invalid Email or Password');
    }

    sendToken(users, 200, res);
});

// Logout user => api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
});

module.exports = { getAllUser, createUser, deleteUser, updateUser, loginUser, logoutUser };