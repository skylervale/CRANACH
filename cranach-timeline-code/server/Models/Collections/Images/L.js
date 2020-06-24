const mongoose = require('mongoose')
const dimensions = require('./dimensions')

const lSchema = new mongoose.Schema({
    dimensions: {dimensions},
    src: String
})

module.exports = mongoose.model('L', lSchema)