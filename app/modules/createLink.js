function createLink(req, fileAddress) {
    if(fileAddress) {
        const address = fileAddress?.replace(/\\/gm, "/");
        return req.protocol + '://' + req.get('host') + '/' + address;
    } else return undefined;
}

module.exports = {
    createLink,
}