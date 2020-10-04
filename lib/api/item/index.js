const { readArchetype } = require("../archetype")
const { createItem: createAarketypeItem } = require("aarketype")
const { lockItem, unlockItem } = require("@x-logg/util")
const { genVariationObjs } = require("../../util/genVariationObjs")


const createItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    archetypeId,
    itemId,
    properties,
    variationFactors,
    dataApi
) => {
    //Retrieve archetype from given id.
    const archetype = await readArchetype(
        catalogueIdentifier,
        archetypeId,
        dataApi
    )
    //Create item using supplied fields and looked up archetype.
    const item = createAarketypeItem(
        archetype,
        itemId,
        properties,
        variationFactors
    )
    //Generate variation objs
    const variationObjs = genVariationObjs(item)
    //Lock item
    const lockedItem = lockItem(item)
    //Create persistent item via data api.
    await dataApi.createItem(
        catalogueIdentifier,
        collectionIdentifier,
        lockedItem
    )
    //Create persistent stock records for item via data api.
    await dataApi.createStocksForItem(
        catalogueIdentifier,
        collectionIdentifier,
        lockedItem.identifier,
        variationObjs
    )
}

const readItems = async (
    catalogueIdentifier,
    collectionIdentifier,
    archetypeId = null,
    propertyFilter = {},
    dataApi
) => {
    //Get locked items from given fields via Data API.
    const lockedItems = await dataApi.readItems(
        catalogueIdentifier,
        collectionIdentifier,
        archetypeId,
        propertyFilter
    )
    //Get all archetype IDs from locked items.
    const archetypeIds = []
    for (const lockedItem of lockedItems) {
        const { archetypeId } = lockedItem
        //If doesn't exist, add it.
        if (!archetypeIds.includes(archetypeId)) {
            archetypeIds.push(archetypeId)
        }
    }
    //Retrieve all the archetype objects needed amongst items
    //via core API
    const archetypes = new Map()
    for (const archetypeId of archetypeIds) {
        //Retrieve archetype from given id.
        const archetype = await readArchetype(
            catalogueIdentifier,
            archetypeId,
            dataApi
        )
        //Add it to map.
        archetypes.set(archetypeId, archetype)
    }
    //Sequentially unlock all items with retrieved archetypes
    //for purposes of validation.
    const items = []
    for (const lockedItem of lockedItems) {
        const { archetypeId } = lockedItem
        const archetype = archetypes.get(archetypeId)
        const item = unlockItem(lockedItem, archetype)
        //Add unlocked item.
        items.push(item)
    }
    //Re-lock items for sending on to client.
    const relockedItems = items.map(
        item => lockItem(item)
    )
    return relockedItems
}

const readItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    dataApi
) => {
    //Read locked item from Data API
    const lockedItem = await dataApi.readItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //
    const { archetypeId } = lockedItem
    //Retrieve archetype.
    const archetype = await readArchetype(
        catalogueIdentifier,
        archetypeId,
        dataApi
    )
    //Unlock item with archetype for validation
    //purposes.
    const item = unlockItem(lockedItem, archetype)
    //Relock item and send on to client.
    const relockedItem = lockItem(item)
    return relockedItem
}

const updateItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    newProperties = null,
    newVariationFactors = null,
    dataApi
) => {
    //Read locked item from Data API
    const lockedItem = await dataApi.readItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    //Extract needed fields from locked item.
    const { archetypeId, properties, variationFactors } = lockedItem
    //Retrieve archetype from given id.
    const archetype = await readArchetype(
        catalogueIdentifier,
        archetypeId,
        dataApi
    )
    //Create item using supplied fields and looked up archetype.
    const item = createAarketypeItem(
        archetype,
        itemIdentifier,
        newProperties ? newProperties : properties,
        newVariationFactors ? newVariationFactors : variationFactors
    )
    //Lock item.
    const updatedLockedItem = lockItem(item)
    //Update persistent item via Data API
    await dataApi.updateItem(
        catalogueIdentifier,
        collectionIdentifier,
        updatedLockedItem
    )
}


const deleteItem = async (
    catalogueIdentifier,
    collectionIdentifier,
    itemIdentifier,
    dataApi
) => {
    await dataApi.deleteItem(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
    await dataApi.deleteItemStocks(
        catalogueIdentifier,
        collectionIdentifier,
        itemIdentifier
    )
}


exports.createItem = createItem
exports.readItems = readItems
exports.readItem = readItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem
