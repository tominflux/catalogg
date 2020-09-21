const readStatsCatalogue = async (dataApi) => (
    await dataApi.readStatsCatalogue(dataApi)
)

const readStatsCollection = async (dataApi) => (
    await dataApi.readStatsCollection(dataApi)
)

const readStatsItem = async (dataApi) => (
    await dataApi.readStatsItem(dataApi)
)

////////////
////////////

exports.readStatsCatalogue = readStatsCatalogue;
exports.readStatsCollection = readStatsCollection;
exports.readStatsItem = readStatsItem;
