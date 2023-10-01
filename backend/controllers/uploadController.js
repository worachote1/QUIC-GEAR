const multer = require('multer');

const max_images = 5;
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../frontend/public/uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
});

const upload = multer({ storage: fileStorageEngine });

const uploadSingleFile = (req,res,err) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ msg_err: `Single File upload failed.\n${err}` });
        }
        res.status(200).json(req.file)
    });
}

const uploadMultipleFile = (req,res,err) => {
    upload.array('images',max_images)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ msg_err: `Multiple File upload failed. \n${err}` });
        }
        res.status(200).json(req.files)
    });
}

module.exports = { upload , uploadSingleFile, uploadMultipleFile}