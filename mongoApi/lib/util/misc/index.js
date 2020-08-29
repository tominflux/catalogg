

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

const getBasketsCollectionName = () => (
    `catalogg__baskets`
)

exports.getArchetypesCollectionName = getArchetypesCollectionName
exports.getCollectionsCollectionName = getCollectionsCollectionName
exports.getItemsCollectionName = getItemsCollectionName
exports.getStocksCollectionName = getStocksCollectionName
exports.getBasketsCollectionName = getBasketsCollectionName


const apiErr = (msg) => new Error(
    `Catalogg MongoDB API Error: ${msg}`
)

exports.apiErr = apiErr