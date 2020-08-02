require('dotenv').config()
const genCataloggMongoApi = require("./mongoApi/lib/api")
const genCataloggApi = require("./_newlib/api")
const { tshirtArchetype } = require("./archetypes/tshirt")

const cataloggMongoApi = genCataloggMongoApi(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)
const cataloggApi = genCataloggApi(cataloggMongoApi)

const run = async () => {
    await cataloggApi.createArchetype(
        "myCatalogue",
        tshirtArchetype
    )
}
run()
/*
cataloggApi.createArchetype(
    tshirtArchetype
)
*/