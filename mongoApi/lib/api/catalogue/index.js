
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
const { insertIntoCollection, deleteFromCollection } = require("@x-logg/mongoops")
const { getCataloggCollectionName } = require("../../util/misc")


const createCatalogue = async (
    options, identifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const record = { identifier }
    await insertIntoCollection(
        database,
        getCataloggCollectionName(),
        [record]
    )
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
    //Remove catalogue record from catalogg collection.
    const record = { identifier }
    await deleteFromCollection(
        database,
        getCataloggCollectionName(),
        record
    )
    //
    connection.close()
}


exports.createCatalogue = createCatalogue
exports.readCatalogueNames = readCatalogueNames
exports.deleteCatalogue = deleteCatalogue