const mongoose = require('mongoose')
const dimensions = require('./dimensions')

const sSchema = new mongoose.Schema({
    dimensions: {dimensions},
    src: String
})

module.exports = mongoose.model('S', sSchema)