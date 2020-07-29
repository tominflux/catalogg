

const mapifyArchetypes = (archetypes) => (
    new Map(
        archetypes.map(
            (archetype) => [
                archetype.identifier,
                archetype
            ]
        )
    )
)

const demapifyArchetypes = (archetypeMap) => (
    [...archetypeMap.entries()].map(
        entry => entry[1]
    )
)

exports.mapifyArchetypes = mapifyArchetypes
exports.demapifyArchetypes = demapifyArchetypes