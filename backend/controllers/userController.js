const asyncHandler = require('express-async-handler');
const user = require('../models/user');

// Get all users => GET api/users
const getAllUser = asyncHandler(async (req, res) => {
    const users = await user.find();
    res.status(200).json(users);
});

// Get single user => GET api/users/:id
const getSingleUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        const targetUser = await user.findById(userId);

        if(!targetUser) {
            return res.status(404).send('User ID not found!');
        }

        res.status(200).json(targetUser);

    } catch(err) {
        console.log(err);
    }
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

module.exports = { getAllUser, getSingleUser, createUser, deleteUser, updateUser };