const { findInCollection, insertIntoCollection, updateInCollection } = require("../../util/operations")
const { getBasketsCollectionName } = require("../../util/misc")


////////////////
////////////////


const createBasket = async (
    options, 
    lockedBasket
) => {
    //
    const { connection, database } = await mongoConnect(options)
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
    const { connection, database } = await mongoConnect(options)
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
    const { connection, database } = await mongoConnect(options)
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
    const { connection, database } = await mongoConnect(options)
    //
    await 
    //
    connection.close()
}


////////////////
////////////////


exports.createBasket = createBasket
exports.readBasket = readBasket
exports.updateBasket = updateBasket
exports.deleteBasket = deleteBasket