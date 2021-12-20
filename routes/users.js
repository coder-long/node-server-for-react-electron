var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const mongodb = require('../mongo')

/* GET users listing. */
router.get('/', function (req, res, next) {

    console.log('aaaaa')
    res.send('respond with a resource');
});

router.post('/login', (req, res) => {
    mongodb.validateLogin(req.body.userInfo).then(result => {

        if (result) {//验证成功
            //秘钥
            let signkey = 'hel666';
            //生成token
            const token = 'Bearer' + jwt.sign({
                    username: req.body.userInfo.username,
                    password: req.body.userInfo.password,
                },
                signkey,
                {
                    expiresIn: 3600 * 24 * 3,//3天
                }
            );
            console.log('token', token);
            res.json({msg: '验证成功！', token: token});
        } else {//验证失败
            res.json({msg: '用户名或密码错误！', token: ''})
        }
    }, err => {
        res.status(500).send(err);
    })
})

module.exports = router;
