const { createArchetype } = require("./src/archetype")
const { FIELD_TYPE, createField } = require("ffield")


const tshirtArchetype = createArchetype(
    //Identifier 
    createField(FIELD_TYPE.STRING, "tshirt"),
    //Properties
    {
        name: FIELD_TYPE.STRING,
        priceGBP: FIELD_TYPE.NUMBER,
        description: FIELD_TYPE.STRING,
        ukPostGBP: FIELD_TYPE.NUMBER,
        wrldPostGBP: FIELD_TYPE.NUMBER
    },
    //Variation Factors (Optional)
    {
        size: FIELD_TYPE.STRING,
        colourway: FIELD_TYPE.STRING
    },
    //Validators (optional)
    [
        //E.g. Item cannot be more than £100.00
        (item) => item.priceGBP < 100.00
    ],
    //Derivations (optional)
    (item) => ({
        ukTotalCostGBP: item.priceGBP + ukPostGBP,
        wrldTotalCostGBP: item.priceGBP + wrldPostGBP
    })
)


//


console.log(tshirtArchetype)
/*

//


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
        size: ["sm", "md", "lg"],
        colourway: ["black", "white"]
    }
)

*/