const { insertIntoCollectionsCollection, getAllFromCollectionsCollection, deleteFromCollectionsCollection } = require("../../util/functions/collection")


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
    //
    connection.close()
}

exports.createCollection = createCollection
exports.readCollections = readCollections
exports.deleteCollection = deleteCollection