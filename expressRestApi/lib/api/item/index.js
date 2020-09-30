

/////////////////
/////////////////


const postItem = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const archetypeIdentifier = req.body.archetypeId
    const itemIdentifier = req.params.itmId
    const properties = req.body.properties
    const variationFactors = req.body.variationFactors
    //
    await req.catalogg.createItem(
        catalogueIdentifier,
        collectionIdentifier,
        archetypeIdentifier,
        itemIdentifier,
        properties,
        variationFactors
    )
    //
    res.send()
}

const getItems = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const archetypeId = req.body.archetypeId ? 
        req.body.archetypeId : null
    const propertyFilter = req.body.properties ? 
        req.body.properties : {}
    //
    const items = await req.catalogg.readItems(
        catalogueIdentifier,
        collectionIdentifier,
        archetypeId,
        propertyFilter
    )
    //
    res.json(items)
}

const getItem = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.params.itmId
    //
    const item = await req.catalogg.readItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    res.json(item)
}   

const putItem = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.params.itmId
    //
    const newProperties = req.body.properties
    const newVariationFactors = req.body.variationFactors
    //
    req.catalogg.updateItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        newProperties,
        newVariationFactors
    )
    //
    res.send()
}

const deleteItem = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.params.itmId
    //
    await req.catalogg.deleteItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    res.send()
}


/////////////////
/////////////////


const serveItemApi = (router) => {
    router.post(
        "/catalogue/:catId/collection/:colId/item/:itmId", 
        postItem
    )
    router.get(
        "/catalogue/:catId/collection/:colId/items", 
        getItems
    )
    router.get(
        "/catalogue/:catId/collection/:colId/item/:itmId", 
        getItem
    )
    router.put(
        "/catalogue/:catId/collection/:colId/item/:itmId",
        putItem
    )
    router.delete(
        "/catalogue/:catId/collection/:colId/item/:itmId", 
        deleteItem
    )
}

exports.serveItemApi = serveItemApi