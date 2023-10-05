const express = require('express');
const router = express.Router();
const { getAllUser,
        createUser,
        deleteUser,
        updateUser,
        loginUser,
        registerUser,
        getUserData} = require('../controllers/userController');

router.route('/').get(getAllUser);
router.route('/create').post(createUser);
router.route('/:id').get(getUserData);
router.route('/delete/:id').delete(deleteUser);
router.route('/update/:id').put(updateUser);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

module.exports = router;