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
        if (err){
            res.send(err);
        }
        let graphics = resp.hits.hits.map(graphic => graphic._source )
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
        if (err){
            res.send(err)
        }else {
            let graphics = [];
            graphics = resp.hits.hits.map(hit => hit._source)
            graphics.map(graphic => {
                graphic.dating.dated = graphic.dating.dated.replace(/\D/g, '').substring(0,4)
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

const FullTextSearch = async function(req, res){
    const searchText = req.query.text
    await client.search({
        index: 'cranach_graphic',
        body:  {
            "query": {
                "bool": {
                    "should": [
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
                    ]
                }
            },
            "sort": [ "_score"],
            size: 100,
        }
    },function (error,response) {
        res.send(response);
    })

}
module.exports = {
    getAll,
    getTimelineList,
    FullTextSearch
};