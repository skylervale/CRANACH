let mongoose = require('mongoose')
let InvolvedPersons = require('./InvolvedPersons').schema
let InvolvedPersonsNames = require('./InvolvedPersonsNames').schema
let Titles = require('./Titles').schema
let Classification = require('./Classification').schema
let Dating = require('./Dating').schema
let References = require('./References').schema
let AdditionalTextInformation = require('./AdditionalTextInformation').schema
let Publications = require('./Publications').schema
let Locations = require('./Locations').schema
let CatalogWorkReferences = require('./CatalogWorkReferences').schema
let StructuredDimension = require('./StructuredDimension').schema

let graphicSchema = new mongoose.Schema({
    langCode: {
        type: String,
        enum    : ['de', 'en'],
        default: 'de'
    },
    involvedPersons: [InvolvedPersons],
    involvedPersonsNames: [InvolvedPersonsNames],
    titles: [Titles],
    classification: Classification,
    conditionLevel: Number,
    objectName: String,
    inventoryNumber: String,
    objectId: Number,
    isVirtual: Boolean,
    dimensions: String,
    dating: Dating,
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
    references:[References],
    additionalTextInformation: [AdditionalTextInformation],
    publications: [Publications],
    keywords: Array,
    locations: [Locations],
    repository: String,
    owner: {
        type: String,
        default: "",
    },
    sortingNumber: {
        type: String,
        default: "",
    },
    catalogWorkReferences: [CatalogWorkReferences],
    structuredDimension: StructuredDimension,
    isBestOf: Boolean

})

module.exports = mongoose.model('Graphic', graphicSchema)
