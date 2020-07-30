const fs = require("fs-extra")
const { tshirtArchetype } = require("./archetypes/tshirt")
const { lockCatalogue } = require("../lib/lock")
const { createCatologue } = require("../lib")
const { createLockedCatalogue, readLockedCatalogue } = require("../lib/catalogueOperator")
const { getCatalogueDiff } = require("../lib/diff")

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
    [ "myCollection", "newCollection" ]
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
const test = async () => {
    const currentLockedCatalogue = await readLockedCatalogue(catalogue)
    const newLockedCatalogue = lockCatalogue(catalogue)
    /*console.log(currentLockedCatalogue)
    console.log(newLockedCatalogue)*/
    
    console.log(
        getCatalogueDiff(
            currentLockedCatalogue, newLockedCatalogue
        )
    )
    
}

test()