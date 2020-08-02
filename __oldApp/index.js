require('dotenv').config()
const fs = require("fs-extra")
const { tshirtArchetype } = require("./archetypes/tshirt")
const { createCatologue } = require("../lib")
const { syncLockedCatalogue } = require("../lib/catalogueOperator")
const { createInCollection} = require("../lib/itemOperator")
const { createMongoOperator } = require('./mongoOperator')
const { createItem, validateItem } = require('aarketype')
const { traverseThroughStocks, getVariationObjs } = require('../lib/itemOperator')


const peaceTshirt = createItem(
    tshirtArchetype,
    "peace-tshirt",
    {
        name: "Peace T-Shirt",
        priceGBP: 30.00,
        description: "Peace logo, etc, blah, blah.",
        ukPostGBP: 3.00,
        wrldPostGBP: 8.00,
    },
    {
        size: ["sm", "md", "lg", "xl"],
        colourway: ["black", "white"]
    }
)

validateItem(peaceTshirt, tshirtArchetype)

//console.log(peaceTshirt.variationFactors.size)


const catalogue = createCatologue(
    "myCatalogue",
    [ tshirtArchetype ],
    [ "myCollection" ]
)


const dataOperator = createMongoOperator(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)


const run = async () => {
    await syncLockedCatalogue(catalogue, dataOperator)/*
    await createInCollection(
        "myCatalogue", "myCollection", dataOperator, peaceTshirt
    ).catch( 
        (err) => console.error(err.message)
    )*/
}

run().catch(
    (reason) => console.error(reason)
)


exports.catalogue = catalogue
exports.dataOperator = dataOperator