const mongoose = require('mongoose')

const relatedWorksSchema = new mongoose.Schema({

    text: {
        type: String,
        default: "Teil eines Werkes"
    },
    inventoryNumber: String,
    remark: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('relatedWorks', relatedWorksSchema)