const mongoose = require('mongoose')

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

module.exports = mongoose.model('InvolvedPersonsNames', involvedPersonsNamesSchema)
