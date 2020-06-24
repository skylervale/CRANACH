const mongoose = require('mongoose')

const publicationsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    pageNumber: {
        type: String,
        default: ""
    },
    referenceId: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Publications', publicationsSchema)