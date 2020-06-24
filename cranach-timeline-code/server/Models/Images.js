const mongoose = require('mongoose')

const imagesSchema = new mongoose.Schema({
    info: {
        maxDimensions: {
            width: Number,
            height: Number
        }
    },
    sizes: {
        xs: {
            dimensions: {
                width: Number,
                height: Number
            },
            src: String
        },
        s: {
            dimensions: {
                width: Number,
                height: Number
            },
            src: String
        },
        m: {
            dimensions: {
                width: Number,
                height: Number
            },
            src: String
        },
        l: {
            dimensions: {
                width: Number,
                height: Number
            },
            src: String
        },
        xl: {
            dimensions: {
                width: Number,
                height: Number
            },
            src: String
        },
    }
})

module.exports = mongoose.model('Images', imageSchema)