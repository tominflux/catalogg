const { genVariationObjs } = require("../../util/genVariationObjs")
const { lockItem } = require("../../util/lock/item")


const createItem = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    item, 
    dataApi
) => {
    //Generate variation objs
    const variationObjs = genVariationObjs(item)
    //Lock item
    const lockedItem = lockItem(item)
    //
    await dataApi.createItem(
        catalogueIdentifier, 
        collectionIdentifier, 
        lockedItem,
        variationObjs
    )
}

const readItemStocks = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    variationFilter,
    dataApi
) => {
    const items = await dataApi.readItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationFilter
    )
    return items
}

const readItemStock = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variation,
    dataApi
) => {
    const items = await dataApi.readItemStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variation,
        dataApi
    )
    return items
}

const updateItemStocks = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variations,
    stocks,
    dataApi
) => {
    await dataApi.updateItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variations,
        stocks
    )
}

const updateItemStock = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variation,
    stock,
    dataApi
) => {
    await dataApi.updateItemStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variation,
        stock
    )
}

const deleteItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    dataApi
) => {
    await dataApi.deleteItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        dataApi
    )
}

exports.createItem = createItem
exports.readItems = readItems
exports.readItem = readItem
exports.updateItemStock = updateItemStock
exports.updateItemStocks = updateItemStocks
exports.deleteItem = deleteItem