const { connect } = require("@x-logg/mongoops")
const { insertIntoCollection, findInCollection, updateInCollection, deleteFromCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../../util/collections")

const createItem = async (
    options,
    catalogueId, 
    collectionId, 
    lockedItem
) => {
    //
    const { connection, database } = await connect(options)
    //
    const record = {
        catalogueId,
        collectionId,
        ...lockedItem
    }
    //
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.ITEM,
        [record]
    )
    //
    connection.close()
}

const readItems = async (
    options,
    catalogueId, 
    collectionId, 
    archetypeId=null,
    propertyFilter={}
) => {
    //
    const { connection, database } = await connect(options)
    //Start building query
    let query = { catalogueId, collectionId}
    //Add archetype ID if given
    if (archetypeId) {
        query = {
            archetypeId,
            ...query
        }
    }
    //Add all fields in property filter.
    for (const key in propertyFilter) {
        const queryKey = `properties.${key}`
        const queryValue = propertyFilter[key]
        query = {
            [queryKey]: queryValue,
            ...query
        }
    }
    //
    const records = await findInCollection(
        database,
        COLLECTION_NAMES.ITEM,
        query
    )
    //
    connection.close()
    //
    const lockedItems = records.map(record  => {
        const { 
            catalogueId, 
            collectionId,
            ...lockedItem
        } = record
        return lockedItem
    })
    //
    return lockedItems
}

const readItem = async (
    options,
    catalogueId,
    collectionId,
    itemId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = itemId
    //
    const query = {
        catalogueId,
        collectionId,
        identifier
    }
    //
    const records = await findInCollection(
        database,
        COLLECTION_NAMES.ITEM,
        query
    )
    //
    connection.close()
    //
    if (records.length === 0) {
        return null
    }
    //
    const getLockedItem = () => {
        const { 
            catalogueId, 
            collectionId,
            ...lockedItem
        } = records[0]
        return lockedItem
    }
    //
    return getLockedItem()
}


const updateItem = async (
    options,
    catalogueId,
    collectionId,
    lockedItem
) => {
    //
    const { connection, database } = await connect(options)
    //
    const { identifier, properties } = lockedItem
    //
    const query = {
        catalogueId,
        collectionId,
        identifier
    }
    //
    await updateInCollection(
        database,
        COLLECTION_NAMES.ITEM,
        query,
        { properties }
    )
    //
    connection.close()
}

const deleteItem = async (
    options,
    catalogueId,
    collectionId,
    itemId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = itemId
    //
    const query = {
        catalogueId,
        collectionId,
        identifier
    }
    //
    await deleteFromCollection(
        database,
        COLLECTION_NAMES.ITEM,
        query
    )
    //
    connection.close()
}

exports.createItem = createItem
exports.readItems = readItems
exports.readItem = readItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem