let mongoose = require('mongoose')
let involvedPersons = require('./InvolvedPersons')
let involvedPersonsNames = require('./InvolvedPersonsNames')
let titles = require('./Titles')
let classification = require('./Classification')
let dating = require('./Dating')
let references = require('./References')
let additionalTextInformation = require('./AdditionalTextInformation')
let secondaryReferences = require('./Collections/secondaryReferences')
let publications = require('./Publications')
let locations = require('./Locations')
let catalogWorkReferences = require('./CatalogWorkReferences')
let structuredDimension = require('./StructuredDimension')

let paintingSchema = new mongoose.Schema({
    langCode: {
        type: String,
        enum    : ['de', 'en'],
        default: 'de'
    },
    involvedPersons: [involvedPersons],
    involvedPersonsNames: [involvedPersonsNames],
    titles: [titles],
    classification: {classification},
    objectName: String,
    inventoryNumber: String,
    objectId: Number,
    isVirtual: Boolean,
    dimensions: String,
    dating: {dating},
    description: {
        type: String,
        required: false
    },
    provenance:  {
        type: String,
        required: false
    },
    medium:  {
        type: String,
        required: false
    },
    signature:  {
        type: String,
        required: false
    },
    inscription:  {
        type: String,
        required: false
    },
    markings:  {
        type: String,
        required: false
    },
    relatedWorks:  {
        type: String,
        required: false
    },
    exhibitionHistory:  {
        type: String,
        required: false
    },
    bibliography:  {
        type: String,
        required: false
    },
    references:[references],
    secondaryReferences: [secondaryReferences],
    additionalTextInformation: [additionalTextInformation],
    publications: [publications],
    keywords: Array,
    locations: [locations],
    repository: String,
    owner: {
        type: String,
        default: "",
    },
    sortingNumber: {
        type: String,
        default: "",
    },
    catalogWorkReferences: [catalogWorkReferences],
    structuredDimension: {structuredDimension},
    isBestOf: Boolean

})

module.exports = mongoose.model('Painting', paintingSchema)