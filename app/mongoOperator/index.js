const mongo = require("mongodb")
const { createDataOperator } = require("../../lib/dataOperator")


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


const createCollection = (database, name) => new Promise(
    (resolve, reject) => database.createCollection(
        name, (err) => {
            if (err) {
                reject(err.message)
                return
            }
            console.log(
                `   Collection "${name}" created.`
            )
            resolve()
        }
    )
)

const deleteCollection = (database, name) => new Promise(
    (resolve, reject) => database.collection(name).drop(
        (err, delOk) => {
            if (err) {
                reject(err.message)
                return
            }
            if (delOk) {
                console.log(
                    `   Collection "${name}" deleted.`
                )
                resolve()
            } else {
                reject("Could not delete.")
            }
        }
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
        await createCollection(database, collection.name)
    }
    //Close Connection
    connection.close()
}

const resolveCatalogueDiff = async (options, catalogueDiff) => {
    //Open Connection
    console.log("Connecting to MongoDB database...\n")
    const { connection, database } = await mongoConnect(options)
    console.log(catalogueDiff)
    const {
        newCollectionNames,
        redundantCollectionNames
    } = catalogueDiff.collectionsDiff
    //Create New Collections.
    for (const collectionName of newCollectionNames) {
        await createCollection(database, collectionName)
    }
    //Delete Redundant Collections
    for (const collectionName of redundantCollectionNames) {
        await deleteCollection(database, collectionName)
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
        await deleteCollection(database, collection.name)
    }
    //Close Connection
    connection.close()
}


//////////////
//////////////


const createMongoOperator = (url, database) => {
    const options = { url, database }
    const dataOperator = createDataOperator(
        //Create Catalogue
        lockedCatalogue => createCatalogue(
            options, lockedCatalogue
        ),
        //Resolve Catalogue Diff
        catalogueDiff => resolveCatalogueDiff(
            options, catalogueDiff
        ),
        //Delete Catalogue
        lockedCatalogue => deleteCatalogue(
            options, lockedCatalogue
        )
    )
    return dataOperator
}

exports.createMongoOperator = createMongoOperator
