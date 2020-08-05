

const getStocks = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    const itemStocks = await req.catalogg.readItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    res.json(itemStocks)
}

const getStock = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    const variationObj = req.query
    //
    const itemStock = await req.catalogg.readStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj
    )
    //
    res.json(itemStock)
}

const putStocks = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    await req.catalogg.updateItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        req.body.stock
    )
    //
    res.send()
}


const putStock = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.param.itmId
    //
    const variationObj = req.query
    //
    await req.catalogg.update(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj,
        req.body.stock
    )
    //
    res.send()
}

/////////////
/////////////


const serveStockApi = (router) => {
    router.get(
        "/catalogue/:catId/collection/:colId/stocks/:itmId", 
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

exports.serveStockApi = serveStockApi