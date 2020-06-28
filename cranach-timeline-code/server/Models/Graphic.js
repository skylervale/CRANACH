let mongoose = require('mongoose')
let InvolvedPersons = require('./InvolvedPersons')
let InvolvedPersonsNames = require('./InvolvedPersonsNames')
let Titles = require('./Titles')
let Classification = require('./Classification')
let Dating = require('./Dating')
let References = require('./References')
let AdditionalTextInformation = require('./AdditionalTextInformation')
let Publications = require('./Publications')
let Locations = require('./Locations')
let CatalogWorkReferences = require('./CatalogWorkReferences')
let StructuredDimension = require('./StructuredDimension')

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
