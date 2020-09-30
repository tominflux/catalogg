const archetypeMethods = require("./archetype")
const basketMethods = require("./basket")
const catalogueMathods = require("./catalogue")
const collectionMethods = require("./collection")
const itemMethods = require("./item")
const statsMethods = require("./stats")
const stockMethods = require("./stock")
const { connect, createMongoCollection, deleteMongoCollection } = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../util/collections")


/////////////
/////////////


const initialiseCatalogg = async (options) => {
    //
    const { connection, database } = await connect(options)
    //Create all catalogg collections.
    for (const collectionName of COLLECTION_NAMES) {
        await createMongoCollection(
            database, collectionName
        )
    }
    //
    connection.close()
}

const destroyCatalogg = async (options) => {
    //
    const { connection, database } = await connect(options)
    //Create all catalogg collections.
    for (const collectionName of COLLECTION_NAMES) {
        await deleteMongoCollection(
            database, collectionName
        )
    }
    //
    connection.close()
}

/////////////
/////////////


const allMethods = {
    initialiseCatalogg,
    destroyCatalogg,
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