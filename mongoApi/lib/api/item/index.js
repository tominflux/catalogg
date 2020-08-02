const {
    insertIntoItemsCollection, 
    findInItemsCollection,
    getFromItemsCollection,
    updateInItemsCollection,
    deleteFromItemsCollection
} = require("../../util/functions/item")
const { mongoConnect } = require("../../util/connect")

const createItem = async (
    options,
    catalogueIdentifier, 
    collectionIdentifier, 
    lockedItem,
    variationObjs
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await insertIntoItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        lockedItem,
        variationObjs
    )
    //
    connection.close()
}

const readItems = async (
    options,
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    variationFilter
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const items = await findInItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationFilter
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
    itemIdentifier,
    variationObj
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const item = await getFromItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj
    )
    //
    connection.close()
    //
    return item
}

const updateItemStock = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObj,
    stock
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await updateInItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        [ variationObj ],
        [ stock ]
    )
    //
    connection.close()
}

const updateItemStocks = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObjs,
    stocks
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await updateInItemsCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObjs,
        stocks
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
exports.updateItemStock = updateItemStock
exports.updateItemStocks = updateItemStocks
exports.deleteItem = deleteItem