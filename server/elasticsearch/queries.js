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
module.exports = {
    classifications_aggs_body,
    owners_aggs_body,
    repositories_aggs_body,
    locations_aggs_body,
    artists_aggs_body,
    mediums_aggs_body
}