const { validateArchetype } = require("aarketype")
//const { validateItem } = require("../item")

const validateCollection = (collection) => {
    const validationErr = (msg) => new Error(
        `Collection validation error: ${msg}`
    )
    const {
        name,
        archetypeMap 
    } = collection
    //Validate name
    if (typeof name !== "string") {
        throw validationErr(
            `typeof collection.name is "${typeof name}", ` +
            `expected "string".`
        )
    }
    if (name.trim() === "") {
        throw validationErr(
            `collection.name cannot be an empty string.`
        )
    }
    //Validate archetypes
    for (const key of archetypeMap.keys()) {
        const archetype = archetypeMap.get(key)
        try {
            validateArchetype(archetype)
        } catch (err) {
            throw validationErr(err.message)
        }
    }
}

const createCollection = (
    name,
    archetypeMap
) => {
    //Create collection
    const collection = {
        name,
        archetypeMap
    }
    //Validate collection
    validateCollection(collection)
    //Return collection
    return collection
}

exports.validateCollection = validateCollection
exports.createCollection = createCollection
