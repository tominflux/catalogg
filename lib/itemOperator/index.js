
const createInCollection = (
    catalogue,
    collection,
    dataConnector,
    item,
    initialItemCount=0
) => {
    //Validate
    //...
    //Add Item via Data Connector
    dataConnector.createItem(
        catalogue,
        collection, 
        item, 
        initialItemCount
    )
    //Return 
    return newCollection
}

const readFromCollection = (
    catalogue,
    collection,
    dataConnector,
    dataConnectorQuery
) => {
    //Validate
    // - Validate collection
    // - Validate connector
    //Read from data connector
    const items = dataConnector.readItem(
        catalogue,
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
    catalogue,
    collection,
    item,
    updatedItemCount
) => {
    //

    //
    dataConnector.updateItem(
        catalogue,
        collection,
        item,
        updatedItemCount
    )
}

const deleteInCollection = (
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