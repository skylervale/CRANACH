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
        size: 2500,
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
                    "must": [
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
                        {
                            "exists": {
                                "field": "dating.dated"
                            }
                        }
                    ]
                }
            },
            size: 20,
            _source: {
                "includes": ["titles", "images", "dating.dated"]
            }
        }
    }, function (err, resp) {
        res.send(resp)
    })
}

module.exports = {
    getAll,
    getTimelineList
};