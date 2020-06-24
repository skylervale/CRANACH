const mongoose = require('mongoose')

const classificationSchema = new mongoose.Schema({
    
    classification: {
        type: String,
        default: "Druckgrafik"
    },
    condition: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('classification', classificationSchema)