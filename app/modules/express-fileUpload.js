const fileUpload = require('express-fileupload');
const path = require('path');
const { createDirectory } = require('./createDirectory');

const expressUploadFile = async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length == 0) return next({ status: 400, message: 'File uploading is failed'});
    let image = req.files.image;
    if(image.size > 3 * 1024 * 1024) return next({ status: 400, message: 'Image size can\'t be greater than 3mb'});
    let imageType = path.extname(image.name);
    if(!['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(imageType)) return next({ status: 400, message: 'Image format is wrong'});
    let image_url = path.join(createDirectory(), Date.now() + '-' + image.name);
    req.body.image = image_url.substring(7);
    let uploadPath = path.join(__dirname, '..', '..', image_url);
    image.mv(uploadPath, err => {
        if(err) return next({ status: 500, message: err});
        next();
    })
}

module.exports = {
    expressUploadFile,
}