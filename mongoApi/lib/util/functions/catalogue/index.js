const { 
    createMongoCollection, 
    getMongoCollections,
    deleteMongoCollection 
} = require("../../operations")
const {
    getArchetypesCollectionName,
    getCollectionsCollectionName
} = require("../../misc")

const getCatalogueNames = async (database) => {
    const collectionNames = await getMongoCollections(database)
    const catalogueNames = []
    for (const collectionName of collectionNames) {
        const isCataloggCollection = (
            collectionName.substr(0, 10) === "catalogg__"
        )
        if (isCataloggCollection) {
            const regex = /__(.+)__/ 
            const catalogueName = collectionName.match(regex)[1]
            if (
                catalogueName &&
                !catalogueNames.includes(catalogueName)
            ) {
                catalogueNames.push(catalogueName)
            }
        }
    }
    return catalogueNames
}

const createArchetypesCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    await createMongoCollection(database, collectionName)
}

const createCollectionsCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    await createMongoCollection(database, collectionName)
}

const deleteArchetypesCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    await deleteMongoCollection(database, collectionName)
}

const deleteCollectionsCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getCollectionsCollectionName(
        catalogueIdentifier
    )
    //
    await deleteMongoCollection(database, collectionName)
}

exports.getCatalogueNames = getCatalogueNames
exports.createArchetypesCollection = createArchetypesCollection
exports.createCollectionsCollection = createCollectionsCollection
exports.deleteArchetypesCollection = deleteArchetypesCollection
exports.deleteCollectionsCollection = deleteCollectionsCollection