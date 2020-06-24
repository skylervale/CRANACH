const mongoose = require('mongoose')
const maxDimensions = require('./maxDimensions')

const infosSchema = new mongoose.Schema({
    maxDimensions: {maxDimensions}
})

module.exports = mongoose.model('infos', infosSchema)