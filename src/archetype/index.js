const { createField, FIELD_TYPE, validateField } = require("ffield")
const { includes } = require("../misc")



const createArchetype = (
    identifier,
    properties, 
    variationFactors=null,
    validators=null,
    derivations=null
) => {
    const creationErr = (msg) => new Error(
        `Archetype creation error: ${msg}`
    )
    //Validate identifier.
    validateField(identifier)
    //Validate properties.
    //Make sure properties is an object.
    if (typeof properties !== "object") {
        throw creationErr("...")
    }
    //Make sure each property of properties
    //is a valid FIELD_TYPE.
    for (const key in properties) {
        const val = properties[key]
        if (typeof val !== "string") {
            throw new Error("...")
        }
        if (!includes(FIELD_TYPE, val)) {
            throw new Error("...")
        }
    }
    //If variation factors supplied...
    if (variationFactors !== null) {
        //Validate variation factors.
        //Make sure it is an object.
        if (typeof variationFactors !== "object") {
            throw creationErr("...")
        }
        //Make sure each property of variation factors
        //is a valid FIELD_TYPE.
        for (const key in variationFactors) {
            const val = variationFactors[key]
            if (typeof val !== "string") {
                throw creationErr("...")
            }
            if (!includes(FIELD_TYPE, val)) {
                throw creationErr("...")
            }
        }
    }
    //If validators supplied...
    if (validators !== null) {
        //Make sure it is an array.
        if (!Array.isArray(validators)) {
            throw creationErr("...")
        }
        //Make sure they're all functions.
        for (const validator of validators) {
            if (typeof validator !== "function") {
                throw creationErr("...")
            }
        }
    }
    //If derivations supplied...
    if (derivations !== null) {
        //Make sure it is a function.
        if (typeof derivations !== "function") {
            throw creationErr("...")
        }
    }
    //Build and return archetype object.
    return {
        identifier,
        properties,
        variationFactors,
        validators,
        derivations
    }
}


//

const tshirtArchetype = createArchetype(
    //Idefintier 
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

console.log(tshirtArchetype)

/*

//

const createItem = (
    archetype, 
    properties, 
    variations
) => {

}

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