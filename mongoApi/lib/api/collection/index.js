const { 
    insertIntoCollectionsCollection, 
    getAllFromCollectionsCollection, 
    deleteFromCollectionsCollection, 
    createItemsCollection, 
    deleteItemsCollection, 
    createStocksCollection,
    deleteStocksCollection
} = require("../../util/functions/collection")
const { mongoConnect } = require("../../util/connect")


const createCollection = async (
    options,
    catalogueIdentifier,
    collectionIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await insertIntoCollectionsCollection(
        database, catalogueIdentifier, collectionIdentifier
    )
    await createItemsCollection(
        database, catalogueIdentifier, collectionIdentifier
    )
    await createStocksCollection(
        database, catalogueIdentifier, collectionIdentifier
    )
    //
    connection.close()
}

const readCollections = async (
    options,
    catalogueIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const collections = await getAllFromCollectionsCollection(
        database, catalogueIdentifier
    )
    //
    connection.close()
    //
    return collections
}

const deleteCollection = async (
    options,
    catalogueIdentifier,
    collectionIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await deleteFromCollectionsCollection(
        database, catalogueIdentifier, collectionIdentifier
    )
    await deleteItemsCollection(
        database, catalogueIdentifier, collectionIdentifier
    )
    await deleteStocksCollection(
        database, catalogueIdentifier, collectionIdentifier
    )
    //
    connection.close()
}

exports.createCollection = createCollection
exports.readCollections = readCollections
exports.deleteCollection = deleteCollection