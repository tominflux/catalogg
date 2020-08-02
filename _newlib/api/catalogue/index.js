


const createCatalogue = (identifier, dataApi) => {
    //
    await dataApi.createCatalogue(identifier)
}

const readCatalogueNames = (dataApi) => {
    //
    await dataApi.readCatalogueNames()
}

const renameCatalogue = (identifier, newIdentifier, dataApi) => {
    //
    await dataApi.renameCatalogue(identifier, newIdentifier, dataApi)
}

const deleteCatalogue = (identifier, dataApi) => {
    //
    await dataApi.deleteCatalogue(identifier)
}