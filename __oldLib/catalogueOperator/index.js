const fs = require("fs-extra")
const path = require("path")
const { lockCatalogue } = require("../lock")
const { getCatalogueDiff } = require("../diff")


////////////
////////////


const ensureLockFolderExists = async (catalogue) => {
    const lockPath = catalogue.options.lockFolder
    const exists = await fs.exists(lockPath)
    if (!exists) {
        await fs.mkdir(lockPath)
    } 
}

const getLockFilePath = (catalogue) => path.join(
    catalogue.options.lockFolder, 
    `${catalogue.name.data}.json`
)

////////////
////////////


const createLockedCatalogue = async (catalogue, dataOperator) => {
    await ensureLockFolderExists(catalogue)
    //TODO: Validate catalog
    //TODO: Add error handling.
    const filePath = getLockFilePath(catalogue)
    const lockedCatalogue = lockCatalogue(catalogue)
    const fileJson = JSON.stringify(lockedCatalogue)
    //TODO: Check if file exists already.
    await fs.writeFile(filePath, fileJson)
    //Command data operator to create collections
    //on database.
    await dataOperator.createCatalogue(lockedCatalogue)
}

const readLockedCatalogue = async (catalogue) => {
    //TODO: Add error handling.
    const filePath = getLockFilePath(catalogue)
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
    await dataOperator.resolveCatalogueDiff(catalogueDiff)
    //Update locked collections file.
    const filePath = getLockFilePath(catalogue)
    const updatedFileJson = JSON.stringify(newLockedCatalogue)
    await fs.writeFile(filePath, updatedFileJson)
}

const deleteLockedCatalogue = async (catalogue, dataOperator) => {
    //Command data operator to delete collections on database.
    const lockedCatalogue = await readLockedCatalogue(catalogue)
    await dataOperator.deleteCatalogue(lockedCatalogue)
    //Delete locked collections file.
    const filePath = getLockFilePath(catalogue)
    await fs.unlink(filePath)
}

exports.createLockedCatalogue = createLockedCatalogue
exports.readLockedCatalogue = readLockedCatalogue
exports.updateLockedCatalogue = updateLockedCatalogue
exports.deleteLockedCatalogue = deleteLockedCatalogue


////////////
////////////


const syncLockedCatalogue = async (catalogue, dataOperator) => {
    console.log(
        `Syncing locked catalogue "${catalogue.name.data}"...`
    )
    const lockFilePath = getLockFilePath(catalogue)
    const lockFileExists = await fs.exists(lockFilePath)
    if (!lockFileExists) {
        await createLockedCatalogue(catalogue, dataOperator)
    } else {
        await updateLockedCatalogue(catalogue, dataOperator)
    }
}

exports.syncLockedCatalogue = syncLockedCatalogue