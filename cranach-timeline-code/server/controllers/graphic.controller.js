const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'cranach_elasticsearch:9200',
    apiVersion: '7.x',
});

const getAll = function(req, res) {
    client.search({
        index: 'cranach_graphic',
        body: {
            "query": {
                "match_all": {}
            }
        }
    },function (err,resp) {
        console.log("search error", err)
        console.log("search resp", resp)
        res.send(resp);
    })
}

module.exports = {
    getAll
};