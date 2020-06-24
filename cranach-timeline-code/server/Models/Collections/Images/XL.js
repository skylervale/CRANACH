const mongoose = require('mongoose')
const dimensions = require('./dimensions')

const xlSchema = new mongoose.Schema({
    dimensions: {dimensions},
    src: String
})

module.exports = mongoose.model('XL', xlSchema)