const elasticsearch = require('elasticsearch');
const paintingService = require('../services/painting.service')

const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});

const getAll = async function (req, res) {
    client.search({
        index: 'cranach_painting',
        body: {
            "query": {
                "match_all": {},
            },
            size: 2500,
            from: 0
        }
    }, function (err, resp) {
        res.send(resp);
    })
}

const getTimelineList = async function (req, res) {
    await client.search({
        index: 'cranach_painting',
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
            console.log("resp", resp)
            let paintings = [];
            paintings = resp.hits.hits.map(hit => hit._source)
            paintings.map(painting => {
                painting.dating.dated = painting.dating.dated.replace(/\D/g, '').substring(0, 4)
            })
            paintings = paintings.reduce(function (object, painting) {
                const date = painting.dating.dated;
                if (!object.hasOwnProperty(date)) {
                    object[date] = [];
                }
                object[date].push(painting);
                return object;
            }, {});
            res.send(paintings)
        }
    })
}


const FullTextSearch = async function (req, res) {
    const searchText = req.query.text ? req.query.text : ''
    const yearRange = req.query.yearRange ? req.query.yearRange : [1500, 1800]
    const artists = req.query.artists ? req.query.artists : []
    const classification = req.query.classification
    const medium = req.query.medium
    const repositories = req.query.repositories ? req.query.repositories : []
    const owners = req.query.owners ? req.query.owners : []
    const locations = req.query.locations ? req.query.locations : []
    const body = {
        query: {
            bool: {
                should: [
                    {
                        "multi_match": {
                            "query": searchText,
                            "fields": ["provenance", "medium", "exhibitionHistory", "owner", "objectName", "repository", "description", "signature", "inscription", "markings"],
                            "fuzziness": "AUTO"
                        }
                    },
                    {
                        "nested": {
                            "path": "titles",
                            "query": {
                                "common": {
                                    "titles.title": {
                                        "query": searchText,
                                        "cutoff_frequency": 0.001,
                                    }
                                }
                            }
                        }
                    },
                    {
                        "nested": {
                            "path": "locations",
                            "query": {
                                "multi_match": {
                                    "query": searchText,
                                    "fields": ["locations.term", "locations.type"],
                                    "fuzziness": "AUTO"
                                }
                            }
                        }
                    }
                ],
                minimum_should_match:"1",
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
    if (locations.length > 0){
        const filterItem = {
            "nested": {
                "path": "locations",
                "query": {
                    "terms": {"locations.term": locations}
                }
            }
        }
        body.query.bool.filter.push(filterItem)
    }
    if (repositories.length > 0){
        const filterItem = {
            "terms": {"repository.raw": repositories}
        }
        body.query.bool.filter.push(filterItem)
    }
    if (owners.length > 0){
        const filterItem = {
            "terms": {"owner.raw": owners}
        }
        body.query.bool.filter.push(filterItem)
    }
    await client.search({
        index: 'cranach_painting',
        body: body
    }, function (error, response) {
        if (error) {
            res.send(error)
        }
        let paintings = [];
        if (response.hits && response.hits.hits.length !== 0) {
            paintings = response.hits.hits.map(hit => {
                return {
                    ...hit._source,
                    id: hit._id
                }
            })
        }
        res.send(paintings);
    })
}

const getFilterData = async function(req,res){
    let filters = {
        "classifications": await paintingService.getClassifications(),
        "mediumValues": await paintingService.getMediumValues(),
        "artists": await paintingService.getArtistsList(),
        "locations": await paintingService.getLocationsList(),
        "repositories": await paintingService.getRepositoryValues(),
        "owners": await paintingService.getOwnersList(),
    }
    res.send(filters)
}

const getSinglePainting = async function(req,res){
    const { id } = req.query
    const resp = await paintingService.findSinglePainting(id)
    res.send(resp)
}
module.exports = {
    getAll,
    getTimelineList,
    FullTextSearch,
    getFilterData,
    getSinglePainting
};