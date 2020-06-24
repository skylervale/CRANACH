const mongoose = require('mongoose')

let graphicSchema = new mongoose.Schema({
    langCode: {
        type: String,
        enum    : ['de', 'en'],
        default: 'de'
    },
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
    dating: {
        dated: {
            type: String,
            required: false
        },
        begin: {
            type: Number,
            default: 0
        },
        end: {
            type: Number,
            default: 0
        },
        remarks: {
            type: String,
            required: false
        },
        historicEventInformations: [{
            eventType: {
                type: String,
                enum: ['Datierung', 'Dating', 'Auflage']
            },
            text: String,
            begin: {
                type: Number,
                required: false
            },
            end: {
                type: Number,
                required: false
            },
            remarks: {
                type: String,
                required: false
            }
        }]
    },
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
        reprints: [{
            text: {
                type: String,
                default: "Abzug A"
            },
            inventoryNumber: String,
            remark: String,
        }],
        relatedWorks: [{
            text: {
                type: String,
                default: "Teil eines Werkes"
            },
            inventoryNumber: String,
            remark: {
                type: String,
                required: false
            },
        }],
    },
    additionalTextInformation: [{
        type: {
            type: String,
            enum: ['Beschreibung', 'Interpretation', 'Kommentare', 'Beschreibung/ Interpretation/ Kommentare', '(not assigned)']
        },
        text: String,
        date: {
            type: String,
            required: false
        },
        year: {
            type: Number,
            default: null
        },
        author: {
            type: String,
            default: "",
        }
    }],
    publications: [{
        title: {
            type: String,
            default: ""
        },
        pageNumber: {
            type: String,
            default: ""
        },
        referenceId: {
            type: String,
            default: ""
        },
    }],
    keywords: Array,
    locations: [{
        type: {
            type: String,
            enum: ['Standort Cranach Objekt', 'Location Cranach Object']
        },
        term: String,
        path: {
            type: String,
            default: ""
        }
    }],
    owner: {
        type: String,
        default: "",
    },
    sortingNumber: {
        type: String,
        default: "",
    },
    catalogWorkReferences: [{
        description: String,
        referenceNumber: {
            type: String,
            default: ""
        },
        remarks: {
            type: String,
            default: ""
        }
    }],
    structuredDimension: {
        element: String,
        width: {
            type: String,
            default: null
        },
        height: {
            type: String,
            default: null
        }
    },
    images: {
        type: {
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
            },
        },
        required: false,
        default: null,
    }
})

module.exports = mongoose.model('Graphic', graphicSchema)