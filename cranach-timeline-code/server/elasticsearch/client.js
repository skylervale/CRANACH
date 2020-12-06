const elasticsearch = require('elasticsearch');
const config = require('./config')
const {host, apiVersion} = config
const getClient =  () => {
    return new elasticsearch.Client({host, apiVersion});
}
const search = async (index, body) => {
    const client = getClient()
    return await client.search({
        index: index,
        body: body
    })
}

const findOne = async (index, id) => {
    const client = getClient()
    return  await client.get({
        index: index,
        id: id
    })
}
module.exports = {
    search,
    findOne,
    getClient
}