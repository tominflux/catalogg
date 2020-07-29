const { validateArchetype } = require("aarketype")
const { validateItem } = require("../item")


const validateCollection = (collection) => {
    const validationErr = new Error(
        `Collection validation error: ${msg}`
    )
    const {
        name,
        archetypes 
    } = collection
    //Validate name
    if (typeof name !== string) {
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
    for (const archetype of archetypes) {
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










//

const createInCollection = (
    collection,
    dataConnector,
    item,
    initialItemCount=0
) => {
    //Validate
    //...
    //Add Item via Data Connector
    dataConnector.create(
        collection, 
        item, 
        initialItemCount
    )
    //Return 
    return newCollection
}

const readFromCollection = (
    collection,
    dataConnector,
    dataConnectorQuery
) => {
    //Validate
    // - Validate collection
    // - Validate connector
    //Read from data connector
    const items = dataConnector.read(
        collection,
        dataConnectorQuery
    )
    //Validate items
    for (const item of items) {
        const archetype = collection.archetypeMap.get(
            item.archetypeId
        )
        validateItem(item, archetype)
    }
    //Return items
    return items 
}

const updateInCollection = (
    collection,
    item,
    updatedItemCount
) => {
    //

    //
    dataConnector.update(
        collection,
        item,
        updatedItemCount
    )
}

const deleteInCollection = (
    collection,
    itemToDelete
) => {
    //
    dataConnector.delete(
        collection,
        item
    )
}