


const createCatalogue = (identifier, dataApi) => {
    //
    await dataApi.createCatalogue(identifier)
}

const readCatalogues = (dataApi) => {
    //
    await dataApi.readCatalogues()
}

const renameCatalogue = (identifier, newIdentifier, dataApi) => {
    //
    await dataApi.renameCatalogue
}

const deleteCatalogue = (identifier, dataApi) => {
    //
    await dataApi.deleteCatalogue(identifier)
}