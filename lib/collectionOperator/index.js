
const fs = require("fs-extra")


const getLockedCollectionsDiff = (lockedCollectionA, lockedCollectionB) => {
    //TODO: Write diff finder.
    return {}
}

//

const createLockedCollections = async (catalogue, dataOperator) => {
    //TODO: Validate catalog
    //TODO: Add error handling.
    const filePath = catalogue.options.lockedCollectionsPath
    const fileJson = JSON.stringify(catalogue.collections)
    const lockedCollections = JSON.parse(fileJson) //Serialised.
    //Command data operator to create collections
    //on database.
    dataOperator.createCollections(lockedCollections)
    //TODO: Check if file exists already.
    await fs.writeFile(filePath, fileJson)
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
    const updatedFileJson = JSON.stringify(catalogue.collections)
    const newLockedCollections = JSON.parse(updatedFileJson) //Serialised.
    //Get diff and command data operator to resolve
    //diff on database.
    const collectionsDiff = getLockedCollectionsDiff(
        currentLockedCollections, newLockedCollections
    )
    dataOperator.resolveCollectionsDiff(collectionsDiff)
    //Update locked collections file.
    const filePath = catalogue.options.lockedCollectionsPath
    await fs.writeFile(filePath, fileJson)
}

const deleteLockedCollections = async (catalogue) => {
    //Command data operator to delete collections on database.
    const lockedCollections = await readLockedCollections(catalogue)
    dataOperator.deleteCollections(lockedCollections)
    //Delete locked collections file.
    const filePath = catalogue.options.lockedCollectionsPath
    await fs.unlink()
}