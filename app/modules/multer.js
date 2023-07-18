const multer = require('multer');
const path = require('path');
const {createDirectory} = require('./createDirectory');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = createDirectory();
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const type = path.extname(file.originalname);
        cb(null, Date.now() + type)
    }
})

const upload_multer = multer({storage});

module.exports = {upload_multer}