require('dotenv').config()

const genCataloggMongoApi = require("./mongoApi/lib/api")
const genCataloggApi = require("./lib/api")
const genCataloggRestApi = require("./expressRestApi/lib/api")

const cataloggMongoApi = genCataloggMongoApi(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)
const cataloggApi = genCataloggApi(cataloggMongoApi)
const cataloggRestApi = genCataloggRestApi(cataloggApi)

//////////
//////////

const express = require('express')


const app = express()
const port = 3000


app.use("/api", cataloggRestApi)

app.listen(
    port,
    () => console.log(
        `Catalogg API listening at http://localhost:${port}`
    )
)