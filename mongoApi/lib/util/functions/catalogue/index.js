const { 
    createMongoCollection, 
    getMongoCollections,
    deleteMongoCollection 
} = require("../../operations")
const { deleteMongoCollection } = require("../../../../util/operations")

const getCatalogueNames = async (database) => {
    const collectionNames = await getMongoCollections(database)
    const catalogueNames = []
    for (const collectionName of collectionNames) {
        const isCataloggCollection = (
            collectionName.substr(0, 10) === "catalogg__"
        )
        if (isCataloggCollection) {
            const regex = /__(.+)__/ 
            const catalogueName = regex.match(collectionName)[1]
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

const getArchetypesCollectionName = (
    catalogueIdentifier
) => (
    `catalogg__${catalogueIdentifier}__archetypes`
)

const getCollectionsCollectionName = (
    catalogueIdentifier
)  => (
    `catalogg__${catalogueIdentifier}__collections`
)

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
exports.getArchetypesCollectionName = getArchetypesCollectionName
exports.getCollectionsCollectionName = getCollectionsCollectionName
exports.createArchetypesCollection = createArchetypesCollection
exports.createCollectionsCollection = createCollectionsCollection