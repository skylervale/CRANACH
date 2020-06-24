const mongoose = require('mongoose')
const details = require('./SubCollections/details')

const involvedPersonsNamesSchema = new mongoose.Schema({
        constituentId: String,
        details: [{
                name: String,
                nameType: {
                        type: String,
                        enum: ['Primärer Name', 'Andere Suchform', 'Falsche Namensform', 'Alternativer Name']
                }
        }]
})

module.exports = mongoose.model('involvedPersonsNames', involvedPersonsNamesSchema)