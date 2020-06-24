const mongoose = require('mongoose')
const maxDimensions = require('./Images/maxDimensions')
const sizes = require('./Images/sizes')

const typeImageSchema = new mongoose.Schema({

    info: {maxDimensions},
    sizes: {sizes},

})

module.exports = mongoose.model('typeImage', typeImageSchema)