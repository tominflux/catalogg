const { createArchetype } = require("aarketype")


const lockArchetype = (archetype) => ({
    identifier: archetype.identifier.data,
    properties: archetype.properties,
    variationFactors: archetype.variationFactors,
    //derivedProperties: archetype.derivedProperties
})

const unlockArchetype = (
    lockedArchetype, 
    deriver=null, 
    validators=null
) => createArchetype(
    lockedArchetype.identifier,
    lockedArchetype.properties,
    lockedArchetype.variationFactors,
    /*
    lockedArchetype.derivedProperties,
    deriver,
    validators
    */
)

exports.lockArchetype = lockArchetype
exports.unlockArchetype = unlockArchetype