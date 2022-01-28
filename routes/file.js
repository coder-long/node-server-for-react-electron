var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = require('../config/fileupload');
const mongodb = require('../mongo')


router.post('/upload', (req, res) => {
    console.log(req.file, req.body)
    upload.single('file_upload')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            //上传时发生错误
            res.status(500).send(err.message);
        } else if (err) {
            //上传是发生未知错误
            res.status(500).send(err.message);
        }

        mongodb.uploadFile({filename: req.file.filename}).then(result => {
            console.log(result);
            res.status(200).send({msg: '上传成功！'});
        })
    })

});

router.get('/download', (req, res) => {
    console.log(req, res);
    res.sendFile(req.file);
})

module.exports = router;
