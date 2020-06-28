const mongoose = require('mongoose')

const referencesSchema = new mongoose.Schema({
    reprints: {
        text: {
            type: String,
            enum: ["Inhaltlich verwandt mit", "gehört zu”, “Teil eines Werkes", "Gehört thematisch zu", "Version", "Abzug A"],
            default: ""
        },
        inventoryNumber: String,
        remark: String,
    },
    relatedWorks: {
        text: {
            type: String,
            default: "Teil eines Werkes"
        },
        inventoryNumber: String,
        remark: {
            type: String,
            required: false
        },
    }
})

module.exports = mongoose.model('References', referencesSchema)