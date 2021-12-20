const Schema = require('mongoose').Schema;


const userSchema = new Schema({
    username: String,
    password: String,
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