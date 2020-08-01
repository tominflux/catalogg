const mongo = require("mongodb")
const { createDataOperator } = require("../../lib/dataOperator")
const { dataOperator, catalogue } = require("..")
const { getVariationObjs } = require("../../lib/itemOperator")


//////////////
//////////////


const mongoClient = require("mongodb").MongoClient

const mongoConnect = (options) => (
    new Promise(
        (resolve, reject) => {
            mongoClient.connect(
                options.url,
                (err, connection) => {
                    if (err) {
                        reject(err.message)
                        return
                    }
                    const database = connection.db(options.database)
                    resolve({
                        connection,
                        database
                    })
                }
            )
        }
    )
)


//////////////
//////////////

const dbCollectionName = (catalogueName, collectionName) => (
    `catalogg__${catalogueName}__${collectionName}`
)

const createCollection = (
    database, catalogueName, collectionName
) => new Promise(
    (resolve, reject) => database.createCollection(
        dbCollectionName(catalogueName, collectionName), 
        (err) => {
            if (err) {
                reject(err.message)
                return
            }
            console.log(
                `   Collection "${collectionName}" created in ` +
                `catalogue "${catalogueName}".`
            )
            resolve()
        }
    )
)

const deleteCollection = (
    database, catalogueName, collectionName
) => new Promise(
    (resolve, reject) => (
        database.collection(
            dbCollectionName(catalogueName, collectionName)
        ).drop(
            (err, delOk) => {
                if (err) {
                    reject(
                        `Could not delete collection "${collectionName}": ` +
                        `${err.message}.`
                    )
                    return
                }
                if (delOk) {
                    console.log(
                        `   Collection "${collectionName}" deleted ` +
                        `from catalogue "${catalogueName}".`
                    )
                    console.log(
                        `   ${dbCollectionName(catalogueName, collectionName)}`
                    )
                    resolve()
                    return 
                } else {
                    reject("Could not delete.")
                }
                return
            }
        )
    )
)

const insertIntoCollection = (
    database, catalogueName, collectionName, documents
) => new Promise(
    (resolve, reject) => (
        database.collection(
            dbCollectionName(catalogueName, collectionName)
        ).insertMany(
            documents, 
            (err, res) => {
                if (err) {
                    reject(
                        `   Could not insert documents into collection ` +
                        `"${collectionName}" of catalogue "${catalogueName}"` +
                        `... ${err.message}`
                    )
                    return
                }
                resolve()
            }
        )
    )
)

const findInCollection = (
    database, catalogueName, collectionName, query
) => new Promise(
    (resolve, reject) => (
        database.collection(
            dbCollectionName(catalogueName, collectionName)
        )
        .find(query)
        .toArray(
            (err, res) => {
                if (err) {
                    reject(
                        `   Could not find documents in collection ` +
                        `"${collectionName}" of catalogue "${catalogueName}"` +
                        `... ${err.message}\n` +
                        `   Query: ${query}`
                    )
                } else {
                    resolve(res)
                }
            }
        )
    )
)


//////////////
//////////////


const createCatalogue = async (options, lockedCatalogue) => {
    //Open Connection
    console.log("Connecting to MongoDB database...\n")
    const { connection, database } = await mongoConnect(options)
    //Create Collections.
    for (const collection of lockedCatalogue.collections) {
        await createCollection(
            database, lockedCatalogue.name, collection.name
        )
    }
    //Close Connection
    connection.close()
}

const resolveCatalogueDiff = async (options, catalogueDiff) => {
    //Open Connection
    console.log("Connecting to MongoDB database...\n")
    const { connection, database } = await mongoConnect(options)
    const {
        newCollectionNames,
        redundantCollectionNames
    } = catalogueDiff.collectionsDiff
    //Create New Collections.
    for (const collectionName of newCollectionNames) {
        await createCollection(
            database, catalogueDiff.catalogueName, collectionName
        )
    }
    //Delete Redundant Collections
    for (const collectionName of redundantCollectionNames) {
        await deleteCollection(
            database, catalogueDiff.catalogueName, collectionName
        )
    }
    //Close Connection
    connection.close()
}

const deleteCatalogue = async (options, lockedCatalogue) => {
    //Open Connection
    console.log("Connecting to MongoDB database...\n")
    const { connection, database } = await mongoConnect(options)
    //Delete Collections.
    for (const collection of lockedCatalogue.collections) {
        await deleteCollection(
            database, lockedCatalogue.name, collection.name
        )
    }
    //Close Connection
    connection.close()
}


//////////////
//////////////


const createItem = async (
    options, 
    catalogueName, 
    collectionName, 
    lockedItem,
    variationObjs
) => {
    //Open Connection
    console.log("Connecting to MongoDB database...\n")
    const { connection, database } = await mongoConnect(options)
    //Iterate through every permutation of
    //variations that exists for item.
    //And create a document for each.
    const composeDocument = (variationObj) => ({
        ...lockedItem,
        ...variationObj,
        stock: 0
    })
    const documents = variationObjs.map(
        variationObj => composeDocument(variationObj)
    )
    //Insert documents into db collection.
    await insertIntoCollection(
        database, catalogueName, collectionName, documents
    )
    //Close Connection
    connection.close()
} 

const readItem = async (
    options,
    catalogueName,
    collectionName,
    itemIdentifier,
    variationFilter=null
) => {
    //Open Connection
    console.log("Connecting to MongoDB database...\n")
    const { connection, database } = await mongoConnect(options)
    //
    const query = {
        identifier: itemIdentifier.data,
        ...variationFilter
    }
    //
    const result = await findInCollection(
        database, catalogueName, collectionName, query
    )
    //
    const returnVal = (
        (result.length > 0) ?
            result : null
    )
    //Close Connection
    connection.close()
    //
    return
}


//////////////
//////////////


const createMongoOperator = (url, database) => {
    const options = { url, database }
    const dataOperator = createDataOperator(
        //CATALOGUE
        //Create Catalogue
        async lockedCatalogue => await createCatalogue(
            options, lockedCatalogue
        ),
        //Resolve Catalogue Diff
        async catalogueDiff => await resolveCatalogueDiff(
            options, catalogueDiff
        ),
        //Delete Catalogue
        async lockedCatalogue => await deleteCatalogue(
            options, lockedCatalogue
        ),
        //ITEM
        //Create Item
        async (
            catalogueName, 
            collectionName,
            lockedItem,
            variationObjs
        ) => await createItem(
            options,  
            catalogueName, 
            collectionName, 
            lockedItem,
            variationObjs
        ),
        //Read Item
        async (
            catalogueName,
            collectionName,
            itemIdentifier,
            variationFilter
        ) => await readItem(
            options,
            catalogueName, 
            collectionName, 
            itemIdentifier,
            variationFilter
        )
    )
    return dataOperator
}

exports.createMongoOperator = createMongoOperator
