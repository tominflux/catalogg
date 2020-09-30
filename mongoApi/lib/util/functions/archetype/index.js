const { getArchetypesCollectionName } = require("../../misc")
const { 
    insertIntoCollection, 
    findInCollection, 
    deleteFromCollection 
} = require("@x-logg/mongoops")


const insertIntoArchetypesCollection = async (
    database, catalogueIdentifier, lockedArchetype
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    /*
    const document = {
        identifier: lockedArchetype.identifier.data,
        properties: lockedArchetype.properties,
        variationFactors: lockedArchetype.variationFactors,
        derivedProperties: lockedArchetype.derivedProperties
    }
    */
    const document = lockedArchetype
    //
    await insertIntoCollection(
        database,
        collectionName,
        [ document ]
    )
}

const getAllFromArchetypesCollection = async (
    database, catalogueIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    const documents = await findInCollection(
        database,
        collectionName
    )
    //
    return documents
}

const findInArchetypesCollection = async (
    database, catalogueIdentifier, archetypeIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    const documents = await findInCollection(
        database,
        collectionName,
        { identifier: archetypeIdentifier }
    )
    //
    return (
        (documents.length > 0) ? 
            documents[0] : null
    )
}

const deleteFromArchetypesCollection = async (
    database, catalogueIdentifier, archetypeIdentifier
) => {
    const collectionName = getArchetypesCollectionName(
        catalogueIdentifier
    )
    //
    await deleteFromCollection(
        database,
        collectionName,
        { identifier: archetypeIdentifier }
    )
}


exports.insertIntoArchetypesCollection = insertIntoArchetypesCollection
exports.getAllFromArchetypesCollection = getAllFromArchetypesCollection
exports.findInArchetypesCollection = findInArchetypesCollection
exports.deleteFromArchetypesCollection = deleteFromArchetypesCollection