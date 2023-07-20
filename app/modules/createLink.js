function createLink(req, fileAddress) {
     const address = fileAddress.replace(/\\/gm, "/");
     return req.protocol + '://' + req.get('host') + '/' + address;
}

module.exports = {
    createLink,
}