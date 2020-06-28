const mongoose = require('mongoose')

const titlesSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Titel", "Beshcreibender Titel"]
    },
    title: String,
    remarks: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Titles', titlesSchema)
