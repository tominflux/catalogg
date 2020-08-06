const archetypeMethods = require("./archetype")
const catalogueMathods = require("./catalogue")
const collectionMethods = require("./collection")
const itemMethods = require("./item")
const stockMethods = require("./stock")

//

const allMethods = {
    ...archetypeMethods,
    ...catalogueMathods,
    ...collectionMethods,
    ...itemMethods,
    ...stockMethods
}

//

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