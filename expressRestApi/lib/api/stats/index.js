


const readStatsCatalogue = async (req, res, next) => {
    const catalogueStats = (
        await req.catalogg.readStatsCatalogue()
    )
    res.json(catalogueStats)
}

const readStatsCollection = async (req, res, next) => {
    const collectionStats = (
        await req.catalogg.readStatsCollection()
    )
    res.json(collectionStats)
}

const readStatsItem = async (req, res, next) => {
    const itemStats = (
        await req.catalogg.readStatsItem()
    )
    res.json(itemStats)
}


////////////
////////////


const serveStatsApi = (router) => {
    router.get("/catalogg/stats/catalogue", readStatsCatalogue)
    router.get("/catalogg/stats/collection", readStatsCollection)
    router.get("/catalogg/stats/item", readStatsItem)
}

exports.serveStatsApi = serveStatsApi