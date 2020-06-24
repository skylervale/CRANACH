const mongoose = require('mongoose')
const dimensions = require('./dimensions')

const mSchema = new mongoose.Schema({
    dimensions: {dimensions},
    src: String
})

module.exports = mongoose.model('M', mSchema)