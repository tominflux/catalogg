
const fs = require("fs-extra")
const { demapifyArchetypes } = require("../misc")

const lockifyCollection = (collection) => {
    const archetypes = demapifyArchetypes(collection.archetypeMap)
    const lockifiedArchetypes = archetypes.map(
        (archetype) => {
            const {
                deriver,
                validators,
                ...lockifiedArchetype
            } = archetype
            return lockifiedArchetype
        }
    )
    const lockifiedCollection = {
        name: collection.name,
        archetypes: lockifiedArchetypes 
    }
    return lockifiedCollection
}


exports.lockifyCollection = lockifyCollection

//

const createLockedCollections = async (catalogue, dataOperator) => {
    //TODO: Validate catalog
    //TODO: Add error handling.
    const filePath = catalogue.options.lockedCollectionsPath
    const lockedCollections = catalogue.collections.map(
        collection => lockifyCollection(collection)
    )
    const fileJson = JSON.stringify(lockedCollections)
    //TODO: Check if file exists already.
    await fs.writeFile(filePath, fileJson)
    //Command data operator to create collections
    //on database.
    dataOperator.createCollections(lockedCollections)
}

const readLockedCollections = async (catalogue) => {
    //TODO: Add error handling.
    const filePath = catalogue.options.lockedCollectionsPath
    const fileData = await fs.readFile(filePath)
    const fileString = fileData.toString()
    const fileJson = JSON.parse(fileString)
    const lockedCollections = fileJson
    return lockedCollections
}

const updateLockedCollections = async (catalogue, dataOperator) => {
    //TODO: Add error handling.
    //TODO: Write diff finder.
    //TODO: Write data operator diff resolver.
    const currentLockedCollections = await readLockedCollections(catalogue)
    const newLockedCollections = catalogue.collections.map(
        collection => lockifyCollection(collection)
    ) 
    const updatedFileJson = JSON.stringify(newLockedCollections)
    //Get diff and command data operator to resolve
    //diff on database.
    const collectionsDiff = getLockedCollectionsDiff(
        currentLockedCollections, newLockedCollections
    )
    dataOperator.resolveCollectionsDiff(collectionsDiff)
    //Update locked collections file.
    const filePath = catalogue.options.lockedCollectionsPath
    await fs.writeFile(filePath, updatedFileJson)
}

const deleteLockedCollections = async (catalogue, dataOperator) => {
    //Command data operator to delete collections on database.
    const lockedCollections = await readLockedCollections(catalogue)
    dataOperator.deleteCollections(lockedCollections)
    //Delete locked collections file.
    const filePath = catalogue.options.lockedCollectionsPath
    await fs.unlink(filePath)
}