

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
    `catalogg__${catalogueIdentifier}__${collectionIdentifier}`
)

exports.getArchetypesCollectionName = getArchetypesCollectionName
exports.getCollectionsCollectionName = getCollectionsCollectionName
exports.getItemsCollectionName = getItemsCollectionName


const apiErr = (msg) => new Error(
    `Catalogg MongoDB API Error: ${msg}`
)

exports.apiErr = apiErr