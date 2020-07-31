

const getCollectionsDiff = (lockedCatalogueA, lockedCatalogueB) => {
    //TODO: ensure catalogue names are the same.
    //
    const getCollectionNames = (lockedCatalogue) => (
        lockedCatalogue.collections.map(
            (collection) => collection.name
        )
    )
    //
    const collectionNamesA = getCollectionNames(lockedCatalogueA)
    const collectionNamesB = getCollectionNames(lockedCatalogueB)
    //
    const findUniqueCollectionNames = (namesA, namesB) => {
        const uniqueNames = []
        for (const name of namesA) {
            if (!namesB.includes(name)) {
                uniqueNames.push(name)
            }
        }
        return uniqueNames
    }
    //
    const redundantCollectionNames = findUniqueCollectionNames(
        collectionNamesA, collectionNamesB
    )
    const newCollectionNames = findUniqueCollectionNames(
        collectionNamesB, collectionNamesA
    )
    //
    return {
        redundantCollectionNames,
        newCollectionNames
    }
}


//TODO: complete archetypes diff finder.
//      (needed for MySQL collection operations)


/*
/*
const getMutualArchetypesDiff = (lockedArchetypesA, lockedArchetypesB) => {
    const archetypesA = lockedArchetypesA
    const archetypesB = lockedArchetypesB
    //
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
    //
    const cumulativePropertiesA = accumulateProperties(archetypesA)
    const cumulativePropertiesB = accumulateProperties(archetypesB)
    //
    const findUniqueProperties = (propertiesA, propertiesB) => {
        const uniqueProperties = []

    }
    //
    //const redundantProperties = 
}


const getArchetypesDiff = (lockedCatalogueA, lockedCatalogueB) => {
    const diffErr = (msg) => new Error(
        `Archetypes diff error: ${msg}`
    )
    //
    const getArchetypeIds = (lockedCatalogue) => (
        lockedCatalogue.archetypes.map(
            (archetype) => archetype.identifier.data
        )
    )
    //
    const archetypeIdsA = getArchetypeIds(lockedCatalogueA)
    const archetypeIdsB = getArchetypeIds(lockedCatalogueB)
    //
    const findUniqueArchetypeIds = (idsA, idsB) => {
        const uniqueIds = []
        for (const id of idsA) {
            if (!idsB.includes(id)) {
                uniqueIds.push(id)
            }
        }
        return uniqueIds
    }
    //Find unique archetypes between each catalogue.
    const redundantArchetypeIds = findUniqueArchetypeIds(
        archetypeIdsA, archetypeIdsB
    )
    const newArchetypeIds = findUniqueArchetypeIds(
        archetypeIdsB, archetypeIdsA
    )
    //Get new archetypes
    const newArchetypes = lockedCatalogueB.archetypes.filter(
        archetype => newArchetypeIds.includes(archetype.identifier)
    )
    //Get mutual archetypes 
    const mutualArchetypesA = lockedCatalogueA.archetypes.filter(
        archetype => (!redundantArchetypeIds.includes(archetype.identifier))
    )
    const mutualArchetypesB = lockedCatalogueB.archetypes.filter(
        archetype => (!newArchetypeIds.includes(archetype.indentifier))
    )
    //Get mutual archetypes diff
    const 
    const {
        unchangedArchetypeIds,
        modifiedArchetypesDiff
    } = 
    //Get shared archetypes
    //Get modified archetypes diff 
    return {
        redundantArchetypeIds,
        newArchetypes,
        unchangedArchetypes: [

        ],
        modifiedArchetypesDiff: [

        ]
    }
}
*/

const getCatalogueDiff = (lockedCatalogueA, lockedCatalogueB) => {
    const collectionsDiff = getCollectionsDiff(
        lockedCatalogueA, lockedCatalogueB
    )
    //TODO: complete archetypes diff finder.
    //      (needed for MySQL collection operations)
    /*
    const archetypesDiff = getArchetypesDiff(
        lockedCatalogueA, lockedCatalogueB
    )
    */
    return {
        catalogueName: lockedCatalogueA.name,
        collectionsDiff,
        //archetypesDiff
    }
}

exports.getCatalogueDiff = getCatalogueDiff