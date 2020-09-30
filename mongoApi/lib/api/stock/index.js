
const { connect } = require("@x-logg/mongoops")
const { insertIntoCollection, findInCollection, updateInCollection, deleteFromCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../../util/collections")

const createStocksForItem = async (
    options,
    catalogueId, 
    collectionId, 
    itemId,
    variationObjs
) => {
    //
    const { connection, database } = await connect(options)
    //
    for (const variationObj of variationObjs) {
        const record = {
            catalogueId,
            collectionId,
            itemId,
            stock: 0,
            ...variationObj
        }
        await insertIntoCollection(
            database,
            COLLECTION_NAMES.STOCK,
            [ record ]
        )
    }
    //
    connection.close()
}

const readItemStocks = async (
    options,
    catalogueId, 
    collectionId, 
    itemId,
) => {
    //
    const { connection, database } = await connect(options)
    //
    const query = {
        catalogueId,
        collectionId,
        itemId
    }
    //
    const records = await findInCollection(
        database,
        COLLECTION_NAMES.STOCK,
        query
    )
    //
    const stocks = records.map(record => {
        const {
            catalogueId,
            collectionId,
            ...stock
        } = record
        return stock
    })
    //
    connection.close()
    //
    return stocks
}

const readStock = async (
    options,
    catalogueId, 
    collectionId, 
    itemId,
    variationObj
) => {
    //
    const { connection, database } = await connect(options)
    //
    const query = {
        catalogueId,
        collectionId,
        itemId,
        ...variationObj
    }
    //
    const records = await findInCollection(
        database,
        COLLECTION_NAMES.STOCK,
        query
    )
    //
    connection.close()
    //
    if (records.length === 0) {
        return null
    }
    //
    const getStock = () => {
        const {
            catalogueId,
            collectionId,
            ...stock
        } = records[0]
        return stock
    }
    //
    return getStock()
}

const updateItemStocks = async (
    options,
    catalogueId, 
    collectionId, 
    itemId,
    stock
) => {
    //
    const { connection, database } = await connect(options)
    //
    const query = {
        catalogueId,
        collectionId,
        itemId
    }
    //
    await updateInCollection(
        database,
        COLLECTION_NAMES.STOCK,
        query,
        { stock }
    )
    //
    connection.close()
}

const updateStock = async (
    options,
    catalogueId, 
    collectionId, 
    itemId,
    variationObj,
    stock
) => {
    //
    const { connection, database } = await connect(options)
    //
    const query = {
        catalogueId,
        collectionId,
        itemId,
        ...variationObj
    }
    //
    await updateInCollection(
        database,
        COLLECTION_NAMES.STOCK,
        query,
        { stock }
    )
    //
    connection.close()
}

const deleteItemStocks = async (
    options,
    catalogueId, 
    collectionId, 
    itemId,
) => {
    //
    const { connection, database } = await connect(options)
    //
    const query = {
        catalogueId,
        collectionId,
        itemId
    }
    //
    await deleteFromCollection(
        database,
        COLLECTION_NAMES.STOCK,
        query
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