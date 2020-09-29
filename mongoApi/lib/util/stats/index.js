const { apiErr } = require("../misc")
const { countInCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../collections")


/////////////
/////////////


const getCollectionName = (entityType) => {
    switch (entityType) {
        case ENTITY_TYPE.CATALOGUE:
            return COLLECTION_NAMES.CATALOGUE
        case ENTITY_TYPE.COLLECTION:
            return COLLECTION_NAMES.COLLECTION
        case ENTITY_TYPE.ITEM:
            return COLLECTION_NAMES.ITEM
        default:
            throw apiErr(
                `Unknown entity type "${entityType}".`
            )
    }
}

const getEntityCount = async (database, entityType) => {
    const collectionName = getCollectionName(entityType)
    const count = await countInCollection(database, collectionName, {})
    return count
}


/////////////
/////////////


const getCatalogueStats = async (database) => {
    const count = await getEntityCount(database, ENTITY_TYPE.CATALOGUE)
    return {
        count
    }
}

const getCollectionStats = async (database) => {
    const count = await getEntityCount(database, ENTITY_TYPE.COLLECTION)
    return {
        count
    }
}

const getItemStats = async (database) => {
    const count = await getEntityCount(database, ENTITY_TYPE.ITEM)
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