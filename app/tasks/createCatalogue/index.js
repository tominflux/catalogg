require('dotenv').config()
const { createLockedCatalogue } = require('../../../lib/catalogueOperator')
const { catalogue, dataOperator } = require('../..')


const run = async () => {
    await createLockedCatalogue(catalogue, dataOperator)
}


run()

