const mongoose = require('mongoose')

const dimensionsSchema = new mongoose.Schema({
    width: Number,
    height: Number
})

module.exports = mongoose.model('dimensions', dimensionsSchema)