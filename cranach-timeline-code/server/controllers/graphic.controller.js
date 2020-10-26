const elasticsearch = require('elasticsearch');


const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});

const getAll = async function (req, res) {
    await client.search({
        index: 'cranach_graphic',
        body: {
            "query": {
                "match_all": {},
            },
            size: 1000,
            from: 0,
            _source: {
                "includes": ["titles", "images", "dating"]
            }
        }
    }, function (err, resp) {
        if (err) {
            res.send(err);
        }
        let graphics = resp.hits.hits.map(graphic => graphic._source)
        res.send(graphics);
    })
}

const getTimelineList = async function (req, res) {
    await client.search({
        index: 'cranach_graphic',
        body: {
            "query": {
                "bool": {
                    "must":
                        {
                            "nested": {
                                "path": "images",
                                "query": {
                                    "exists": {
                                        "field": "images"
                                    }
                                }
                            }
                        },
                    "must_not": {
                        "term": {
                            "dating.dated.keyword": ""
                        }
                    }
                },
            },
            "sort": [
                {
                    "dating.dated.keyword": {
                        "order": "asc",
                    }
                }
            ],
            size: 1000,
            _source: {
                "includes": ["titles", "images", "dating.dated"]
            }
        }
    }, function (err, resp) {
        if (err) {
            res.send(err)
        } else {
            let graphics = [];
            graphics = resp.hits.hits.map(hit => hit._source)
            graphics.map(graphic => {
                graphic.dating.dated = graphic.dating.dated.replace(/\D/g, '').substring(0, 4)
            })
            graphics = graphics.reduce(function (object, graphic) {
                const date = graphic.dating.dated;
                if (!object.hasOwnProperty(date)) {
                    object[date] = [];
                }
                object[date].push(graphic);
                return object;
            }, {});
            res.send(graphics)
        }
    })
}

const FullTextSearch = async function (req, res) {
    const searchText = req.query.text ? req.query.text : ''
    const yearRange = req.query.yearRange ? req.query.yearRange : [1500, 1600]
    const artists = req.query.artists ? req.query.artists : []
    const classification = req.query.classification
    const medium = req.query.medium
    const body = {
        query: {
            bool: {
                should: [
                    {
                        "query_string": {
                            "query": "*" + searchText + "*",
                            "fields": ["provenance", "medium", "exhibitionHistory", "owner", "objectName", "repository", "description", "signature", "inscription", "markings"],
                            "fuzziness": "AUTO"
                        }
                    },
                    {
                        "nested": {
                            "path": "titles",
                            "query": {
                                "query_string": {
                                    "query": "*" + searchText + "*",
                                    "fields": ["titles.title^3"],
                                    "fuzziness": "AUTO"
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "locations",
                            "query": {
                                "query_string": {
                                    "query": "*" + searchText + "*",
                                    "fields": ["locations.term", "locations.type"],
                                    "fuzziness": "AUTO"
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "involvedPersons",
                            "query": {
                                "query_string": {
                                    "query": "*" + searchText + "*",
                                    "fields": ["involvedPersons.alternativeName^3", "involvedPersons.alternativeName^3"],
                                    "fuzziness": "AUTO"
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "involvedPersonsNames",
                            "query": {
                                "nested": {
                                    "path": "involvedPersonsNames.details",
                                    "query": {
                                        "query_string": {
                                            "query": "*" + searchText + "*",
                                            "fields": ["involvedPersonsNames.details.name^3"],
                                            "fuzziness": "AUTO"
                                        }
                                    }
                                }
                            }
                        }
                    },
                ],
                filter: [
                    {
                        "range": {
                            "dating.dated": {
                                "gte": yearRange[0],
                                "lte": yearRange[1]
                            }
                        },
                    }
                ]

            }
        },
        "sort": ["_score"],
        size: 100,
    }
    //@todo optimise adding filters to query
    if (classification){
        const filterItem = {
            "term": {
                "classification.classification": classification
            }
        }
        body.query.bool.filter.push(filterItem)
    }
    if (medium){
        const filterItem = {
            "wildcard": {
                "medium": medium + "*"
            }
        }
        body.query.bool.filter.push(filterItem)
    }
    if (artists.length > 0){
        const filterItem = {
            "nested": {
                "path": "involvedPersons",
                "query": {
                    "terms": {"involvedPersons.name.raw": artists}
                }
            }
        }
        body.query.bool.filter.push(filterItem)
    }
    await client.search({
        index: 'cranach_graphic',
        body: body
    }, function (error, response) {
        if (error) {
            res.send(error)
        }
        let graphics = [];
        if (response.hits.hits.length !== 0) {
            graphics = response.hits.hits.map(hit => hit._source)
        }
        res.send(graphics);
    })

}
const getClassifications = async function(req,res){
    await client.search({
        index: 'cranach_graphic',
        body: {
            "aggs" : {
                "classification_agg" : {
                    "terms" : {"field" : "classification.classification"}
                }
            }
        }
    }, function(err, resp) {
        if (err) {
            res.send(err);
        }
        console.log("resp", resp)
        let classifications = resp.aggregations.classification_agg.buckets.map(bucket => bucket.key)
        res.send(classifications);
    })
}
const getMediumValues = async function(req,res){
    await client.search({
        index: 'cranach_graphic',
        body: {
            "aggs" : {
                "medium_agg" : {
                    "terms" : {"field" : "medium.raw"}
                }
            },
            _source: {
                "includes": ["titles", "medium"]
            }
        }
    }, function(err, resp) {
        if (err) {
            res.send(err);
        }
        console.log("resp", resp)
        let mediumValues = []
        resp.aggregations.medium_agg.buckets.map(bucket => {
            if(!bucket.key){
               return
            }
            // remove unclean data (ex: \n[cda 2018]) and push to value array
            mediumValues.push(bucket.key.split("\n")[0])
        })
        console.log("mediumValues", mediumValues)
        res.send(mediumValues);
    })
}
const getArtistsList = async function(req,res){
    await client.search({
        index: 'cranach_graphic',
        body: {
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
    }, function(err, resp) {
        if (err) {
            res.send(err);
        }
        let artists = []
        resp.aggregations.artists_agg.unique_artists.buckets.map(bucket => {
            if(!bucket.key){
                return
            }
            artists.push(bucket.key)
        })
        res.send(artists);
    })
}
module.exports = {
    getAll,
    getTimelineList,
    FullTextSearch,
    getClassifications,
    getMediumValues,
    getArtistsList
};