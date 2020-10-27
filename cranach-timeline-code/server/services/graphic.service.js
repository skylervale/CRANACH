const queries = require('../elasticsearch/queries')
const client = require('../elasticsearch/client')
const index = 'cranach_graphic'

const getClassifications = async () => {
    const {classifications_aggs_body} = queries
    const resp = await client.search(index, classifications_aggs_body)
    return  resp.aggregations.classification_agg.buckets.map(bucket => bucket.key)
}
const getMediumValues = async () => {
    const {mediums_aggs_body} = queries
    const resp = await client.search(index, mediums_aggs_body)
    let mediumValues = []
    resp.aggregations.medium_agg.buckets.map(bucket => {
        if(!bucket.key){
            return
        }
        // remove unclean data (ex: \n[cda 2018]) and push to value array
        mediumValues.push(bucket.key.split("\n")[0])
    })
    return mediumValues
}
const getArtistsList = async () => {
    const {artists_aggs_body} = queries
    const resp = await client.search(index, artists_aggs_body)
    let artists = []
    resp.aggregations.artists_agg.unique_artists.buckets.map(bucket => {
        if(!bucket.key){
            return
        }
        artists.push(bucket.key)
    })
    return artists
}

const getLocationsList = async () => {
    const {locations_aggs_body} = queries
    const resp = await client.search(index, locations_aggs_body)
    let artists = []
    let locations = []
    resp.aggregations.locations_agg.unique_locations.buckets.map(bucket => {
        if (!bucket.key) {
            return
        }
        locations.push(bucket.key)
    })
    return locations
}




const getRepositoryValues = async () => {
    const {repositories_aggs_body} = queries
    const resp = await client.search(index, repositories_aggs_body)
    let repositories = []
    resp.aggregations.repositories_agg.buckets.map(bucket => {
        if(!bucket.key){
            return
        }
        repositories.push(bucket.key)
    })
    return repositories;
}
const getOwnersList = async () => {
    const {owners_aggs_body} = queries
    const resp = await client.search(index, owners_aggs_body)
    let owners = []
    resp.aggregations.owners_agg.buckets.map(bucket => {
        if(!bucket.key){
            return
        }
        owners.push(bucket.key)
    })
    return owners;
}



module.exports = {
    getClassifications,
    getMediumValues,
    getArtistsList,
    getLocationsList,
    getRepositoryValues,
    getOwnersList
}