const mongoose = require('mongoose')

const involvedPersonsSchema = new mongoose.Schema({
        id: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['Inventor', 'Drucker', 'Künstler', 'Formschneider', 'Artist', ''],
        },
        name: {
            type: String,
            required: false
        },
        prefix: {
            type: String,
            required: false
        },
        suffix: String,
        nameType: {
            type: String,
            enum: ['Primärer Name', 'Andere Suchform', 'Falsche Namensform', 'Alternativer Name', ""]
        },
        alternativeName: {
            type: String,
            required: false
        },
        remarks: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: false
        },
        isUnknown: Boolean
    })

module.exports = mongoose.model('InvolvedPersons', involvedPersonsSchema)
