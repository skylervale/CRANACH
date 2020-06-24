let mongoose = require('mongoose')
let involvedPersons = require('./Collections/involvedPersons')
let involvedPersonsNames = require('./Collections/involvedPersonsNames')
let titles = require('./Collections/titles')
let classification = require('./Collections/classification')
let dating = require('./Collections/dating')
let reprints = require('./Collections/SubCollections/reprints')
let relatedWorks = require('./Collections/SubCollections/relatedWorks')
let additionalTextInformation = require('./Collections/additionalTextInformation')
let publications = require('./Collections/publications')
let locations = require('./Collections/locations')
let catalogWorkReferences = require('./Collections/catalogWorkReferences')
let structuredDimension = require('./Collections/structuredDimension')
let image = require('./Collections/image')

let graphicSchema = new mongoose.Schema({
    langCode: {
        type: String,
        enum    : ['de', 'en'],
        default: 'de'
    },
    involvedPersons: [involvedPersons],
    involvedPersonsNames: [involvedPersonsNames],
    titles: [titles],
    classification: {classification},
    conditionLevel: Number,
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
    references: {
        reprints: [reprints],
        relatedWorks: [relatedWorks],
    },
    additionalTextInformation: [additionalTextInformation],
    publications: [publications],
    keywords: Array,
    locations: [locations],
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
    images: {
        type: {image},
        required: false,
        default: null,
    }
})

module.exports = mongoose.model('Graphic', graphicSchema)