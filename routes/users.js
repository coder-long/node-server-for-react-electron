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
        if (typeof result === 'object' && !result.toString().toLowerCase().includes('err')) {//验证成功
            if (Object.values(result).length) {
                //秘钥
                let signkey = 'hel666';
                //生成token
                const token = 'Bearer ' + jwt.sign({
                        username: req.body.userInfo.username,
                        password: req.body.userInfo.password,
                    },
                    signkey,
                    {
                        expiresIn: 3600 * 24,//1天 后失效
                        // expiresIn: 5,// 单位为秒 5秒后失效
                    }
                );
                console.log('token', token);
                res.json({msg: '验证成功！', token: token, userInfo: result, code: 0});
            } else {
                res.json({msg: '该用户不存在', token: '', userInfo: {}, code: 1})
            }
        } else {//验证失败
            res.json({msg: '用户名或密码错误！', token: '', userInfo: {}, code: 2})
        }
    }, err => {
        res.status(500).send(err);
    })
})

router.post('/register', (req, res) => {
    if (req.body.userInfo.hasOwnProperty('username') && req.body.userInfo.hasOwnProperty('password') && req.body.userInfo.hasOwnProperty('re_password')) {
        mongodb.register(req.body.userInfo).then(result => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    } else {
        res.status(400).send('no user || no password.')
    }
})

router.post('/update-user', (req, res) => {
    if (req.body.userInfo && req.body.userInfo.hasOwnProperty('username')) {
        mongodb.updateUser(req.body.userInfo).then(_ => {
            res.status(200).send(_)
        }).catch((err) => {
            res.status(500).send(err)
        })
    } else {
        res.status(400).send('400')
    }
})

router.get('/get-user-info', (req, res) => {
    if (req.query.hasOwnProperty('username') && req.query.username.length) {
        mongodb.getUserInfo(req.query.username).then(result => {
            res.status(200).send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    } else {
        res.status(400).send('400')
    }
})

router.get('/get-all-user', (req, res) => {
    if (req.query.curPage && req.query.pageSize) {
        mongodb.getAllUser(req.query.curPage, req.query.pageSize).then(result => {
            res.json(result)
        }).catch(err => {
            res.status(500).send(err)
        })
    } else {
        res.status(400).send(400)
    }
})

module.exports = router;
