const { createArchetype } = require("./src/archetype")
const { createItem } = require("./src/item")
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
    //Derived Properties (optional)
    {
        ukTotalCostGBP: FIELD_TYPE.NUMBER,
        wrldTotalCostGBP: FIELD_TYPE.NUMBER
    },
    //Deriver (optional, compulsory if deriverProperties not null)
    (item) => ({
        ukTotalCostGBP: (
            item.properties.priceGBP.data + 
            item.properties.ukPostGBP.data
        ),
        wrldTotalCostGBP: (
            item.properties.priceGBP.data + 
            item.properties.wrldPostGBP.data
        )
    }),
    //Validators (optional)
    [
        //E.g. Item cannot be more than £100.00
        (item) => item.properties.priceGBP.data < 100.00
    ],
)


//


//console.log(tshirtArchetype)

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

console.log("\n\n")
console.log(peaceTshirt)