const fs = require('fs');
const path = require('path');

function createDirectory() {
    let date = new Date();
    const year = '' + date.getFullYear();
    const month = '' + date.getMonth();
    const day = '' + date.getDay();

    const uploadPath = path.join(__dirname, '..', '..', 'public', 'upload', year, month, day);
    fs.mkdirSync(uploadPath, {recursive: true});
    return path.join('public', 'upload', year, month, day);
}

module.exports = {
    createDirectory
}