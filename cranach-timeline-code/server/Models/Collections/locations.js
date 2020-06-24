const mongoose = require('mongoose')

const locationsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Standort Cranach Objekt', 'Location Cranach Object']
    },
    term: String,
    path: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('locations', locationsSchema)