const { getCollectionsCollectionName, getItemsCollectionName } = require("../../misc")
const { 
    insertIntoCollection, 
    findInCollection, 
    deleteFromCollection,
    createMongoCollection,
    deleteMongoCollection
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

const createItemsCollection = async (
    database, catalogueIdentifier, collectionIdentifier
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await createMongoCollection(
        database, collectionName
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
    const collections = documents.map(
        document => ({ identifier: document.identifier })
    )
    //
    return collections
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

const deleteItemsCollection = async (
    database, catalogueIdentifier, collectionIdentifier
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await deleteMongoCollection(
        database, collectionName
    )
}

exports.insertIntoCollectionsCollection = insertIntoCollectionsCollection
exports.createItemsCollection = createItemsCollection
exports.getAllFromCollectionsCollection = getAllFromCollectionsCollection
exports.deleteFromCollectionsCollection = deleteFromCollectionsCollection
exports.deleteItemsCollection = deleteItemsCollection