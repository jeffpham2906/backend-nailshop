const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    keyWord:String
})

module.exports = mongoose.model('admins',userSchema)