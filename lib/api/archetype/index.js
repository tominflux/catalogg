const { unlockArchetype } = require("../../lock/archetype")


const createArchetype = async (catalogueIdentifier, archetype, dataApi) => {
    await dataApi.createArchetype(catalogueIdentifier, archetype)
}

const readArchetypes = async (
    catalogueIdentifier, 
    derivers,   //Map
    validatorGroups,    //Map
    dataApi
) => {
    const lockedArchetypes = await dataApi.readArchetypes(catalogueIdentifier)
    const archetypes = lockedArchetypes.map(
        lockedArchetype => unlockArchetype(
            lockedArchetype,
            derivers.get(lockedArchetype.identifier),
            validatorGroups.get(lockedArchetype.identifier)
        )
    )
    return archetypes
}

const readArchetype = async (
    catalogueIdentifier, 
    archetypeIdentifier, 
    deriver,
    validators,
    dataApi
) => {
    const lockedArchetype = await dataApi.readArchetype(catalogueIdentifier, archetypeIdentifier)
    const archetype = unlockArchetype(
        lockedArchetype,
        deriver,
        validators
    )
    return archetype
}

const deleteArchetype = async (catalogueIdentifier, archetypeIdentifier, dataApi) => {
    await dataApi.deleteArchetype(catalogueIdentifier, archetypeIdentifier)
}


exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype