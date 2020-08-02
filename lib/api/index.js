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

const wrapApiMethod = (method, dataApi) => {
    return (...params) => method(...params, dataApi)
}

const wrapAllMethods = (objOfMethods, dataApi) => {
    let objOfWrappedMethods = {}
    for (const key in objOfMethods) {
        const method = objOfMethods[key]
        const wrappedMethod = wrapApiMethod(method, dataApi)
        objOfWrappedMethods = {
            ...objOfWrappedMethods,
            [key]: wrappedMethod
        }
    }
    return {...objOfWrappedMethods}
}

//

const generateApi = (dataApi) => {
    const allWrappedMethods = wrapAllMethods(allMethods, dataApi)
    return allWrappedMethods
}

module.exports = generateApi