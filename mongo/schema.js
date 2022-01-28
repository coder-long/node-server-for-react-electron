const Schema = require('mongoose').Schema;


const userSchema = new Schema({
    username: String,
    password: String,
    register_time: {//注册时间
        type: Date,
        default: Date.now()
    },
    update_time: {//更新时间
        type: Date,
        default: Date.now()
    },
    address: {
        type: String,
        default: '四川 成都'
    },
    avatar: {//用户头像
        type: String,
        default: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
});

const fileSchema = new Schema({
    filename: String,
    username: String,
    uploadTime: Date
})


module.exports = {
    userSchema,
    fileSchema
}