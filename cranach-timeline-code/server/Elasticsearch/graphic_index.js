function initMapping() {
    return elasticClient.indices.putMapping({
        index: cranach_graphic,
        type: "document",
        body: {
            properties: {
                langCode: { type: "string" },
                involvedPersons: {
                    type: "Nested",
                    properties: {
                        id: { type: "string" },
                        role: { type: "string" },
                        name: {
                            type: "string",
                            fields: {
                                raw: {
                                    type:  "keyword" }
                            }
                        },
                        prefix: { type: "string" },
                        suffix: { type: "string" },
                        nameType: { type: "string" },
                        alternativeName: { type: "string" },
                        remarks: { type: "string" },
                        date: { type: "string" },
                        isUnknown: { type: "Boolean" },

                    }
                },
                involvedPersonsNames: {
                    type: "Nested",
                    properties: {
                        constituentId: { type: "string" },
                        details: {
                            type: "Nested",
                            properties: {
                                name: {type: "string"},
                                nameType: {type: "string"},
                            }
                        },


                    }
                },
                titles: {
                    type: "Nested",
                    properties: {
                        type: { type: "string" },
                        title: { type: "string" },
                        remarks: { type: "string" }
                    }
                },
                classification: {
                    type: "Object",
                    properties: {
                        classification: {type: "string"},
                        condition: {type: "string"}
                    }
                },
                conditionLevel: {type: "Numeric"},
                objectName: {type: "string"},
                inventoryNumber: {type: "string"},
                objectId: {type: "Numeric"},
                isVirtual: {type: "Boolean"},
                dimensions: {type: "string"},
                dating: {
                    type: "Nested",
                    properties: {
                        dating: {type: "string"},
                        begin: {type: "Numeric"},
                        end: {type: "Numeric"},
                        remarks: {type: "string"},

                    }
                },
                historicEventInformations: {
                    type: "Nested",
                    properties: {
                        eventType: {type: "string"},
                        text: {type: "string"},
                        remarks: {type: "string"},
                        begin: {type: "Numeric"},
                        end: {type: "Numeric"},


                    }
                },
                description: {type: "string"},
                provenance: {type: "string"},
                medium: {type: "string"},
                signature: {type: "string"},
                inscription: {type: "string"},
                markings: {type: "string"},
                relatedWorks: {type: "string"},
                exhibitionHistory: {type: "string"},
                bibliography: {type: "string"},
                references: {
                    type: "Nested",
                    properties: {
                        reprints: {
                            type: "Nested",
                            properties: {
                                text: {type: "string"},
                                inventoryNumber: {type: "string"},
                                remark: {type: "string"},
                            }
                        },
                        relatedWorks: {
                            type: "Nested",
                            properties: {
                                text: {type: "string"},
                                inventoryNumber: {type: "string"},
                                remark: {type: "string"},
                            }
                        },
                    }
                },
                additionalTextInformation: {
                    type: "Nested",
                    properties: {
                        type: {type: "string"},
                        text: {type: "string"},
                        date: {type: "string"},
                        year: {type: "Numeric"},
                        author: {type: "string"},


                    }
                },
                publications: {
                    type: "Nested",
                    properties: {
                        title: {type: "string"},
                        pageNumber: {type: "string"},
                        referenceId: {type: "string"},
                    }
                },
                keywords: {type: "string"},
                locations: {
                    type: "Nested",
                    properties: {
                        type: {type: "string"},
                        term: {type: "string"},
                        path: {type: "string"},
                    }
                },
                owner: {type: "string"},
                sortingNumber: {type: "string"},
                catalogWorkReferences: {
                    type: "Nested",
                    properties: {
                        description: {type: "string"},
                        referenceNumber: {type: "string"},
                        remarks: {type: "string"},
                    }
                },
                structuredDimension: {
                    type: "Nested",
                    properties: {
                        element: {type: "string"},
                        width: {type: "string"},
                        height: {type: "string"},
                    }
                },
                images: {
                    type: "Nested",
                    properties: {
                        info: {
                            type: "Nested",
                            properties: {
                                maxDimensions: {
                                    type: "Object",
                                    properties: {
                                        width: {type: "Numeric"},
                                        height: {type: "Numeric"}
                                    }

                                }
                            }
                        },
                        sizes: {
                            type: "Nested",
                            properties: {
                                xs: {
                                    type: "Object",
                                    properties: {
                                        width: {type: "Numeric"},
                                        height: {type: "Numeric"},
                                        src: {type: "string"}
                                    }
                                },
                                s: {
                                    type: "Object",
                                    properties: {
                                        width: {type: "Numeric"},
                                        height: {type: "Numeric"},
                                        src: {type: "string"}
                                    }

                                },
                                m: {
                                    type: "Object",
                                    properties: {
                                        width: {type: "Numeric"},
                                        height: {type: "Numeric"},
                                        src: {type: "string"}
                                    }

                                },
                                l: {
                                    type: "Object",
                                    properties: {
                                        width: {type: "Numeric"},
                                        height: {type: "Numeric"},
                                        src: {type: "string"}

                                    }

                                },
                                xl: {
                                    type: "Object",
                                    properties: {
                                        width: {type: "Numeric"},
                                        height: {type: "Numeric"},
                                        src: {type: "string"}
                                    }

                                },
                            }
                        }
                    }
                },




            }
        }
    });
}
exports.initMapping = initMapping;