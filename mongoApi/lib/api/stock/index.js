const { 
    getItemFromStocksCollection, 
    insertIntoStocksCollection, 
    updateItemInStocksCollection,
    updateVariationInStocksCollection,
    deleteFromStocksCollection,
    getVariationFromStocksCollection
} = require("../../util/functions/stock")
const { mongoConnect } = require("../../util/connect")
const { apiErr } = require("../../util/misc")


const createStocksForItem = async (
    options,
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier,
    variationObjs
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //Ensure item does not already exist in stocks collection.
    const stocks = await getItemFromStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        {}
    )
    const alreadyExists = (stocks.length > 0)
    if (alreadyExists) {
        //
        connection.close()
        //
        throw apiErr(
            `Could not create stocks for item "${itemIdentifier}", ` +
            `already exists.`
        )
    }
    //
    await insertIntoStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObjs
    )
    //
    connection.close()
}

const readItemStocks = async (
    options,
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const stocks = await getItemFromStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    connection.close()
    //
    return stocks
}

const readStock = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObj
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const stock = await getVariationFromStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj
    )
    //
    connection.close()
    //
    return stock
}

const updateItemStocks = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    stock
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await updateItemInStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        stock
    )
    //
    connection.close()
}

const updateStock = async (
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
    await updateVariationInStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj,
        stock
    )
    //
    connection.close()
}

const deleteItemStocks = async (
    options,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await deleteFromStocksCollection(
        database,
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    connection.close()
}

exports.createStocksForItem = createStocksForItem
exports.readItemStocks = readItemStocks
exports.readStock = readStock
exports.updateItemStocks = updateItemStocks
exports.updateStock = updateStock
exports.deleteItemStocks = deleteItemStocks