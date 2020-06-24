const mongoose = require('mongoose')
const xs = require('./XL')
const s = require('./S')
const m = require('./M')
const l = require('./L')
const xl = require('./XL')

const sizesSchema = new mongoose.Schema({
    xs: {xs},
    s: {s},
    m: {m},
    l: {l},
    xl: {xl},
})

module.exports = mongoose.model('sizes', sizesSchema)