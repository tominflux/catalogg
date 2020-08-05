const {
    insertIntoItemsCollection, 
    findInItemsCollection,
    getFromItemsCollection,
    updateInItemsCollection,
    deleteFromItemsCollection
} = require("../../util/functions/item")
const { mongoConnect } = require("../../util/connect")
const { apiErr } = require("../../util/misc")

const createItem = async (
    options,
    catalogueIdentifier, 
    collectionIdentifier, 
    lockedItem
) => {
    //
    const { connection, database } = await mongoConnect(options)
    /*
    //Ensure item does not already exist.
    const item = await getFromItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        lockedItem.identifier
    )
    const alreadyExists = (item !== null)
    if (alreadyExists) {
        //
        connection.close()
        //
        console.log(lockedItem.identifier)
        throw apiErr(
            `Could not create item "${lockedItem.identifier}", ` +
            `already exists.`
        )
    }
    */
    //
    await insertIntoItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        lockedItem
    )
    //
    connection.close()
}

const readItems = async (
    options,
    catalogueIdentifier, 
    collectionIdentifier, 
    propertyFilter 
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const items = await findInItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        propertyFilter
    )
    //
    connection.close()
    //
    return items
}

const readItem = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const item = await getFromItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    connection.close()
    //
    return item
}


const updateItem = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    newProperties
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await updateInItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        newProperties
    )
    //
    connection.close()
}

const deleteItem = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await deleteFromItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    connection.close()
}

exports.createItem = createItem
exports.readItems = readItems
exports.readItem = readItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem