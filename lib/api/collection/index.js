const { createArchetype } = require("aarketype")

const createCollection = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    dataApi
) => {
    await dataApi.createCollection(
        catalogueIdentifier, 
        collectionIdentifier
    )
}

const readCollections = async (catalogueIdentifier, dataApi) => {
    const collections = await dataApi.readCollections(catalogueIdentifier)
    return collections
}

const deleteCollection = async (catalogueIdentifier, collectionIdentifier, dataApi) => {
    await dataApi.deleteCollection(catalogueIdentifier, collectionIdentifier)
}

exports.createCollection = createCollection
exports.readCollections = readCollections
exports.deleteCollection = deleteCollection