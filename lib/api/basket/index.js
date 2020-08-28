const { createItem } = require("aarketype")
const { basketArchetype } = require("../../util/basket")
const { lockItem, unlockItem } = require("../../util/lock/item")


////////////////
////////////////


const createBasket = async (
    userId,
    dataApi
) => {
    //
    const itemSelections = []
    //
    const basket = createItem(
        basketArchetype,
        userId,
        { itemSelections }
    )
    //
    const lockedBasket = lockItem(basket)
    //
    await dataApi.createBasket(lockedBasket)
}


const readBasket = async (
    userId,
    dataApi
) => {
    //
    const lockedBasket = await dataApi.readBasket(userId)
    //
    const basket = unlockItem(
        lockedBasket, basketArchetype
    )
    //
    return basket
}

const updateBasket = async (
    userId,
    itemSelections,
    dataApi
) => {
    //
    const lockedBasket = await dataApi.readBasket(userId)
    //
    const updatedBasket = createItem(
        basketArchetype,
        userId,
        {
            ...lockedBasket.properties,
            itemSelections
        }
    )
    //
    const updatedLockedBasket = lockItem(updatedBasket)
    //
    await dataApi.updateBasket(updatedLockedBasket)
}

const deleteBasket = async (
    userId,
    dataApi
) => {
    //
    await dataApi.deleteBasket(userId)
}


////////////////
////////////////


exports.createBasket = createBasket
exports.readBasket = readBasket
exports.updateBasket = updateBasket
exports.deleteBasket = deleteBasket
