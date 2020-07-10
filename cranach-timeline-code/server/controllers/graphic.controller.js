const elasticsearch = require('elasticsearch');



const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});

const getAll = function (req, res) {
    client.search({
        index: 'cranach_graphic',
        body: {
            "query": {
                "match_all": {},
            },
            size: 1000,
            from: 0
        }
    }, function (err, resp) {
        res.send(resp);
    })
}

const getTimelineList = function (req, res) {
    client.search({
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
            const graphics = []
            resp.hits.hits.forEach((hit) => {
               if (graphics.length === 0){
                   graphics.push(hit._source)
               } else {
                   const found = graphics.some(graphic => graphic.dating.dated === hit._source.dating.dated)
                    if (!found && parseInt(hit._source.dating.dated)){
                        graphics.push(hit._source)
                    }
               }
            })
            res.send(graphics)
        }
    })
}

module.exports = {
    getAll,
    getTimelineList
};