function initMapping(elasticClient) {
    return elasticClient.indices.putMapping({
        index: "cranach_graphic",
        body: {
            properties: {
                langCode: { type: "keyword" },
                involvedPersons: {
                    type: "nested",
                    properties: {
                        id: { type: "keyword" },
                        role: { type: "keyword" },
                        name: {
                            type: "text",
                            fields: {
                                raw: {
                                    type:  "keyword" }
                            }
                        },
                        prefix: { type: "keyword" },
                        suffix: { type: "keyword" },
                        nameType: { type: "keyword" },
                        alternativeName: { type: "keyword" },
                        remarks: { type: "text" },
                        date: { type: "keyword" },
                        isUnknown: { type: "boolean" },

                    }
                },
                involvedPersonsNames: {
                    type: "nested",
                    properties: {
                        constituentId: { type: "keyword" },
                        details: {
                            type: "nested",
                            properties: {
                                name: {type: "keyword"},
                                nameType: {type: "keyword"},
                            }
                        },


                    }
                },
                titles: {
                    type: "nested",
                    properties: {
                        type: { type: "keyword" },
                        title: { type: "keyword" },
                        remarks: { type: "text" }
                    }
                },
                classification: {
                    type: "object",
                    properties: {
                        classification: {type: "keyword"},
                        condition: {type: "text"}
                    }
                },
                conditionLevel: {type: "integer"},
                objectName: {type: "keyword"},
                inventoryNumber: {type: "keyword"},
                objectId: {type: "integer"},
                isVirtual: {type: "boolean"},
                dimensions: {type: "text"},
                dating: {
                    type: "nested",
                    properties: {
                        dating: {type: "keyword"},
                        begin: {type: "integer"},
                        end: {type: "integer"},
                        remarks: {type: "text"},

                    }
                },
                historicEventInformations: {
                    type: "nested",
                    properties: {
                        eventType: {type: "keyword"},
                        text: {type: "text"},
                        remarks: {type: "text"},
                        begin: {type: "integer"},
                        end: {type: "integer"},


                    }
                },
                description: {type: "text"},
                provenance: {type: "keyword"},
                medium: {type: "keyword"},
                signature: {type: "keyword"},
                inscription: {type: "keyword"},
                markings: {type: "text"},
                relatedWorks: {type: "text"},
                exhibitionHistory: {type: "text"},
                bibliography: {type: "text"},
                references: {
                    type: "nested",
                    properties: {
                        reprints: {
                            type: "object",
                            properties: {
                                text: {type: "text"},
                                inventoryNumber: {type: "keyword"},
                                remark: {type: "text"},
                            }
                        },
                        relatedWorks: {
                            type: "object",
                            properties: {
                                text: {type: "text"},
                                inventoryNumber: {type: "keyword"},
                                remark: {type: "text"},
                            }
                        },
                    }
                },
                additionalTextInformation: {
                    type: "nested",
                    properties: {
                        type: {type: "keyword"},
                        text: {type: "text"},
                        date: {type: "keyword"},
                        year: {type: "keyword"},
                        author: {type: "keyword"},


                    }
                },
                publications: {
                    type: "nested",
                    properties: {
                        title: {type: "keyword"},
                        pageNumber: {type: "keyword"},
                        referenceId: {type: "keyword"},
                    }
                },
                keywords: {type: "keyword"},
                locations: {
                    type: "nested",
                    properties: {
                        type: {type: "keyword"},
                        term: {type: "keyword"},
                        path: {type: "keyword"},
                    }
                },
                owner: {type: "keyword"},
                sortingNumber: {type: "keyword"},
                catalogWorkReferences: {
                    type: "nested",
                    properties: {
                        description: {type: "text"},
                        referenceNumber: {type: "keyword"},
                        remarks: {type: "text"},
                    }
                },
                structuredDimension: {
                    type: "nested",
                    properties: {
                        element: {type: "keyword"},
                        width: {type: "keyword"},
                        height: {type: "keyword"},
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
                                        src: {type: "keyword"}
                                    }
                                },
                                s: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "keyword"}
                                    }

                                },
                                m: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "keyword"}
                                    }

                                },
                                l: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "keyword"}

                                    }

                                },
                                xl: {
                                    type: "object",
                                    properties: {
                                        width: {type: "integer"},
                                        height: {type: "integer"},
                                        src: {type: "keyword"}
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
