

const readStatsCatalogue = async (dataApi) => (
    await dataApi.readStatsCatalogue
)

const readStatsCollection = async (dataApi) => (
    await dataApi.readStatsCollection
)

const readStatsItem = async (dataApi) => (
    await dataApi.readStatsItem
)


////////////
////////////


exports.readStatsCatalogue = readStatsCatalogue
exports.readStatsCollection = readStatsCollection
exports.readStatsItem = readStatsItem
