
const { connect } = require("@x-logg/mongoops")
const { insertIntoCollection, findInCollection, deleteFromCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../../util/collections")

const createArchetype = async (
    options, catalogueId, lockedArchetype
) => {
    //
    const { connection, database } = await connect(options)
    //Attach catalogue ID to record.
    const record = {
        catalogueId,
        ...lockedArchetype
    }
    //
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.ARCHETYPE,
        [record]
    )
    //
    connection.close()
}

const readArchetypes = async (
    options, 
    catalogueId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const records = await findInCollection(
        database, 
        COLLECTION_NAMES.ARCHETYPE,
        { catalogueId }
    )
    //
    connection.close()
    //Remove catalogue id from records.
    const lockedArchetypes = records.map(record => {
        const { catalogueId, ...lockedArchetype } = record
        return lockedArchetype
    })
    //
    return lockedArchetypes
}

const readArchetype = async (
    options, 
    catalogueId, 
    archetypeId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = archetypeId
    //
    const records = await findInCollection(
        database, 
        COLLECTION_NAMES.ARCHETYPE,
        { catalogueId, identifier }
    )
    //
    connection.close()
    //
    if (records.length === 0) {
        return null
    }
    //
    const getLockedArchetype = () => {
        const { catalogueId, ...lockedArchetype } = records[0]
        return lockedArchetype
    }
    //
    return getLockedArchetype()
}

const deleteArchetype = async (
    options, 
    catalogueId, 
    archetypeId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = archetypeId
    //
    deleteFromCollection(
        database, 
        COLLECTION_NAMES.ARCHETYPE,
        { catalogueId, identifier }
    )
    //
    connection.close()
}

exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype