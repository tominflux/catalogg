const { 
    createMongoCollection, 
    getMongoCollections,
    deleteMongoCollection,
    findInCollection
} = require("@x-logg/mongoops")
const {
    getArchetypesCollectionName,
    getCollectionsCollectionName,
    getCataloggCollectionName
} = require("../../misc")

const getCatalogueNames = async (database) => {
    const names = await findInCollection(
        database, getCataloggCollectionName()
    )
    return names
}

const createArchetypesCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    await createMongoCollection(database, collectionName)
}

const createCollectionsCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    await createMongoCollection(database, collectionName)
}

const deleteArchetypesCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    await deleteMongoCollection(database, collectionName)
}

const deleteCollectionsCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    await deleteMongoCollection(database, collectionName)
}

exports.getCatalogueNames = getCatalogueNames
exports.createArchetypesCollection = createArchetypesCollection
exports.createCollectionsCollection = createCollectionsCollection
exports.deleteArchetypesCollection = deleteArchetypesCollection
exports.deleteCollectionsCollection = deleteCollectionsCollection