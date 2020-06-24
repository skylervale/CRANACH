const mongoose = require('mongoose')

const additionalTextInformationSchema = new mongoose.Schema({
    type: {
        type: String,
        default: ""
    },
    text: String,
    date: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        default: null
    },
    author: {
        type: String,
        default: "",
    }
})

module.exports = mongoose.model('AdditionalTextInformation', additionalTextInformationSchema)