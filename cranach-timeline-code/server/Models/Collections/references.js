const mongoose = require('mongoose')

const referencesSchema = new mongoose.Schema({
    text: {
        type: String,
        enum: ["Inhaltlich verwandt mit", "gehört zu”, “Teil eines Werkes", "Gehört thematisch zu", "Version"]
    },
    inventoryNumber: String,
    remark: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('references', referencesSchema)