

const createCatalogue = async (identifier, dataApi) => {
    //
    await dataApi.createCatalogue(identifier)
}

const readCatalogueNames = async (dataApi) => {
    //
    const catalogueNames = await dataApi.readCatalogueNames()
    //
    return catalogueNames
}

const renameCatalogue = async (identifier, newIdentifier, dataApi) => {
    //
    await dataApi.renameCatalogue(identifier, newIdentifier, dataApi)
}

const deleteCatalogue = async (identifier, dataApi) => {
    //
    await dataApi.deleteCatalogue(identifier)
}

exports.createCatalogue = createCatalogue
exports.readCatalogueNames = readCatalogueNames
exports.renameCatalogue = renameCatalogue
exports.deleteCatalogue = deleteCatalogue