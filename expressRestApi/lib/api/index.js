const express = require("express")
const bodyParser = require('body-parser');
const { serveArchetypeApi } = require("./archetype");
const { serveCatalogueApi } = require("./catalogue");
const { serveCollectionApi } = require("./collection");
const { serveItemApi } = require("./item");


const genCataloggExpressRestApi = (cataloggApi) => {
    const router = express.Router()
    router.use(bodyParser.json())
    //Insert cataloggApi into router requests
    router.use((req, res, next) => {
        res.catalogg = cataloggApi
        next()
    })
    //
    serveArchetypeApi(router)
    serveCatalogueApi(router)
    serveCollectionApi(router)
    serveItemApi(router)
    serveStockApi(router)
    //
    return router
}

module.exports = genCataloggExpressRestApi