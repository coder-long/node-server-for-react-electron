const mongoose = require('mongoose');
const Schema = require("./schema");
const jwt = require('jsonwebtoken');
const url = 'mongodb://localhost:27017/react-node-server-electron';
let connectState = false;

let mongodb = {
    connect() {
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, data) => {
            if (err) {
                console.log('mongodb 数据库连接失败')
                connectState = false;
            } else {
                console.log('mongodb 数据库连接成功');
                connectState = true;
            }

        })
    },
    disconnect() {
        mongoose.disconnect(err => {
            console.log(err);
            connectState = false;
        })
    },
    connectState() {
        return connectState;
    },
    //添加用户
    insertUser(user) {
        return new Promise((resolve, reject) => {
            if (user.hasOwnProperty('username') && user.hasOwnProperty('password')) {
                const user = mongoose.model('user', Schema.userSchema);
                user.create(user, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve()
                    }
                });
            } else {
                reject('无效输入.')
            }
        })
    },
    validateLogin(userInfo) {
        const user = mongoose.model('users', Schema.userSchema);
        return new Promise((resolve, reject) => {
            user.find(userInfo, (err, doc) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            })
        })
    },
    //验证token
    validateToken(token) {
        return new Promise((resolve, reject) => {
            let info = jwt.verify(token, 'hel666', (error, decoded) => {
                if (error) {
                    console.log(error.message)
                    return
                }
                console.log(decoded)
            });
            resolve(info);
        })
    },
    //文件上传
    uploadFile(filemsg) {
        filemsg = {
            filename: filemsg.filename || '1638867556878@@App.js',
            username: filemsg.username || "String",
            uploadTime: Date.now()
        }
        const filelist = mongoose.model('filelist', Schema.fileSchema);
        return new Promise((resolve, reject) => {
            filelist.create({...filemsg}, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            })
        })
    }
}

let before = function (fn, beforeFn) {
    return function () {
        if (beforeFn.apply(this, arguments)) {
            return fn.apply(this, arguments)
        } else {
            return Promise.reject('mongodb数据库未连接.')
        }
    }
}

Object.keys(mongodb).forEach(funcName => {
    if (funcName !== 'connectState' && funcName !== "disconnect" && funcName !== 'connect') {
        mongodb[funcName] = before(mongodb[funcName], mongodb.connectState)
    }
})

module.exports = mongodb

