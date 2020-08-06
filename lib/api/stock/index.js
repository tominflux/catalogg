


const readItemStocks = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    dataApi
) => {
    const stocks = await dataApi.readItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    return stocks
}

const readStock = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    variationObj,
    dataApi
) => {
    const stock = await dataApi.readStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj
    )
    return stock
}

const updateItemStocks = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    stock,
    dataApi
) => {
    await dataApi.updateItemStocks(
        catalogueIdentifier, 
        collectionIdentifier, 
        itemIdentifier, 
        stock,
    )
}

const updateStock = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    itemIdentifier, 
    variationObj,
    stock,
    dataApi
) => {
    await dataApi.updateStock(
        catalogueIdentifier, 
        collectionIdentifier, 
        itemIdentifier, 
        variationObj,
        stock
    )
}

exports.readItemStocks = readItemStocks
exports.readStock = readStock
exports.updateItemStocks = updateItemStocks
exports.updateStock = updateStock