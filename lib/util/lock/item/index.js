const { createItem } = require("aarketype")

const lockItem = (item) => {
    const lockFieldsObj = (obj) => {
        if (obj === null) {
            return null
        }
        let lockedObj = {}
        for (const key in obj) {
            const field = obj[key]
            lockedObj = {
                ...lockedObj,
                [key]: field.data
            }
        }
        return {...lockedObj}
    }
    const lockFieldsArrayObj = (obj) => {
        if (obj === null) {
            return null
        }
        let lockedObj = {}
        for (const key in obj) {
            const arr = obj[key]
            lockedObj = {
                ...lockedObj,
                [key]: arr.map(
                    field => field.data
                )
            }
        }
        return {...lockedObj}
    }
    return {
        archetypeId: item.archetypeId.data,
        identifier: item.identifier.data,
        properties: lockFieldsObj(item.properties),
        variationFactors: lockFieldsArrayObj(item.variationFactors),
        //derivedProperties: lockFieldsObj(item.derivedProperties)
    }
}

const unlockItem = (
    lockedItem, 
    archetype
) => {
    //Ensure locked item archetype identifier matches
    //given archetype.
    if (lockedItem.archetypeId !== archetype.identifier) {
        throw new Error(
            `Locked item's archetype ` +
            `"${lockedItem.archetypeId}" ` +
            `does not match given archetype ` +
            `"${archetype.identifier}".`
        )
    }
    //
    const unlockedItem = createItem(
        archetype,
        lockedItem.identifier,
        lockedItem.properties,
        lockedItem.variationFactors
    )
    //
    return unlockedItem
}

exports.lockItem = lockItem
exports.unlockItem = unlockItem