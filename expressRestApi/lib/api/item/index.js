const { createItem } = require("aarketype")


/////////////////
/////////////////


const postItem = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const archetypeIdentifier = req.body.archetypeId
    const itemIdentifier = req.body.idenitifer
    //
    const archetype = await req.catalogg.readArchetype(
        catalogueIdentifier, archetypeIdentifier
    )
    //
    const item = createItem(
        archetype,
        itemIdentifier,
        req.body.properties,
        req.body.variationFactors
    )
    //
    await req.catalogg.createItem(
        catalogueIdentifier,
        collectionIdentifier,
        item
    )
    //
    res.send()
}

const getItems = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    //
    const items = await req.catalogg.readItems(
        catalogueIdentifier,
        collectionIdentifier,
        req.body.propertyFilter
    )
    //
    res.json(items)
}

const getItem = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    const item = await req.catalogg.readItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    res.json(item)
}   

const deleteItem = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    await req.catalogg.deleteItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    res.sent()
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
    router.delete(
        "/catalogue/:catId/collection/:colId/item/:itmId", 
        deleteItem
    )
}

exports.serveItemApi = serveItemApi