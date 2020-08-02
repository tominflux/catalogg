require('dotenv').config()
const genCataloggMongoApi = require("./mongoApi/lib/api")
const genCataloggApi = require("./lib/api")
const { tshirtArchetype } = require("./archetypes/tshirt")
const { createItem, validateItem } = require('aarketype')

const cataloggMongoApi = genCataloggMongoApi(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)
const cataloggApi = genCataloggApi(cataloggMongoApi)



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



const run = async () => {
    await cataloggApi.createItem(
        "myCatalogue",
        "myCollection",
        peaceTshirt
    )
}
run()
/*
cataloggApi.createArchetype(
    tshirtArchetype
)
*/