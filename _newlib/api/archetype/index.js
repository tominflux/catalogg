

const createArchetype = async (catalogueIdentifier, archetype, dataApi) => {
    await dataApi.createArchetype(catalogueIdentifier, archetype)
}

const readArchetypes = async (catalogueIdentifier, dataApi) => {
    const archetypes = await dataApi.readArchetypes(catalogueIdentifier)
    return archetypes
}

const readArchetype = async (catalogueIdentifier, archetypeIdentifier, dataApi) => {
    const archetype = await dataApi.readArchetype(catalogueIdentifier, archetypeIdentifier)
    return archetype
}

const deleteArchetype = async (catalogueIdentifier, archetypeIdentifier, dataApi) => {
    await dataApi.deleteArchetype(catalogueIdentifier, archetypeIdentifier)
}


exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype