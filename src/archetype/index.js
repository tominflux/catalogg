const { FIELD_TYPE, validateField } = require("ffield")
const { includes } = require("../misc")




const validateArchetype = (archetype, validator=null) => {
    const validationErr = (msg) => new Error(
        `Archetype validation error: ${msg}`
    )
    const {
        identifier,
        properties,
        variationFactors,
        validators,
        derivations
    } = archetype
    //Validate identifier field.
    try {
        validateField(identifier)
    } catch (err) {
        throw validationErr(err.message)
    }
    //Make sure properties is an object.
    if (typeof properties !== "object") {
        throw validationErr(
            `typeof properties is "${typeof properties}", ` +
            `expected "object".`
        )
    }
    //Make sure each property of properties
    //is a valid FIELD_TYPE.
    for (const key in properties) {
        const val = properties[key]
        if (typeof val !== "string") {
            throw validationErr(
                `typeof properties.${key} is "${typeof val}", ` +
                `expected "string".`
            )
        }
        if (!includes(FIELD_TYPE, val)) {
            throw validationErr(
                `properties.${key} [="${val}"] is not a valid FIELD_TYPE.` 
            )
        }
    }
    //If variation factors supplied...
    if (variationFactors !== null) {
        //Validate variation factors.
        //Make sure it is an object.
        if (typeof variationFactors !== "object") {
            throw validationErr(
                `typeof variationFactors is "${typeof variationFactors}"` +
                `, expected "object".`
            )
        }
        //Make sure each property of variation factors
        //is a valid FIELD_TYPE.
        for (const key in variationFactors) {
            const val = variationFactors[key]
            if (typeof val !== "string") {
                throw validationErr(
                    `typeof variationFactors.${key} is "${typeof val}", ` +
                    `expected "string".`
                )
            }
            if (!includes(FIELD_TYPE, val)) {
                throw validationErr(
                    `variationFactors.${key} [="${val}"] is not a valid` +
                    ` FIELD_TYPE.` 
                )
            }
        }
    }
    //If validators supplied...
    if (validators !== null) {
        //Make sure it is an array.
        if (!Array.isArray(validators)) {
            throw validationErr(
                `validators is not an array.`
            )
        }
        //Make sure they're all functions.
        for (const validator of validators) {
            const type = typeof validator
            if (type !== "function") {
                const index = validators.indexOf(validator)
                throw validationErr(
                    `typeof validators[${index}] is "${type}", ` +
                    `expected "function".`
                )
            }
        }
    }
    //If derivations supplied...
    if (derivations !== null) {
        //Make sure it is a function.
        const type = typeof derivations
        if (type !== "function") {
            throw validationErr(
                `typeof derivations is "${type}", ` +
                `expected "function".`
            )
        }
    }
}




const createArchetype = (
    identifier,
    properties, 
    variationFactors=null,
    validators=null,
    derivations=null
) => {
    const creationErr = (msg) => new Error(
        `Archetype creation error\n` +
        `${msg}`
    )
    //Build archetype object.
    const archetype = {
        identifier,
        properties,
        variationFactors,
        validators,
        derivations
    }
    //Perform basic validation of archetype.
    try {
        validateArchetype(archetype)
    } catch (err) {
        throw creationErr(err.message)
    }
    //Return archetype.
    return archetype
}

exports.createArchetype = createArchetype