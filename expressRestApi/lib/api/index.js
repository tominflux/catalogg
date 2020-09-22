const express = require("express")
const bodyParser = require('body-parser');
const { serveArchetypeApi } = require("./archetype");
const { serveBasketApi } = require("./basket");
const { serveCatalogueApi } = require("./catalogue");
const { serveCollectionApi } = require("./collection");
const { serveItemApi } = require("./item");
const { serveStatsApi } = require("./stats")
const { serveStockApi } = require("./stock");


////////////////
////////////////


const postInitialise = async (req, res, next) => {
    //
    await req.catalogg.initialiseCatalogg()
    //
    res.send()
}

const serveInitialiseApi = (router) => {
    router.post("/catalogg", postInitialise)
}


////////////////
////////////////


const genCataloggExpressRestApi = (cataloggApi) => {
    const router = express.Router()
    router.use(bodyParser.json())
    //Insert catalogg API into router requests
    router.use((req, res, next) => {
        req.catalogg = cataloggApi
        next()
    })
    //
    serveInitialiseApi(router)
    serveArchetypeApi(router)
    serveBasketApi(router)
    serveCatalogueApi(router)
    serveCollectionApi(router)
    serveItemApi(router)
    serveStatsApi(router)
    serveStockApi(router)
    //
    return router
}


////////////////
////////////////


module.exports = genCataloggExpressRestApi