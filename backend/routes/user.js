const express = require('express');
const router = express.Router();
const { getAllUser, getSingleUser, createUser, deleteUser, updateUser } = require('../controllers/userController');

router.route('/').get(getAllUser);
router.route('/:id').get(getSingleUser);
router.route('/create').post(createUser);
router.route('/delete/:id').delete(deleteUser);
router.route('/update/:id').put(updateUser);

module.exports = router;