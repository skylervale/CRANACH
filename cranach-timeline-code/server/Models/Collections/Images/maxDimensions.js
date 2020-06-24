const mongoose = require('mongoose')

const maxDimensionsSchema = new mongoose.Schema({
        width: Number,
        height: Number
})

module.exports = mongoose.model('maxDimensions', maxDimensionsSchema)