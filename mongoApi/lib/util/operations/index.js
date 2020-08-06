


const getMongoCollections = async (
    database
) => new Promise(
    (resolve, reject) => (
        database.listCollections(
            {},
            { nameOnly: true }
        ).toArray(
            (err, res) => {
                if (err) {
                    reject(err.message)
                } else {
                    const names = res.map(
                        collection => collection.name
                    )
                    resolve(names)
                }
            }
        )
    )
)


//////////////
//////////////


const createMongoCollection = (
    database, collectionName
) => new Promise(
    (resolve, reject) => database.createCollection(
        collectionName, 
        (err) => {
            if (err) {
                reject(err.message)
                return
            }
            resolve()
        }
    )
)

const deleteMongoCollection = (
    database, collectionName
) => new Promise(
    (resolve, reject) => (
        database.collection(collectionName).drop(
            (err, delOk) => {
                if (err) {
                    reject(err.message)
                } else if (delOk) {
                    resolve()
                } else {
                    reject("Could not delete collection.")
                }
            }
        )
    )
)


////////////////
////////////////


const insertIntoCollection = (
    database, collectionName, documents
) => new Promise(
    (resolve, reject) => (
        database.collection(collectionName).insertMany(
            documents,
            (err, res) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(res)
                }
            }
        )
    )
)

const findInCollection = (
    database, collectionName, query={}
) => new Promise(
    (resolve, reject) => (
        database
        .collection(collectionName)
        .find(query)
        .toArray(
            (err, res) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(res)
                }
            }
        )
    )
)

const updateInCollection = (
    database, collectionName, query, values
) => new Promise(
    (resolve, reject) => (
        database
        .collection(collectionName)
        .updateMany(
            query,
            { $set: values },
            (err, res) => { 
                if (err) {
                    reject(err.message)
                } else {
                    resolve(res)
                }
            }
        )
    )
)

const deleteFromCollection = (
    database, collectionName, query
) => new Promise(
    (resolve, reject) => (
        database
        .collection(collectionName)
        .deleteMany(
            query,
            (err, res) => {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(res)
                }
            }
        )
    )
)

module.exports = {
    getMongoCollections,
    //
    createMongoCollection,
    deleteMongoCollection,
    //
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
}