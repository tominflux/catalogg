const { 
    connect, 
    findInCollection, 
    insertIntoCollection, 
    updateInCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../../util/collections")


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
        COLLECTION_NAMES.BASKET,
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
    const lockedBaskets = await findInCollection(
        database,
        COLLECTION_NAMES.BASKET,
        { identifier }
    )
    //
    connection.close()
    //
    const lockedBasket = (
        lockedBaskets.length > 0
    ) ? lockedBaskets[0] : null
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
        COLLECTION_NAMES.BASKET,
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
        COLLECTION_NAMES.BASKET,
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