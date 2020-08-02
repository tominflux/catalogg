const { getCollectionsCollectionName } = require("../catalogue")
const { 
    insertIntoCollection, 
    findInCollection, 
    deleteFromCollection 
} = require("../../operations")


const insertIntoCollectionsCollection = async (
    database, catalogueIdentifier, collectionIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    const document = {
        identifier: collectionIdentifier
    }
    //
    await insertIntoCollection(
        database,
        collectionName,
        [ document ]
    )
}

const getAllFromCollectionsCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    const documents = await findInCollection(
        database,
        collectionName
    )
    //
    return (
        (documents.length > 0) ? 
            documents[0] : null
    )
}

const deleteFromCollectionsCollection = async (
    database, catalogueIdentifier, collectionIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    await deleteFromCollection(
        database,
        collectionName,
        { identifier: collectionIdentifier }
    )
}

exports.insertIntoCollectionsCollection = insertIntoCollectionsCollection
exports.getAllFromCollectionsCollection = getAllFromCollectionsCollection
exports.deleteFromCollectionsCollection = deleteFromCollectionsCollection