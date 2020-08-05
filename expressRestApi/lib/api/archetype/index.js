
const { createArchetype } = require("aarketype")


const postArchetype = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const archetypeIdentifier = req.params.archId
    //
    const newArchetype = createArchetype(
        archetypeIdentifier,
        req.body.properties,
        req.body.variationFactors
    )
    //
    await req.catalogg.createArchetype(
        catalogueIdentifier,
        newArchetype
    )
    //
    res.send()
}

const getArchetypes = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    //
    const archetypes = await req.catalogg.readArchetypes(
        catalogueIdentifier
    )
    //
    res.json(archetypes)
}

const getArchetype = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const archetypeIdentifier = req.params.archId
    //
    const archetype = await req.catalogg.readArchetype(
        catalogueIdentifier, archetypeIdentifier
    )
    //
    res.json(archetype)
}

const deleteArchetype = async (req, res, next) => {
    const catalogueIdentifier = req.params.catId
    const archetypeIdentifier = req.params.archId
    //
    await req.catalogg.deleteArchetype(
        catalogueIdentifier, archetypeIdentifier
    )
    //
    res.send()
}

const serveArchetypeApi = (router) => {
    router.post("/catalogue/:catId/archetype/:archId", postArchetype)
    router.get("/catalogue/:catId/archetypes", getArchetypes)
    router.get("/catalogue/:catId/archetype/:archId", getArchetype)
    router.delete("/catalogue/:catId/archetype/:archId", deleteArchetype)
}

exports.serveArchetypeApi = serveArchetypeApi