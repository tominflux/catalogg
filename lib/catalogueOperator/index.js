
const fs = require("fs-extra")
const { lockCatalogue } = require("../lock")
const { getCatalogueDiff } = require("../diff")

//

const createLockedCatalogue = async (catalogue, dataOperator) => {
    //TODO: Validate catalog
    //TODO: Add error handling.
    const filePath = catalogue.options.lockedCataloguePath
    const lockedCatalogue = lockCatalogue(catalogue)
    const fileJson = JSON.stringify(lockedCatalogue)
    //TODO: Check if file exists already.
    await fs.writeFile(filePath, fileJson)
    //Command data operator to create collections
    //on database.
    dataOperator.createCatalogue(lockCatalogue)
}

const readLockedCatalogue = async (catalogue) => {
    //TODO: Add error handling.
    const filePath = catalogue.options.lockedCataloguePath
    const fileData = await fs.readFile(filePath)
    const fileString = fileData.toString()
    const fileJson = JSON.parse(fileString)
    const lockedCatalogue = fileJson
    return lockedCatalogue
}

const updateLockedCatalogue = async (catalogue, dataOperator) => {
    //TODO: Add error handling.
    //TODO: Write diff finder.
    //TODO: Write data operator diff resolver.
    const currentLockedCatalogue = await readLockedCatalogue(catalogue)
    const newLockedCatalogue = lockCatalogue(catalogue)
    //Get diff and command data operator to resolve
    //diff on database.
    const catalogueDiff = getCatalogueDiff(
        currentLockedCatalogue, newLockedCatalogue
    )
    dataOperator.resolveCatalogueDiff(catalogueDiff)
    //Update locked collections file.
    const filePath = catalogue.options.lockedCataloguePath
    const updatedFileJson = JSON.stringify(newLockedCatalogue)
    await fs.writeFile(filePath, updatedFileJson)
}

const deleteLockedCatalogue = async (catalogue, dataOperator) => {
    //Command data operator to delete collections on database.
    const lockedCatalogue = await readLockedCatalogue(catalogue)
    dataOperator.deleteCatalogue(lockedCatalogue)
    //Delete locked collections file.
    const filePath = catalogue.options.lockedCataloguePath
    await fs.unlink(filePath)
}

exports.createLockedCatalogue = createLockedCatalogue
exports.readLockedCatalogue = readLockedCatalogue
exports.updateLockedCatalogue = updateLockedCatalogue
exports.deleteLockedCatalogue = deleteLockedCatalogue