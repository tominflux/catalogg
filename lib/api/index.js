const archetypeMethods = require("./archetype")
const basketMethods = require("./basket")
const catalogueMathods = require("./catalogue")
const collectionMethods = require("./collection")
const itemMethods = require("./item")
const statsMethods = require("./stats")
const stockMethods = require("./stock")


//////////////
//////////////


const initialiseCatalogg = async (
    dataApi
) => {
    //
    await dataApi.initialiseCatalogg()
}


//////////////
//////////////


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

const genCataloggApi = (dataApi) => {
    const allWrappedMethods = wrapAllMethods(allMethods, dataApi)
    return allWrappedMethods
}

module.exports = genCataloggApi