const mongoose = require('mongoose')

const catalogWorkReferencesSchema = new mongoose.Schema({
    description: String,
    referenceNumber: {
        type: String,
        default: ""
    },
    remarks: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('CatalogWorkReferences', catalogWorkReferencesSchema)