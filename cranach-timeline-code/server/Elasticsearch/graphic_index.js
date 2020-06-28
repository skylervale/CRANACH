function initMapping(elasticClient) {
    return elasticClient.indices.putMapping({
        index: cranach_graphic,
        body: {
            properties: {
                langCode: { type: "string" },
                involvedPersons: {
                    type: "nested",
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
                        isUnknown: { type: "boolean" },

                    }
                },
                involvedPersonsNames: {
                    type: "nested",
                    properties: {
                        constituentId: { type: "string" },
                        details: {
                            type: "nested",
                            properties: {
                                name: {type: "string"},
                                nameType: {type: "string"},
                            }
                        },


                    }
                },
                titles: {
                    type: "nested",
                    properties: {
                        type: { type: "string" },
                        title: { type: "string" },
                        remarks: { type: "string" }
                    }
                },
                classification: {
                    type: "object",
                    properties: {
                        classification: {type: "string"},
                        condition: {type: "string"}
                    }
                },
                conditionLevel: {type: "integer"},
                objectName: {type: "string"},
                inventoryNumber: {type: "string"},
                objectId: {type: "integer"},
                isVirtual: {type: "boolean"},
                dimensions: {type: "string"},
                dating: {
                    type: "nested",
                    properties: {
                        dating: {type: "string"},
                        begin: {type: "integer"},
                        end: {type: "integer"},
                        remarks: {type: "string"},

                    }
                },
                historicEventInformations: {
                    type: "nested",
                    properties: {
                        eventType: {type: "string"},
                        text: {type: "string"},
                        remarks: {type: "string"},
                        begin: {type: "integer"},
                        end: {type: "integer"},


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
                    type: "nested",
                    properties: {
                        reprints: {
                            type: "object",
                            properties: {
                                text: {type: "string"},
                                inventoryNumber: {type: "string"},
                                remark: {type: "string"},
                            }
                        },
                        relatedWorks: {
                            type: "object",
                            properties: {
                                text: {type: "string"},
                                inventoryNumber: {type: "string"},
                                remark: {type: "string"},
                            }
                        },
                    }
                },
                additionalTextInformation: {
                    type: "nested",
                    properties: {
                        type: {type: "string"},
                        text: {type: "string"},
                        date: {type: "string"},
                        year: {type: "integer"},
                        author: {type: "string"},


                    }
                },
                publications: {
                    type: "nested",
                    properties: {
                        title: {type: "string"},
                        pageNumber: {type: "string"},
                        referenceId: {type: "string"},
                    }
                },
                keywords: {type: "string"},
                locations: {
                    type: "nested",
                    properties: {
                        type: {type: "string"},
                        term: {type: "string"},
                        path: {type: "string"},
                    }
                },
                owner: {type: "string"},
                sortingNumber: {type: "string"},
                catalogWorkReferences: {
                    type: "nested",
                    properties: {
                        description: {type: "string"},
                        referenceNumber: {type: "string"},
                        remarks: {type: "string"},
                    }
                },
                structuredDimension: {
                    type: "nested",
                    properties: {
                        element: {type: "string"},
                        width: {type: "string"},
                        height: {type: "string"},
                    }
                },
                images: {
                    type: "nested",
                    properties: {
                        info: {
                            type: "nested",
                            properties: {
                                maxDimensions: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"}
                                    }

                                }
                            }
                        },
                        sizes: {
                            type: "nested",
                            properties: {
                                xs: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "string"}
                                    }
                                },
                                s: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "string"}
                                    }

                                },
                                m: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "string"}
                                    }

                                },
                                l: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "string"}

                                    }

                                },
                                xl: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
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
