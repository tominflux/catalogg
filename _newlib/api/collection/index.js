const { dataOperator } = require("../../../../app")



const createCollection = async (catalogueIdentifier, collectionIdentifier, dataApi) => {
    await dataApi.createCollection(catalogueIdentifier, collectionIdentifier)
}

const readCollections = async (catalogueIdentifier, dataApi) => {
    const collections = await dataApi.readCollections(catalogueIdentifier)
}

const deleteCollection = async (catalogueIdentifier, collectionIdentifier, dataApi) => {
    await dataApi.deleteCollection(catalogueIdentifier, collectionIdentifier)
}