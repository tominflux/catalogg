
const getLockedCollectionsDiff = (lockedCollectionA, lockedCollectionB) => {
    const diffErr = (msg) => new Error(
        `Diff error: ${msg}`
    )
    //Names must be the same.
    if (lockedCollectionA.name !== lockedCollectionB.name) {
        throw diffErr(
            `Collection names do not match. ` +
            `A: "${lockedCollectionA.name}"  |  ` +
            `B: "${lockedCollectionB.name}"`
        )
    }
    //Combine unique properties across all 
    //archetypes in a collection (derived included).
    const accumulateProperties = (archetypes) => {
        let cumulativeProperties = {}
        for (const archetype of archetypes) {
            const combinedProps = {
                ...archetype.properties,
                ...archetype.derivedProperties
            }
            const keyAlreadyExists = (key) => (
                [...Object.keys(cumulativeProperties)].includes(key)
            )
            for (const key in combinedProps) {
                if (!keyAlreadyExists(key)) {
                    const val = archetype.properties[key]
                    cumulativeProperties = {
                        ...cumulativeProperties,
                        [key]: val
                    }
                }
            }
        }
    }
    //Combine unique properties across 
    //collection A.
    const cumulativePropertiesA = accumulateProperties(
        lockedCollectionA.archetypes
    )
    //Do same for collection B
    const cumulativePropertiesB = accumulateProperties(
        lockedCollectionB.archetypes
    )
}


const getCatalogueDiff = (lockedCollectionsA, lockedCollectionsB) => {
    //
    const accumulateArchetypeIds = (collections) => {
        const archetypeIds = []
        for (const collection of collections) {
            for (const archetype of collection.archetypes) {
                if (!archetypeIds.includes(archetype.identifier)) {
                    archetypeIds.push(archetype.identifier)
                }
            }
        }
        return archetypeIds
    }
    //
    const cumulativeArchetypeIdsA = accumulateArchetypeIds(
        lockedCollectionsA
    )
    const cumulativeArchetypeIdsB = accumulateArchetypeIds(
        lockedCollectionsB
    )
    //
    
}