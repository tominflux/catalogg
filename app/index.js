require('dotenv').config()
const fs = require("fs-extra")
const { tshirtArchetype } = require("./archetypes/tshirt")
const { lockCatalogue } = require("../lib/lock")
const { createCatologue } = require("../lib")
const { createLockedCatalogue, readLockedCatalogue, updateLockedCatalogue, deleteLockedCatalogue } = require("../lib/catalogueOperator")
const { getCatalogueDiff } = require("../lib/diff")
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



/*
createLockedCatalogue(
    catalogue, 
    {
        createCatalogue: () => {},
        resolveCatalogueDiff: () => {},
        deleteCatalogue: () => {}
    }
)
*/

const dataOperator = createMongoOperator(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)


const test = async () => {
    updateLockedCatalogue(catalogue, dataOperator)
}

test()