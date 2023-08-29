const express = require('express');
const router = express.Router();
const { getAllUser,
        createUser,
        deleteUser,
        updateUser,
        loginUser,
        logoutUser} = require('../controllers/userController');

router.route('/').get(getAllUser);
router.route('/create').post(createUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/update/:id').put(updateUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router;