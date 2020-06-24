let mongoose = require('mongoose')
let involvedPersons = require('./InvolvedPersons')
let involvedPersonsNames = require('./InvolvedPersonsNames')
let Titles = require('./Titles')
let Classification = require('./Classification')
let Dating = require('./Dating')
let additionalTextInformation = require('./AdditionalTextInformation')
let Publications = require('./Publications')
let Locations = require('./Locations')
let catalogWorkReferences = require('./CatalogWorkReferences')
let StructuredDimension = require('./StructuredDimension')
let Images = require('./Images')
let References = require('./References')

let graphicSchema = new mongoose.Schema({
    langCode: {
        type: String,
        enum    : ['de', 'en'],
        default: 'de'
    },
    involvedPersons: [involvedPersons],
    involvedPersonsNames: [involvedPersonsNames],
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
    references: [References],
    additionalTextInformation: [additionalTextInformation],
    publications: [Publications],
    keywords: Array,
    locations: [Locations],
    owner: {
        type: String,
        default: "",
    },
    sortingNumber: {
        type: String,
        default: "",
    },
    catalogWorkReferences: [catalogWorkReferences],
    structuredDimension: StructuredDimension,
    images: {
        type: Images,
        required: false,
        default: null,
    }
})

module.exports = mongoose.model('Graphic', graphicSchema)