require('dotenv').config()
const { argv } = require("yargs")
const fs = require("fs-extra")
const path = require("path")
const { createMongoOperator } = require('../../mongoOperator');
const { deleteLockedCatalogue } = require('../../../lib/catalogueOperator');
const { defaultOptions } = require('../../../lib/defaultOptions');

//TODO: this is pretty broken.

const execute = async () => {
    //TODO: Add strong warning prompt.
    console.log("Deleting all catalogues...")
    //
    const options = {
        lockFolder: (argv.lf) ? argv.lf : defaultOptions.lockFolder
    }
    //
    const files = [...(await fs.readdir(options.lockFolder))]
    const catalogues = []
    for (const file of files) {
        if (path.extname(file) === ".json") {
            const filePath = path.join(options.lockFolder, file)
            console.log(filePath)
            const fileData = (await fs.readFile(filePath)).toString()
            const lockedCatalogue = JSON.parse(fileData)
            catalogues.push(lockedCatalogue)
        }
    }
    //
    const dataOperator = createMongoOperator(
        process.env.MONGO_CONNECTION,
        process.env.MONGO_DATABASE
    )
    for (const catalogue of catalogues) {
        const _catalogue = {
            ...catalogue,
            options
        }
        console.log(_catalogue)
        await deleteLockedCatalogue(_catalogue, dataOperator)
    }
}


execute()

