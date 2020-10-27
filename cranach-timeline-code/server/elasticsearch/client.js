const elasticsearch = require('elasticsearch');

const getClient =  () => {
    return new elasticsearch.Client({
        host: 'cranach_elasticsearch:9200',
        apiVersion: '7.x',
    });
}
const search = async (index, body) => {
    const client = getClient()
    return await client.search({
        index: index,
        body: body
    })
}
module.exports = {
    search
}