
const postCollection = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    //
    await req.catalogg.createCollection(
        catalogueIdentifier, collectionIdentifier
    )
    //
    res.send()
}

const getCollections = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    //
    const collections = await req.catalogg.readCollections(
        catalogueIdentifier
    )
    //
    res.json(collections)
}

const deleteCollection = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    //
    await req.catalogg.deleteCollection(
        catalogueIdentifier, collectionIdentifier
    )
    //
    res.send()

}

const serveCollectionApi = (router) => {
    router.post("/catalogue/:catId/collection/:colId", postCollection)
    router.get("/catalogue/:catId/collections", getCollections)
    router.delete("/catalogue/:catId/collection/:colId", deleteCollection)
}

exports.serveCollectionApi = serveCollectionApi