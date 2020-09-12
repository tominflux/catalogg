const { connect } = require("@x-logg/mongoops")
const { getEntityStats, ENTITY_TYPE } = require("../../util/stats")


///////////
///////////


const readStatsEntity = async (
    options,
    entityType
) => {
    const { connection, database } = await connect(options)
    const stats = await getEntityStats(database, entityType)
    connection.close()
    return stats
}


///////////
///////////


const readStatsCatalogue = async (options) => (
    await readStatsEntity(options, ENTITY_TYPE.CATALOGUE)
)

const readStatsCollection = async (options) => (
    await readStatsEntity(options, ENTITY_TYPE.COLLECTION)
)

const readStatsItem = async (options) => (
    await readStatsEntity(options, ENTITY_TYPE.ITEM)
)


///////////
///////////


exports.readStatsCatalogue = readStatsCatalogue
exports.readStatsCollection = readStatsCollection
exports.readStatsItem = readStatsItem

