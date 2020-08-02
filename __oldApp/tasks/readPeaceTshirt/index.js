require('dotenv').config()
const { syncLockedCatalogue } = require('../../../lib/catalogueOperator')
const { catalogue, dataOperator } = require('../..')
const { readFromCollection } = require('../../../lib/itemOperator')


const run = async () => {
    const items = await readFromCollection(
        "myCatalogue",
        "myCollection",  
        dataOperator,
        "peace-tshirt", 
        {
            size: "xl",
            colourway: "black"
        }
    )
    console.log(items)
}


run()

