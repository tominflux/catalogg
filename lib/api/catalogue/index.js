

const createCatalogue = async (identifier, dataApi) => {
    //
    await dataApi.createCatalogue(identifier)
}

const readCatalogues = async (dataApi) => {
    //
    const catalogues = await dataApi.readCatalogues()
    //
    return catalogues
}

const renameCatalogue = async (identifier, newIdentifier, dataApi) => {
    //TODO: Rename catalogues for all dependent resources.
    //
    await dataApi.renameCatalogue(identifier, newIdentifier, dataApi)
}

const deleteCatalogue = async (identifier, dataApi) => {
    //TODO: Delete collections, archetypes, items and stocks
    //under catalogue.
    //
    await dataApi.deleteCatalogue(identifier)
}

exports.createCatalogue = createCatalogue
exports.readCatalogues = readCatalogues
exports.renameCatalogue = renameCatalogue
exports.deleteCatalogue = deleteCatalogue