

const createItem = async (
    catalogueIdentifier, 
    collectionIdentifier, 
    item, 
    dataApi
) => {
    await dataApi.createItem(
        catalogueIdentifier, 
        collectionIdentifier, 
        item
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

const updateItemStocks = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    stocks,
    dataApi
) => {
    await dataApi.updateItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
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