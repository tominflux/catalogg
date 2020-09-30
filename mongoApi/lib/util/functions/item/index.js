const { getItemsCollectionName } = require("../../misc")
const { 
    insertIntoCollection, 
    findInCollection, 
    deleteFromCollection, 
    updateInCollection 
} = require("@x-logg/mongoops")


const insertIntoItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    lockedItem
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const document = {
        ...lockedItem
    }
    //
    await insertIntoCollection(
        database,
        collectionName,
        [ document ]
    )
}

const findInItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    propertyFilter={}
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const query = (
        ([...Object.keys(propertyFilter)].length > 0) ? 
            {
                properties: {
                    ...propertyFilter
                } 
            } : null
    )
    //
    const items = await findInCollection(
        database,
        collectionName,
        query
    )
    //
    return items
}

const getFromItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const items = await findInCollection(
        database,
        collectionName,
        { identifier: itemIdentifier }
    )
    //
    return (
        (items.length > 0) ? 
            items[0] : null
    )
}

const updateInItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    updatedProperties
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await updateInCollection(
        database,
        collectionName,
        { identifier: itemIdentifier },
        { properties: updatedProperties }
    )
}

const deleteFromItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await deleteFromCollection(
        database,
        collectionName,
        { identifier: itemIdentifier }
    )
}


exports.insertIntoItemsCollection = insertIntoItemsCollection
exports.findInItemsCollection = findInItemsCollection
exports.getFromItemsCollection = getFromItemsCollection
exports.updateInItemsCollection = updateInItemsCollection
exports.deleteFromItemsCollection = deleteFromItemsCollection