const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});

const getAll = function(req, res) {
    client.search({
        index: 'cranach_painting',
        body: {
            "query": {
                "match_all": {},
            },
        size: 2500,
        from: 0
        }
    },function (err,resp) {
        res.send(resp);
    })
}

module.exports = {
    getAll
};