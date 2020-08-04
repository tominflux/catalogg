const { unlockArchetype } = require("../../util/lock/archetype")


const createArchetype = async (catalogueIdentifier, archetype, dataApi) => {
    await dataApi.createArchetype(catalogueIdentifier, archetype)
}

const readArchetypes = async (
    catalogueIdentifier, 
    dataApi
) => {
    const lockedArchetypes = await dataApi.readArchetypes(catalogueIdentifier)
    const archetypes = lockedArchetypes.map(
        lockedArchetype => unlockArchetype(
            lockedArchetype,
            /*derivers.get(lockedArchetype.identifier),
            validatorGroups.get(lockedArchetype.identifier)*/
        )
    )
    return archetypes
}

const readArchetype = async (
    catalogueIdentifier, 
    archetypeIdentifier, 
    dataApi
) => {
    const lockedArchetype = await dataApi.readArchetype(catalogueIdentifier, archetypeIdentifier)
    const archetype = unlockArchetype(
        lockedArchetype
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