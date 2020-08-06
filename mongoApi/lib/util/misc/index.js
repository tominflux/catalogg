

const getArchetypesCollectionName = (
    catalogueIdentifier
) => (
    `catalogg__${catalogueIdentifier}__archetypes`
)

const getCollectionsCollectionName = (
    catalogueIdentifier
) => (
    `catalogg__${catalogueIdentifier}__collections`
)

const getItemsCollectionName = (
    catalogueIdentifier, collectionIdentifier
) => (
    `catalogg__${catalogueIdentifier}__${collectionIdentifier}__items`
)

const getStocksCollectionName = (
    catalogueIdentifier, collectionIdentifier
) => (
    `catalogg__${catalogueIdentifier}__${collectionIdentifier}__stocks`
)

exports.getArchetypesCollectionName = getArchetypesCollectionName
exports.getCollectionsCollectionName = getCollectionsCollectionName
exports.getItemsCollectionName = getItemsCollectionName
exports.getStocksCollectionName = getStocksCollectionName


const apiErr = (msg) => new Error(
    `Catalogg MongoDB API Error: ${msg}`
)

exports.apiErr = apiErr