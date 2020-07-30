const { tshirtArchetype } = require("./archetypes/tshirt")
const { createItem, validateItem } = require("aarketype")
const { createCollection } = require("../lib/collection")
const { mapifyArchetypes } = require("../lib/misc")
const { lockifyCollection } = require("../lib/collectionOperator")
const { lockCatalogue } = require("../lib/lock")

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


const lockedCatalogue = lockCatalogue()

