
const { mongoConnect } = require("../../util/connect")
const { 
    getCatalogueNames,
    createArchetypesCollection, 
    createCollectionsCollection, 
    deleteArchetypesCollection,
    deleteCollectionsCollection
} = require("../../util/functions/catalogue")
const { readCollections } = require("../collection")
const { deleteItemsCollection, deleteStocksCollection } = require("../../util/functions/collection")


const createCatalogue = async (
    options, identifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await createArchetypesCollection(database, identifier)
    await createCollectionsCollection(database, identifier)
    //
    connection.close()
}

const readCatalogueNames = async (
    options
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const catalogueNames = await getCatalogueNames(database)
    //
    connection.close()
    //
    return catalogueNames
}

const deleteCatalogue = async (
    options, identifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const collections = await readCollections(options, identifier)
    for (const collection of collections) {
        await deleteItemsCollection(
            database, identifier, collection.identifier
        )
        await deleteStocksCollection(
            database, identifier, collection.identifier
        )
    }
    //
    await deleteArchetypesCollection(database, identifier)
    await deleteCollectionsCollection(database, identifier)
    //
    connection.close()
}


exports.createCatalogue = createCatalogue
exports.readCatalogueNames = readCatalogueNames
exports.deleteCatalogue = deleteCatalogue