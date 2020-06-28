const mongoose = require('mongoose')

const classificationSchema = new mongoose.Schema({
    
    classification: {
        type: String,
        enum: ["Druckgrafik", "Malerei", "Gemälde"],
        default: ""
    },
    condition: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Classification', classificationSchema)