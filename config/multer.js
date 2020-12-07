const multer = require('multer');
const path = require('path');

//const storage = multer.memoryStorage();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})



const uploader = multer({storage});

module.exports = uploader;