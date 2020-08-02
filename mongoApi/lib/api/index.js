const archetypeMethods = require("./archetype")
const catalogueMathods = require("./catalogue")
const collectionMethods = require("./collection")
const itemMethods = require("./item")

//

const allMethods = {
    ...archetypeMethods,
    ...catalogueMathods,
    ...collectionMethods,
    ...itemMethods
}

//

const wrapApiMethod = (options, method) => {
    return (...params) => method(options, ...params)
}

const wrapAllMethods = (objOfMethods, options) => {
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

const generateApi = (options) => {
    const allWrappedMethods = wrapAllMethods(allMethods, options)
    return allWrappedMethods
}

module.exports = generateApi