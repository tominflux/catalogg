
const createInCollection = (
    collection,
    dataConnector,
    item,
    initialItemCount=0
) => {
    //Validate
    //...
    //Add Item via Data Connector
    dataConnector.create(
        collection, 
        item, 
        initialItemCount
    )
    //Return 
    return newCollection
}

const readFromCollection = (
    collection,
    dataConnector,
    dataConnectorQuery
) => {
    //Validate
    // - Validate collection
    // - Validate connector
    //Read from data connector
    const items = dataConnector.read(
        collection,
        dataConnectorQuery
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
    collection,
    item,
    updatedItemCount
) => {
    //

    //
    dataConnector.update(
        collection,
        item,
        updatedItemCount
    )
}

const deleteInCollection = (
    collection,
    itemToDelete
) => {
    //
    dataConnector.delete(
        collection,
        item
    )
}