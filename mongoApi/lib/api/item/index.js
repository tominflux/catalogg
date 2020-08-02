const {
    insertIntoItemsCollection
} = require("../../util/functions/item")

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
    connection.close()
}

const readItem = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variation
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    connection.close()
}

const updateItemStock = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variation,
    stock
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    connection.close()
}

const updateItemStocks = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    stocks
) => {
    //
    const { connection, database } = await mongoConnect(options)
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
    connection.close()
}