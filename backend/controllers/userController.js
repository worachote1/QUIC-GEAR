const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const bcrypt = require('bcrypt') 

// Get all users => GET api/users
const getAllUser = asyncHandler(async (req, res) => {
    const users = await user.find().populate('favList');
    res.status(200).json(users);
});

// Get single user => GET api/user/:id
const getUserData = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        const findbyUserId = await user.findById(userId).populate("favList");

        if(!findbyUserId) {
            return res.status(404).send('User not found!');
        } 

        res.status(200).json(findbyUserId);

    } catch(err) {
        console.log(err);
    }
});

// Create new user => POST api/users/create
const createUser = asyncHandler(async (req, res) => {
    try {
        const users = await user.create(req.body);

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
    if(req.body.password){
        hashPassword = await bcrypt.hash(req.body.password,10)
        updatedUser = {...req.body, password : hashPassword}
        users = await user.findByIdAndUpdate(req.params.id, updatedUser, {
            new: true,
        })
    }
    else{
        users = await user.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })       
    }
    res.status(200).json(users)
});

//Register a user
//route POST /api/users/register 
//access : public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { email, username,  password, confirmPassword } = req.body;

        // Check if user with the given username already exists
        const existingUser = await user.findOne({ username });
        if (existingUser) {
             return res.status(400).json({ message: 'Username already taken.' });
        }

        // Password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await user.create({
            email,
            username,
            password : hashPassword
        });

        res.status(201).json(newUser);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Login user
//route POST /api/users/login
//access : public 
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const userFound = await user.findOne({ username }).populate('favList');
    // console.log(userFound)
    if (!userFound) {
        return res.status(404).json({ message: 'Invalid username or password.' });
    }
    checkPassword = await bcrypt.compare(password,userFound.password) 
    if (!checkPassword) {
        return res.status(400).json({ message: 'incorrect password.' });
    }

    res.status(200).json({ ...userFound.toObject(), password});
});
   
module.exports = { getAllUser, getUserData,createUser, deleteUser, updateUser, loginUser, registerUser};