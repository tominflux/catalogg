require('dotenv').config()
const { deleteLockedCatalogue } = require('../../../lib/catalogueOperator')
const { catalogue, dataOperator } = require('../..')


const run = async () => {
    await deleteLockedCatalogue(catalogue, dataOperator)
}


run()

