var express = require('express');
var router = express.Router();
const axios = require('axios');
const {validateToken} = require('../mongo')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/test', (req, res) => {
    res.json('aa')
})

router.post('/validateToken', (req, res) => {
    if (req.body.hasOwnProperty('token') && req.body.token) {
        validateToken(req.body.token).then(result => {
            res.json(result)
        })
    } else {
        res.status(400)
    }
})

router.get("/skiell", (req, res) => {
    axios.get('https://miaomiao.scmttec.com/seckill/seckill/checkstock2.do?id=1276 ', {
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 5.1.1; SM-N960F Build/JLS36C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.136 Mobile Safari/537.36 MMWEBID/1042 MicroMessenger/7.0.15.1680(0x27000F34) Process/appbrand0 WeChat/arm32 NetType/WIFI Language/zh_CN ABI/arm32",
            "Referer": "https://servicewechat.com/wxff8cad2e9bf18719/2/page-frame.html",
            "tk": req.tk,
            "Accept": "application/json, text/plain, */*",
            "Host": "miaomiao.scmttec.com",
            "Cookie": ''.join(';'),
        }
    }).then(res => {
        console.log(res)
    })
    console.log(req);
})

module.exports = router;
