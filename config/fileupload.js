const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let upload_file_path = path.resolve(__dirname, '../public/file/');
        console.log(path.resolve(__dirname, '../public/file/'))

        if (!fs.existsSync(upload_file_path)) {
            fs.mkdir(upload_file_path, (err, data) => {
                console.log(err, data);
            });
        }
        cb(null, upload_file_path);
    },
    filename: (req, file, cb) => {
        const timeStamp = Date.now();
        cb(null, timeStamp + '@@' + file.originalname);
    },
})

const upload = multer({storage: storage});

module.exports = upload;