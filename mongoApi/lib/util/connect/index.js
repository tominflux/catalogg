const mongoClient = require("mongodb").MongoClient

const mongoConnect = (options) => (
    new Promise(
        (resolve, reject) => {
            console.log("Connecting to MongoDB database...\n")
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

exports.mongoConnect = mongoConnect