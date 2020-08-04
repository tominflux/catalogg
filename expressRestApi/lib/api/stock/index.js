

const getStocks = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    const itemStocks = await req.catalogg.readItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        req.body.variationFilter
    )
    //
    res.json(itemStocks)
}

const getStock = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    const itemStock = await req.catalogg.readItemStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        req.body.variation
    )
    //
    res.json(itemStock)
}

const putStocks = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    await req.catalogg.updateItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        req.body.variations,
        req.body.stocks
    )
    //
    res.send()
}


const putStock = (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    await req.catalogg.update(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        req.body.variation,
        req.body.stock
    )
    //
    res.send()
}


/////////////
/////////////


const serveStockApi = (router) => {
    router.get(
        "/catalogue/:catId/collection/:colId/stocks:/itmId", 
        getStocks
    )
    router.get(
        "/catalogue/:catId/collection/:colId/stock/:itmId", 
        getStock
    )
    router.put(
        "/catalogue/:catId/collection/:colId/stocks/:itmId", 
        putStocks
    )
    router.put(
        "/catalogue/:catId/collection/:colId/stock/:itmId", 
        putStock
    )
}