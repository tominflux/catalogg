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
    const names = await cataloggApi.readCatalogueNames()
    console.log()
    console.log(names)
}
run()
/*
cataloggApi.createArchetype(
    tshirtArchetype
)
*/