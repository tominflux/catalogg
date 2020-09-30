const { 
    getStocksCollectionName
} = require("../../misc")
const { 
    findInCollection, 
    insertIntoCollection,
    updateInCollection,
    deleteFromCollection
} = require("../../operations")

const insertIntoStocksCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObjs
) => {
    const collectionName = getStocksCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    for (const variationObj of variationObjs) {
        const document = {
            itemIdentifier,
            stock: 0,
            ...variationObj,
        }
        await insertIntoCollection(
            database,
            collectionName,
            [ document ]
        )
    }
}

const getItemFromStocksCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    const collectionName = getStocksCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const stocks = await findInCollection(
        database,
        collectionName,
        { itemIdentifier }
    )
    //
    return stocks
}

const getVariationFromStocksCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObj
) => {
    const collectionName = getStocksCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    const stocks = await findInCollection(
        database,
        collectionName,
        {
            itemIdentifier,
            ...variationObj
        }
    )
    //
    return (
        (stocks.length > 0) ? 
            stocks[0] : null
    )
}

const updateItemInStocksCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    stock
) => {
    const collectionName = getStocksCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await updateInCollection(
        database, 
        collectionName,
        { itemIdentifier },
        { stock }
    )
}

const updateVariationInStocksCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObj,
    stock
) => {
    const collectionName = getStocksCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await updateInCollection(
        database, 
        collectionName,
        { 
            itemIdentifier,
            ...variationObj
        },
        { stock }
    )
}

const deleteFromStocksCollection = async (
    database,
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier
) => {
    const collectionName = getStocksCollectionName(
        catalogueIdentifier, collectionIdentifier
    )
    //
    await deleteFromCollection(
        database,
        collectionName,
        { itemIdentifier }
    )
}

exports.insertIntoStocksCollection = insertIntoStocksCollection
exports.getItemFromStocksCollection = getItemFromStocksCollection
exports.getVariationFromStocksCollection = getVariationFromStocksCollection
exports.updateItemInStocksCollection = updateItemInStocksCollection
exports.updateVariationInStocksCollection = updateVariationInStocksCollection
exports.deleteFromStocksCollection = deleteFromStocksCollection