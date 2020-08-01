const { catalogue } = require("../../app")


const createDataOperator = (
    //CATALOGUE
    createCatalogueHandler,
    resolveCatalogueDiffHandler,
    deleteCatalogueHandler,
    //ITEM
    createItemHandler,
    readItemHandler
) => ({
    //CATALOGUE
    createCatalogue: 
        async lockedCatalogue => await createCatalogueHandler(
            lockedCatalogue
        ),
    resolveCatalogueDiff:
        async catalogueDiff => await resolveCatalogueDiffHandler(
            catalogueDiff
        ),
    deleteCatalogue:
        async lockedCatalogue => await deleteCatalogueHandler(
            lockedCatalogue
        ),
    //ITEM
    createItem:
        async (
            catalogueName,
            collectionName,
            lockedItem,
            variationObjs
        ) => await createItemHandler(
            catalogueName,
            collectionName,
            lockedItem,
            variationObjs
        ),
    readItem:
        async (
            catalogueName,
            collectionName,
            itemIdentifier,
            variationFilter
        ) => await readItemHandler(
            catalogueName,
            collectionName,
            itemIdentifier,
            variationFilter
        )
})

exports.createDataOperator = createDataOperator