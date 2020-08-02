const { createField, FIELD_TYPE } = require("ffield")
const { defaultOptions } = require("./defaultOptions")
const { mapifyArchetypes } = require("./lock")
const { createCollection } = require("./collection")


const createCatologue = (
    name,
    archetypes,
    collectionNames,
    options={}
) => {
    const compositeOptions = {
        ...defaultOptions,
        ...options
    }
    const archetypeMap = mapifyArchetypes(archetypes)
    const collections = collectionNames.map(
        collectionName => createCollection(
            collectionName, archetypeMap
        )
    )
    return {
        name: createField(FIELD_TYPE.STRING, name),
        archetypeMap,
        collections,
        options: compositeOptions
    }
}

const validateCatalogue = () => {
    //Ensure all collections have same archetypes

}

exports.createCatologue = createCatologue