const mongoose = require('mongoose')
const dimensions = require('./dimensions')

const xsSchema = new mongoose.Schema({
    dimensions: {dimensions},
    src: String
})

module.exports = mongoose.model('XS', xsSchema)