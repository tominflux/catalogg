require('dotenv').config()
const fs = require("fs-extra")
const { tshirtArchetype } = require("./archetypes/tshirt")
const { createCatologue } = require("../lib")
const { syncLockedCatalogue } = require("../lib/catalogueOperator")
const { createMongoOperator } = require('./mongoOperator')

/*
const peaceTshirt = createItem(
    tshirtArchetype,
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

console.log(peaceTshirt)
*/

const catalogue = createCatologue(
    "myCatalogue",
    [ tshirtArchetype ],
    [ "myCollection" ]
)

const dataOperator = createMongoOperator(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)

exports.catalogue = catalogue
exports.dataOperator = dataOperator