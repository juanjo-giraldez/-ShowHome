const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'ShowHome', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const uploadCloud = multer({
    storage: storage
});

module.exports = uploadCloud;