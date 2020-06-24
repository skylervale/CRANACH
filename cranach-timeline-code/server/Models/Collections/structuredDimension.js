const mongoose = require('mongoose')

const structuredDimensionSchema = new mongoose.Schema({
    element: {
        type: String,
        default: ""
    },
    width: {
        type: String,
        default: null
    },
    height: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('structuredDimension', structuredDimensionSchema)