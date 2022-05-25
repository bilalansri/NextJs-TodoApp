let mongoose = require('mongoose')

let userschema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

module.exports = mongoose.models.Users || mongoose.model('Users', userschema)