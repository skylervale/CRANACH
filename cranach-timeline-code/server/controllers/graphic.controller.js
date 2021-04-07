const elasticsearch = require('elasticsearch');
const graphicService = require('../services/graphic.service')
const queries = require('../elasticsearch/queries')
const esClient = require('../elasticsearch/client')
const client = esClient.getClient()

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
        if (err) {
            res.send(err);
        }
        let graphics = resp.hits.hits.map(graphic => graphic._source)
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
            let graphics = [];
            graphics = resp.hits.hits.map(hit => {
               return {
                   ...hit._source,
                   id: hit._id
               }
            })
            graphics.map(graphic => {
                graphic.dating.dated = graphic.dating.dated.replace(/\D/g, '').substring(0, 4)
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
        index: 'cranach_graphic',
        body: body
    }, function (error, response) {
        if (error) {
            res.send(error)
        }
        let graphics = [];
        if (response.hits && response.hits.hits.length !== 0) {
            graphics = response.hits.hits.map(hit => {
                return {
                    ...hit._source,
                    id: hit._id
                }
            })
        }
        res.send(graphics);
    })

}
const getFilterData = async function(req,res){
    let filters = {
        "classifications": await graphicService.getClassifications(),
        "mediumValues": await graphicService.getMediumValues(),
        "artists": await graphicService.getArtistsList(),
        "locations": await graphicService.getLocationsList(),
        "repositories": await graphicService.getRepositoryValues(),
        "owners": await graphicService.getOwnersList(),
    }
    res.send(filters)
}

const getSingleGraphic = async function(req,res){
    try {
        const { id } = req.query
        const resp = await graphicService.findSingleGraphic(id)
        res.send(resp)
    } catch (error) {
        return res.status(404).send({
            message: 'Graphic not found with a given Id'
        });
    }
}


module.exports = {
    getAll,
    getTimelineList,
    FullTextSearch,
    getFilterData,
    getSingleGraphic
};
