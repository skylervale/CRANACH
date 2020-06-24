const mongoose = require('mongoose')

const locationsSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    term: String,
    path: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Locations', locationsSchema)