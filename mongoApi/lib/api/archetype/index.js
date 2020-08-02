const { createArchetype: _createArchetype } = require("aarketype")
const { 
    insertIntoArchetypesCollection, 
    getAllFromArchetypesCollection, 
    findInArchetypesCollection, 
    deleteFromArchetypesCollection 
} = require("../../util/functions/archetype")


const createArchetype = async (
    options, catalogueIdentifier, archetype
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await insertIntoArchetypesCollection(
        database, catalogueIdentifier, archetype
    )
    //
    connection.close()
}

const readArchetypes = async (
    options, catalogueIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const dbArchetypes = getAllFromArchetypesCollection(
        database, catalogueIdentifier
    )
    //
    const archetypes = []
    //
    for (const dbArchetype of dbArchetypes) {
        const archetype = _createArchetype(
            dbArchetype.identifier,
            dbArchetype.properties,
            dbArchetype.variationFactors
        )
        archetypes.push(archetype)
    }
    //
    connection.close()
    //
    return archetypes
}

const readArchetype = async (
    options, catalogueIdentifier, archetypeIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const dbArchetype = findInArchetypesCollection(
        database, catalogueIdentifier, archetypeIdentifier
    )
    const archetype = createArchetype(
        dbArchetype.identifier,
        dbArchetype.properties,
        dbArchetype.variationFactors
    )
    //
    connection.close()
    //
    return archetype
}

const deleteArchetype = async (
    options, catalogueIdentifier, archetypeIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    deleteFromArchetypesCollection(
        database, catalogueIdentifier, archetypeIdentifier
    )
    //
    connection.close()
}

exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype