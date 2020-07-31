const { catalogue } = require("../../app")


const createDataOperator = (
    //CATALOGUE
    createCatalogueHandler,
    resolveCatalogueDiffHandler,
    deleteCatalogueHandler,
    //ITEM
    createItemHandler
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
        )
})

exports.createDataOperator = createDataOperator