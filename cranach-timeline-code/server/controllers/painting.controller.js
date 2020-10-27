const elasticsearch = require('elasticsearch');

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
module.exports = {
    getAll,
    getTimelineList
};