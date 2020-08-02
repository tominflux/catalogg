const { validateArchetype } = require("aarketype")
const { createField, FIELD_TYPE, validateField } = require("ffield")

const validateCollection = (collection) => {
    const validationErr = (msg) => new Error(
        `Collection validation error: ${msg}`
    )
    const {
        name,
        archetypeMap 
    } = collection
    //Validate name
    try {
        validateField(name, () => {
            if (name.data.trim() === "") {
                throw new Error(
                    `collection.name.data cannot be an empty string.`
                )
            }
            return true
        })
    } catch (err) {
        throw validationErr(err.message)
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
        name: createField(FIELD_TYPE.STRING, name),
        archetypeMap
    }
    //Validate collection
    validateCollection(collection)
    //Return collection
    return collection
}

exports.validateCollection = validateCollection
exports.createCollection = createCollection
