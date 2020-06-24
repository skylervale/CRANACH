const mongoose = require('mongoose')
const details = require('./SubCollections/details')

const involvedPersonsNamesSchema = new mongoose.Schema({
        constituentId: String,
        details: [details]
})

module.exports = mongoose.model('involvedPersonsNames', involvedPersonsNamesSchema)