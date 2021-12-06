const Schema = require('mongoose').Schema;


const userSchema = new Schema({
    username: String,
    password: String,
});


module.exports = {
    userSchema,
}