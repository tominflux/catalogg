
const { connect } = require("@x-logg/mongoops")
const { insertIntoCollection, findInCollection, updateInCollection, deleteFromCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../../util/collections")

const createCollection = async (
    options,
    catalogueId,
    collectionId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = collectionId
    //
    const record = { 
        catalogueId,
        identifier 
    }
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.COLLECTION,
        [record]
    )
    //
    connection.close()
}

const readCollections = async (
    options,
    catalogueId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const collections = await findInCollection(
        database,
        COLLECTION_NAMES.COLLECTION,
        { catalogueId }
    )
    //
    connection.close()
    //
    return collections
}

const deleteCollection = async (
    options,
    catalogueId,
    collectionId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = collectionId
    //
    await deleteFromCollection(
        database,
        COLLECTION_NAMES.COLLECTION,
        { catalogueId, identifier }
    )
    //
    connection.close()
}

exports.createCollection = createCollection
exports.readCollections = readCollections
exports.deleteCollection = deleteCollection