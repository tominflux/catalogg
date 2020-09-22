const archetypeMethods = require("./archetype")
const basketMethods = require("./basket")
const catalogueMathods = require("./catalogue")
const collectionMethods = require("./collection")
const itemMethods = require("./item")
const statsMethods = require("./stats")
const stockMethods = require("./stock")
const { getBasketsCollectionName, getCataloggCollectionName } = require("../util/misc")
const { connect, createMongoCollection } = require("@x-logg/mongoops")


/////////////
/////////////


const initialiseCatalogg = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //Create catalogg collection.
    await createMongoCollection(
        database, getCataloggCollectionName()
    )
    //Create baskets collection.
    await createMongoCollection(
        database, getBasketsCollectionName()
    )
    //
    connection.close()
}


/////////////
/////////////


const allMethods = {
    initialiseCatalogg,
    ...archetypeMethods,
    ...basketMethods,
    ...catalogueMathods,
    ...collectionMethods,
    ...itemMethods,
    ...statsMethods,
    ...stockMethods
}


/////////////
/////////////


const wrapApiMethod = (options, method) => {
    return (...params) => method(options, ...params)
}

const wrapAllMethods = (options, objOfMethods) => {
    let objOfWrappedMethods = {}
    for (const key in objOfMethods) {
        const method = objOfMethods[key]
        const wrappedMethod = wrapApiMethod(options, method)
        objOfWrappedMethods = {
            ...objOfWrappedMethods,
            [key]: wrappedMethod
        }
    }
    return {...objOfWrappedMethods}
}

//

const genMongoApi = (connection, database) => {
    const options = { connection, database }
    const allWrappedMethods = wrapAllMethods(options, allMethods)
    return allWrappedMethods
}

module.exports = genMongoApi