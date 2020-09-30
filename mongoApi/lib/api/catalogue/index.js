
const { connect } = require("@x-logg/mongoops")
const { insertIntoCollection, findInCollection, deleteFromCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../../util/collections")


const createCatalogue = async (
    options, identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const record = { identifier }
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.CATALOGUE,
        [record]
    )
    //
    connection.close()
}

const readCatalogues = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //
    const catalogues = await findInCollection(
        database,
        COLLECTION_NAMES.CATALOGUE,
        {}
    )
    //
    connection.close()
    //
    return catalogues
}

const deleteCatalogue = async (
    options, identifier
) => {
    //
    const { connection, database } = await connect(options)
    //Remove catalogue record from catalogg collection.
    await deleteFromCollection(
        database,
        COLLECTION_NAMES.CATALOGUE,
        { identifier }
    )
    //
    connection.close()
}


exports.createCatalogue = createCatalogue
exports.readCatalogues = readCatalogues
exports.deleteCatalogue = deleteCatalogue