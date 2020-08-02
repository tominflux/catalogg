const mongoClient = require("mongodb").MongoClient

const mongoConnect = (options) => (
    new Promise(
        (resolve, reject) => {
            console.log("Connecting to MongoDB database...")
            mongoClient.connect(
                options.connection,
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