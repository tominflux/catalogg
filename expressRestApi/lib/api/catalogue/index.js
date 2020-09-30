
const postCatalogue = async (req, res) => {
    const catalogueIdentifier = req.params.catId
    //
    await req.catalogg.createCatalogue(catalogueIdentifier)
    //
    res.send()
}

const getCatalogues = async (req, res) => {
    const catalogues = await req.catalogg.readCatalogues()
    //
    res.json(catalogues)
}

const putCatalogue = async (req, res) => {
    const catalogueIdentifier = req.params.catId
    const newIdentifier = req.body.identifier
    //
    await req.catalogg.renameCatalogue(
        catalogueIdentifier, newIdentifier
    )
    //
    res.send()
}

const deleteCatalogue = async (req, res) => {
    const catalogueIdentifier = req.params.catId
    //
    await req.catalogg.deleteCatalogue(catalogueIdentifier)
    //
    res.send()
}

const serveCatalogueApi = (router) => {
    router.post("/catalogue/:catId", postCatalogue)
    router.get("/catalogues", getCatalogues)
    router.put("/catalogue/:catId", putCatalogue)
    router.delete("/catalogue/:catId", deleteCatalogue)
}

exports.serveCatalogueApi = serveCatalogueApi