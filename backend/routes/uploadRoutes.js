const express = require('express');
const router = express.Router();
const { upload, uploadSingleFile, uploadMultipleFile } = require('../controllers/uploadController')

router.route('/single').post(uploadSingleFile);
router.route('/multiple').post(uploadMultipleFile);

module.exports = router; 