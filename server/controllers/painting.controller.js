const elasticsearch = require('elasticsearch');
const paintingService = require('../services/painting.service')
const queries = require('../elasticsearch/queries')
const esClient = require('../elasticsearch/client')
const client = esClient.getClient()

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
                            "dating.dated": ""
                        }
                    }
                },
            },
            "sort": [
                {
                    "dating.dated": {
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
            paintings = resp.hits.hits.map(hit => {
                return {
                    ...hit._source,
                    id: hit._id
                }
            })
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
    const {
        getMultiMatchQuery,
        getTitleMatchQuery,
        getLocationsMatchQuery,
        getClassificationFilterQuery,
        getMediumFilterQuery,
        getRangeFilterQuery,
        getLocationFilterQuery,
        getArtistsFilterQuery,
        getOwnersFilterQuery,
        getRepositoriesFilterQuery } = queries
    const {
        text: searchText = '',
        classification = '',
        yearRange = [],
        artists = [],
        medium = [],
        repositories = [],
        owners = [],
        locations = [] } = req.query

    const body = esClient.createBoolQuery(2300)
    if (searchText !== '') {
        esClient.addShouldBooleanQuery(body)
        esClient.addShouldClause(body, getTitleMatchQuery(searchText))
        esClient.addShouldClause(body, getMultiMatchQuery(searchText))
        esClient.addShouldClause(body, getLocationsMatchQuery(searchText))
    }
    if (classification !== ''){
        esClient.addFilter(body, getClassificationFilterQuery(classification))
    }
    if (yearRange.length > 0){
        esClient.addFilter(body, getRangeFilterQuery(yearRange))
    }
    if (medium.length > 0){
        esClient.addFilter(body, getMediumFilterQuery(medium))
    }
    if (artists.length > 0){
        esClient.addFilter(body, getArtistsFilterQuery(artists))
    }
    if (locations.length > 0){
        esClient.addFilter(body, getLocationFilterQuery(locations))
    }
    if (repositories.length > 0){
        esClient.addFilter(body, getRepositoriesFilterQuery(repositories))
    }
    if (owners.length > 0){
        esClient.addFilter(body, getOwnersFilterQuery(owners))
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