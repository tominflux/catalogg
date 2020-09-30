

const getStocks = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.params.itmId
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
    const itemIdentifier = req.params.itmId
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
    const itemIdentifier = req.params.itmId
    const stock = req.body.stock
    //
    await req.catalogg.updateItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        stock
    )
    //
    res.send()
}


const putStock = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const collectionIdentifier = req.params.colId
    const itemIdentifier = req.params.itmId
    //
    const variationObj = req.query
    const stock = req.body.stock
    //
    await req.catalogg.updateStock(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier,
        variationObj,
        stock
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