const mongoose = require('mongoose')

const reprintsSchema = new mongoose.Schema({
    text: {
        type: String,
        default: "Abzug A"
    },
    inventoryNumber: String,
    remark: String,
})

module.exports = mongoose.model('reprints', reprintsSchema)