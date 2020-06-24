const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
        name: String,
        nameType: {
            type: String,
            enum: ['Primärer Name', 'Andere Suchform', 'Falsche Namensform', 'Alternativer Name']
        }
})

module.exports = mongoose.model('details', detailsSchema)