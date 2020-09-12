const { getCatalogueNames } = require("../functions/catalogue")
const { getCollectionsCollectionName, getItemsCollectionName } = require("../misc")
const { countInCollection, findInCollection } = require("@x-logg/mongoops")


const getCatalogueCount = async (database) => {
    const names = await getCatalogueNames(database)
    const count = names.length
    return count
}

const getCollectionCount = async (database) => {
    const catalogueIdentifiers = await getCatalogueNames(database)
    let count = 0
    for (const name of catalogueIdentifiers) {
        const catalogueIdentifier = name
        const collectionsCollectionName = getCollectionsCollectionName(
            catalogueIdentifier
        )
        //
        const collectionCount = await countInCollection(
            database,
            collectionsCollectionName
        )
        count += collectionCount
    }
    //
    return count
}

const getItemCount = async (database) => {
    const catalogueIdentifiers = await getCatalogueNames(database)
    let count = 0
    for (const name of catalogueIdentifiers) {
        const catalogueIdentifier = name
        const collectionsCollection = getCollectionsCollectionName(
            catalogueIdentifier
        )
        //
        const collectionIdentifiers = await findInCollection(
            database,
            collectionsCollection
        )
        //
        for (const collectionIdentifier of collectionIdentifiers) {
            const itemCollection = getItemsCollectionName(
                catalogueIdentifier, collectionIdentifier
            )
            const itemCount = await countInCollection(
                database, itemCollection
            )
            count += itemCount
        }
    }
    //
    return count
}


/////////////
/////////////


const getCatalogueStats = async (database) => {
    const count = await getCatalogueCount(database)
    return {
        count
    }
}

const getCollectionStats = async (database) => {
    const count = await getCollectionCount(database)
    return {
        count
    }
}

const getItemStats = async (database) => {
    const count = getItemCount(database)
    return {
        count
    }
}


////////////
////////////


const ENTITY_TYPE = {
    CATALOGUE: "CATALOGUE",
    COLLECTION: "COLLECTION",
    ITEM: "ITEM"
}

const getEntityStats = async (database, entityType) => {
    switch (entityType) {
        case ENTITY_TYPE.CATALOGUE:
            return await getCatalogueStats(database)
        case ENTITY_TYPE.COLLECTION:
            return await getCollectionStats(database)
        case ENTITY_TYPE.ITEM:
            return await getItemStats(database)
        default:
            throw new Error(
                `Unknown entity type "${entityType}".`
            )
    }
}


exports.ENTITY_TYPE = ENTITY_TYPE
exports.getEntityStats = getEntityStats