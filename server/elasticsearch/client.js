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

const createBoolQuery = (size = 500, scoreSort = true) => {
    return {
        query: {
            bool: {
                filter: []
            }
        },
        size: size,
        sort: scoreSort ? ["_score"] : []
    }
}

const addShouldBooleanQuery = (queryObject, minimunShouldMatch = 1 ) => {
    const { bool } = queryObject.query
    if (typeof(bool) !== undefined){
       queryObject.query.bool =  {
            ...bool,
           should: [],
           minimum_should_match : minimunShouldMatch
        }
        return queryObject
    }
    throw new Error("Could not add Should the provided query is not a valid one")
}

const addShouldClause = (queryObject, clause) => {
    const { should } = queryObject.query.bool
    if (typeof(should) !== undefined){
        queryObject.query.bool.should.push(clause)
        return queryObject
    }
    throw new Error("Could not add Should the provided query is not a valid one")
}



const addFilter = (queryObject, filterItem) => {
    if (queryObject.query.bool.filter) {
        queryObject.query.bool.filter.push(filterItem)
        return queryObject
    }
    throw new Error("Could not add Filter the provided query is not a valid one")
}

module.exports = {
    search,
    findOne,
    getClient,
    createBoolQuery,
    addShouldBooleanQuery,
    addShouldClause,
    addFilter
}