const classifications_aggs_body = {
    "aggs" : {
        "classification_agg" : {
            "terms" : {"field" : "classification.classification"}
        }
    }
}
const owners_aggs_body = {
    "aggs" : {
        "owners_agg" : {
            "terms" : {"field" : "owner.raw"}
        }
    },
    size: 0
}
const repositories_aggs_body = {
    "aggs" : {
        "repositories_agg" : {
            "terms" : {"field" : "repository.raw"}
        }
    },
    size: 0
}
const locations_aggs_body = {
    "aggs" : {
        "locations_agg" : {
            "nested": {
                "path": "locations",
            },
            "aggs" : {
                "unique_locations": {
                    "terms": {
                        "field": "locations.term"
                    }
                }
            }
        }
    },
    _source: {
        "includes": ["locations"]
    },
    size: 10
}

const artists_aggs_body = {
    "aggs" : {
        "artists_agg" : {
            "nested": {
                "path": "involvedPersons",
            },
            "aggs" : {
                "unique_artists": {
                    "terms": {
                        "field": "involvedPersons.name.raw"
                    }
                }
            }
        }
    },
    _source: {
        "includes": ["involvedPersons.name"]
    },
    size: 0
}
const mediums_aggs_body = {
    "aggs" : {
        "medium_agg" : {
            "terms" : {"field" : "medium.raw"}
        }
    },
    _source: {
        "includes": ["titles", "medium"]
    }
}

const getMultiMatchQuery = (searchText) => {
    return {
        "multi_match": {
            "query": searchText,
            "fields": ["provenance", "medium", "exhibitionHistory", "owner", "objectName", "repository", "description", "signature", "inscription", "markings"],
            "operator": "AND"
        }
    }
}
const getTitleMatchQuery = (searchText) => {
    return {
        "nested": {
            "path": "titles",
            "query": {
                "match": {
                    "titles.title": {
                        "query": searchText,
                        "fuzziness": 6,
                        "boost": 3,
                        "operator": "AND"
                    },
                }
            }
        }
    }
}
const getLocationsMatchQuery = (searchText) => {
    return {
        "nested": {
            "path": "locations",
            "query": {
                "multi_match": {
                    "query": searchText,
                    "fields": ["locations.term", "locations.type"],
                    "operator": "AND"
                }
            }
        }
    }
}

const getRangeFilterQuery = (yearRange) => {
    return {
        "range": {
            "dating.dated": {
                "gte": yearRange[0],
                "lte": yearRange[1]
            }
        },
    }
}

const getClassificationFilterQuery = (classification) => {
    return {
        "term": {
            "classification.classification": classification
        }
    }
}

const getMediumFilterQuery = (medium) => {
    return {
        "wildcard": {
            "medium": medium + "*"
        }
    }
}

const getArtistsFilterQuery = (artists) => {
    return {
        "nested": {
            "path": "involvedPersons",
            "query": {
                "terms": {"involvedPersons.name.raw": artists}
            }
        }
    }
}

const getLocationFilterQuery = (locations) => {
    return {
        "nested": {
            "path": "locations",
            "query": {
                "terms": {"locations.term": locations}
            }
        }
    }
}

const getRepositoriesFilterQuery = (repositories) => {
    return {
        "terms": {"repository.raw": repositories}
    }
}

const getOwnersFilterQuery = (owners) => {
    return {
        "terms": {"owner.raw": owners}
    }
}
module.exports = {
    classifications_aggs_body,
    owners_aggs_body,
    repositories_aggs_body,
    locations_aggs_body,
    artists_aggs_body,
    mediums_aggs_body,
    getMultiMatchQuery,
    getTitleMatchQuery,
    getLocationsMatchQuery,
    getRangeFilterQuery,
    getClassificationFilterQuery,
    getMediumFilterQuery,
    getArtistsFilterQuery,
    getRepositoriesFilterQuery,
    getOwnersFilterQuery,
    getLocationFilterQuery
}