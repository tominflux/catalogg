

//////////////////////////
/* Mapping & De-mapping */
//////////////////////////


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


//////////////////////////
/*       Locking        */
//////////////////////////


const lockArchetypes = (archetypes) => archetypes.map(
    (archetype) => {
        const {
            deriver,
            validators,
            ...lockedArchetype
        } = archetype
        return lockedArchetype
    }
)

const lockCollections = (collections) => collections.map(
    (collection) => ({
        name: collection.name.data
    })
)

const lockCatalogue = (catalogue) => {
    //Lock catalogue archetypes.
    const archetypes = demapifyArchetypes(collection.archetypeMap)
    const lockedArchetypes = lockArchetypes(archetypes)
    //Lock catalogue collections
    const lockedCollections = lockCollections(collections)
    //Create locked catalogue and return it.
    const lockedCatalogue = {
        name: catalogue.name.data,
        archetypes: lockedArchetypes,
        collections: lockedCollections
    }
    return lockedCatalogue
}

exports.lockCatalogue = lockCatalogue