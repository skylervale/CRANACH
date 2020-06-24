const mongoose = require('mongoose')

const historicEventInformationsSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum: ['Datierung', 'Dating', 'Auflage']
    },
    text: String,
    begin: {
        type: Number,
        required: false
    },
    end: {
        type: Number,
        required: false
    },
    remarks: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('historicEventInformations', historicEventInformationsSchema)