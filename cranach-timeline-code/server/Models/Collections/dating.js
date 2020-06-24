const mongoose = require('mongoose')

const historicEventInformations = require('./SubCollections/historicEventInformations')

const datingSchema = new mongoose.Schema({
    dated: {
        type: String,
        required: false
    },
    begin: {
        type: Number,
        default: 0
    },
    end: {
        type: Number,
        default: 0
    },
    remarks: {
        type: String,
        required: false
    },
    historicEventInformations: [historicEventInformations]
})

module.exports = mongoose.model('dating', datingSchema)