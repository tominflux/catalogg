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
        lockedItem
    )
    //
    await dataApi.createStocksForItem(
        catalogueIdentifier, 
        collectionIdentifier, 
        lockedItem.identifier,
        variationObjs
    )
}

const readItems = async (
    catalogueIdentifier,
    collectionIdentifier,
    propertyFilter,
    dataApi
) => {
    const items = await dataApi.readItems(
        catalogueIdentifier, 
        collectionIdentifier, 
        propertyFilter
    )
    //
    return items
}

const readItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    dataApi
) => {
    const item = await dataApi.readItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    return item
}

const updateItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    newProperties,
    dataApi
) => {
    await dataApi.updateItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        newProperties
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
        itemIdentifier
    )
}


exports.createItem = createItem
exports.readItems = readItems
exports.readItem = readItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem
