const { lockItem } = require("../lock")


const traverseThroughStocks = (item, fn) => {
    if (item.variationFactors === null) {
        fn({})
    }
    const traverse = (variationFactors, accumFactors={}) => {
        //Get keys of variation factors.
        const keys = Object.keys(variationFactors)
        //Check if theres any variation factors left to traverse.
        if (keys.length === 0) {
            //If not, then call the callback function
            fn(accumFactors)
            return
        }
        //Remove one key.
        const remainingKeys = [...keys]
        const currentKey = remainingKeys.splice(0, 1)
        //Rebuild remaining variation factors.
        let _remainingVariationFactors = {}
        for (const key of remainingKeys) {
            _remainingVariationFactors = {
                ..._remainingVariationFactors,
                [key]: variationFactors[key]
            }
        } 
        const remainingVariationFactors = _remainingVariationFactors
        //Get current variation factor.
        const variationFactor = variationFactors[currentKey]
        //Iterate through each variation
        //(E.g: sm, md, lg)
        for (const variation of variationFactor) {
            //Add variation to next factors.
            const nextFactors = {
                ...accumFactors,
                [currentKey]: variation.data
            }
            //Traverse further
            traverse(remainingVariationFactors, nextFactors)
        }
    }
    traverse(item.variationFactors)
}

const getVariationObjs = (item) => {
    const variationObjs = []
    traverseThroughStocks(item, (obj) => variationObjs.push(obj))
    return variationObjs
}

exports.getVariationObjs = getVariationObjs

////////////
////////////


const createInCollection = async (
    catalogueName,
    collectionName,
    dataOperator,
    item
) => {
    const creationErr = (msg) => new Error(
        `Create in collection error: ${msg}`
    )
    //Validate
    const dbLockedItem = await dataOperator.readItem(
        catalogueName,
        collectionName,
        item.identifier.data
    )
    if (dbLockedItem !== null) {
        throw creationErr(
            `item "${item.identifier.data}" already exists in ` +
            `catalogue "${catalogueName}" - collection ` +
            `"${collectionName}".`
        )
    }
    //Lock item
    const lockedItem = lockItem(item)
    //Add Item via Data Connector
    await dataOperator.createItem(
        catalogueName,
        collectionName, 
        lockedItem,
        getVariationObjs(item)
    )
}

const readFromCollection = (
    catalogue,
    collection,
    dataConnector,
    query
) => {
    //Validate
    // - Validate collection
    // - Validate connector
    //Read from data connector
    const items = dataConnector.readItem(
        catalogue,
        collection,
        query
    )
    //Validate items
    for (const item of items) {
        const archetype = collection.archetypeMap.get(
            item.archetypeId
        )
        validateItem(item, archetype)
    }
    //Return items
    return items 
}

const updateInCollection = (
    catalogue,
    collection,
    item,
    variationObj
) => {
    //

    //
    dataConnector.updateItem(
        catalogue,
        collection,
        item,
        updatedItemCounts
    )
}

const deleteFromCollection = (
    catalogue,
    collection,
    itemToDelete
) => {
    //
    dataConnector.deleteItem(
        catalogue,
        collection,
        itemToDelete
    )
}




exports.createInCollection = createInCollection