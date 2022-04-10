const mongoose = require('mongoose')

const PhoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    }, 
    phone: {
        type: Number,
        required: false
    }
})

const PhoneBook = mongoose.model('PhoneBook', PhoneBookSchema)

module.exports = PhoneBook
