const { getItemsCollectionName } = require("../../misc")
const { insertIntoCollection, findInCollection, deleteFromCollection } = require("../../operations")


const insertIntoItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    lockedItem,
    variationObjs
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    /*
    const document = {
        archetypeIdentifier: item.archetype.identifier.data,
        identifier: item.identifier.data,
        properties: item.properties
    }
    */
    //
    for (const variationObj of variationObjs) {
        const document = {
            ...lockedItem,
            ...variationObj,
            stock: 0
        }
        await insertIntoCollection(
            database,
            collectionName,
            [ document ]
        )
    }
}

const findInItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationFilter
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const items = await findInCollection(
        database,
        collectionName,
        {
            identifier: itemIdentifier,
            ...variationFilter
        }
    )
    //
    return items
}

const getInItemsCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObj
) => {
    const collectionName = getItemsCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const items = await findInCollection(
        database,
        collectionName,
        {
            identifier: itemIdentifier,
            ...variationObj
        }
    )
    //
    return (
        (items.length > 0) ? 
            items[0] : null
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
        {
            identifier: itemIdentifier
        }
    )
}


exports.insertIntoItemsCollection = insertIntoItemsCollection
exports.findInItemsCollection = findInItemsCollection
exports.getInItemsCollection = getInItemsCollection
exports.deleteFromItemsCollection = deleteFromItemsCollection