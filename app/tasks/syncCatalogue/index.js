require('dotenv').config()
const { syncLockedCatalogue } = require('../../../lib/catalogueOperator')
const { catalogue, dataOperator } = require('../..')


const run = async () => {
    await syncLockedCatalogue(catalogue, dataOperator)
}


run()

