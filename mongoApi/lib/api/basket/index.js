const { 
    connect, 
    findInCollection, 
    insertIntoCollection, 
    updateInCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const { getBasketsCollectionName } = require("../../util/misc")


////////////////
////////////////


const createBasket = async (
    options, 
    lockedBasket
) => {
    //
    const { connection, database } = await connect(options)
    //
    await insertIntoCollection(
        database,
        getBasketsCollectionName(),
        [ lockedBasket ]
    )
    //
    connection.close()
}

const readBasket = async (
    options, 
    userId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = userId
    //
    const lockedBasket = await findInCollection(
        database,
        getBasketsCollectionName(),
        { identifier }
    )
    //
    connection.close()
    //
    return lockedBasket
}

const updateBasket = async (
    options,
    lockedBasket
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = lockedBasket.identifier
    //
    const properties = lockedBasket.properties
    //
    await updateInCollection(
        database,
        getBasketsCollectionName(),
        { identifier },
        { properties }
    )
    //
    connection.close()
}

const deleteBasket = async (
    options,
    userId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = userId
    //
    await deleteFromCollection(
        database,
        getBasketsCollectionName(),
        { identifier }
    )
    //
    connection.close()
}


////////////////
////////////////


exports.createBasket = createBasket
exports.readBasket = readBasket
exports.updateBasket = updateBasket
exports.deleteBasket = deleteBasket