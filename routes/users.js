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
                    username: req.body.userInfo.login_username,
                    password: req.body.userInfo.login_password,
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

router.post('/register', (req, res) => {
    if (req.body.userInfo.hasOwnProperty('register_username') && req.body.userInfo.hasOwnProperty('register_password') && req.body.userInfo.hasOwnProperty('register_rep_password')) {
        mongodb.register(req.body.userInfo).then(result => {
            if (result) {
                res.status(200).send('注册成功。')
            } else {
                res.status(500).send('注册失败。')
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    } else {
        res.status(400).send('no user || no password .')
    }
})

module.exports = router;
