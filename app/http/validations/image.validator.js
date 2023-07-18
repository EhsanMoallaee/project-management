const { body } = require("express-validator");
const path = require('path');

function imageValidator() {
    return [
        body('image').custom((image, {req}) => {
            if (!req.file || Object.keys(req.file).length == 0) throw {status: 400, message: 'Please send an image file!'};
            const ext = path.extname(req.file.originalname);
            const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
            if(!exts.includes(ext)) throw {status: 400, message: 'Wrong image file format'};
            const maxSize = 2 * 1024 * 1024;
            if( req.file.size > maxSize) throw {status: 400, message: 'Image file size can\'t be greater than 2mb'};
            return true;
        })
    ]
}

module.exports = {
    imageValidator
};