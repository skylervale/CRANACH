const mongoose = require('mongoose')


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
    historicEventInformations: [{
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
    }]
})

module.exports = mongoose.model('Dating', datingSchema)