let mongoose = require('mongoose')
let involvedPersons = require('./InvolvedPersons')
let involvedPersonsNames = require('./InvolvedPersonsNames')
let Titles = require('./Titles')
let Classification = require('./Classification')
let Dating = require('./Dating')
let additionalTextInformation = require('./AdditionalTextInformation')
let Publications = require('./Publications')
let Locations = require('./Locations')
let CatalogWorkReferences = require('./CatalogWorkReferences')
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
    involvedPersons: [{
        id: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['Inventor', 'Drucker', 'Künstler', 'Formschneider', ''],
        },
        name: {
            type: String,
            required: false
        },
        prefix: {
            type: String,
            required: false
        },
        suffix: String,
        nameType: {
            type: String,
            enum: ['Primärer Name', 'Andere Suchform', 'Falsche Namensform', 'Alternativer Name', ""]
        },
        alternativeName: {
            type: String,
            required: false
        },
        remarks: {
            type: String,
            required: false
        },
        date: {
            type: String,
            required: false
        },
        isUnknown: Boolean

    }],
    involvedPersonsNames: [{
        constituentId: String,
        details: [{
            name: String,
            nameType: {
                type: String,
                enum: ['Primärer Name', 'Andere Suchform', 'Falsche Namensform', 'Alternativer Name']
            }
        }],
    }],
    titles: [{
    type: String,
    title: String,
    remarks: {
        type: String,
        required: false
    },
    }],
    classification: {
        classification: {
            type: String,
            default: "Druckgrafik"
        },
        condition: {
            type: String,
            required: false
        }
    },
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
    catalogWorkReferences: [CatalogWorkReferences],
    structuredDimension: StructuredDimension,
    images: {
        type: Images,
        required: false,
        default: null,
    }
})

module.exports = mongoose.model('Graphic', graphicSchema)