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

const readItems = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    variationFilter,
    dataApi
) => {
    const items = await dataApi.readItems(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationFilter
    )
    return items
}

const readItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variation,
    dataApi
) => {
    const items = await dataApi.readItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variation,
        dataApi
    )
    return items
}

const updateItemStock = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObj,
    stock,
    dataApi
) => {
    await dataApi.updateItemStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj,
        stock
    )
}

const updateItemStocks = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    variationObjs,
    stocks,
    dataApi
) => {
    await dataApi.updateItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObjs,
        stocks
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