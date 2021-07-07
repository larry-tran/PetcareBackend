const multer = require('multer');
const path = require('path');
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        // cb(null, new Date().getTime() + path.extname(file.originalname));
        return crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) {
              return cb(err);
            }
            // return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
            return cb(null, "" + file.originalname);
          });
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype);
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/*'){
        cb(null, true);
    }else{
        cb(new Error('Unsupported files'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize:1024*1024*10
    },
    fileFilter:fileFilter
});

module.exports = {
    upload: upload
}