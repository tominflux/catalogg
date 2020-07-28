const { validateArchetype } = require("../archetype")
const { validateField, createField } = require("ffield")


const validateItem = (item, archetype) => {
    const validationErr = (msg) => new Error(
        `Item validation error: ${msg}\n`
    )
    //Perform basic validation on archetype.
    validateArchetype(archetype)
    //
    const {
        properties,
        variations
    } = item
    //Validate properties
    // - Ensure it's an object.
    if (typeof properties !== "object") {
        throw validationErr(
            `typeof properties is "${typeof properties}", ` +
            `expected "object".`
        )
    }
    // - Check keys match archetype
    const itemPropKeys = JSON.stringify(Object.keys(properties))
    const archPropKeys = JSON.stringify(Object.keys(archetype.properties))
    if (itemPropKeys !== archPropKeys) {
        throw validationErr(
            `Properties do not match up to archetype properties.\n` +
            `Item properties: ${itemPropKeys}\n` +
            `Archetype properties: ${archPropKeys}`
        )
    }
    // - Check properties are valid fields
    for (const key in properties) {
        const val = properties[key]
        validateField(val)
    }
    // - Check property field types match archetype
    for (const key in properties) {
        const itemVal = properties[key]
        const archVal = archetype.properties[key]
        if (itemVal.type !== archVal) {
            throw validationErr(
                `Field type of properties.${key}="${itemVal.type}" ` +
                `does not match type specified in archetype ` +
                `"${archVal}".`
            )
        }
    }
    //Validate variations
    // - Ensure it's an object.
    if (typeof variations !== "object") {
        throw validationErr(
            `typeof variations is "${typeof variations}", ` +
            `expected "object".`
        )
    }
    // - Check keys match 
    const itemVarsKeys = JSON.stringify(Object.keys(variations))
    const archVarsKeys = JSON.stringify(Object.keys(archetype.variations))
    if (itemVarsKeys !== archVarsKeys) {
        throw validationErr(
            `Item variations do not match up to archetype variations.\n` +
            `Item variations: ${itemVarsKeys}\n` +
            `Archetype variations: ${archVarsKeys}`
        )
    }
    // - Check each variation is an array.
    for (const key in variations) {
        const val = variations[key]
        if (!Array.isArray(val)) {
            throw validationErr(
                `variations.${key} is not an array.`
            )
        }
    }
    // - Check each entry of each variation is a valid field.
    for (const key in variations) {
        const val = variations[key]
        for (const entry in val) {
            validateField(entry)
        }
    }
    // - Check each field type of each entry 
    //   matches that of the archetype.
    for (const key in variations) {
        const itemVal = variations[key]
        const archVal = archetype.variations[key]
        for (const itemEntry of itemVal) {
            if (itemEntry.type !== archVal) {
                const index = itemVal.indexOf(itemEntry)
                throw validationErr(
                    `Field type of variations.${key}[${index}] is ` +
                    `"${itemEntry.type}" and does not entry field ` +
                    `type specified in archetype "${archVal}".`
                )
            } 
        }
    }
    //Run deriver
    //& validate resulting properties
    const derivedProperties = archetype.deriver(item)
    // - Ensure it's an object.
    if (typeof derivedProperties !== "object") {
        throw validationErr(
            `typeof derivedProperties is "${typeof derivedProperties}", ` +
            `expected "object".`
        )
    }
    // - Check keys match archetype
    const itemDerPropKeys = JSON.stringify(Object.keys(derivedProperties))
    const archDerPropKeys = JSON.stringify(Object.keys(archetype.derivedProperties))
    if (itemDerPropKeys !== archDerPropKeys) {
        throw validationErr(
            `Derived properties do not match up to archetype derived properties.\n` +
            `Item derivedProperties: ${itemDerPropKeys}\n` +
            `Archetype derivedProperties: ${archDerPropKeys}`
        )
    }
    // - Check derived propeties are valid fields
    for (const key in derivedProperties) {
        const val = derivedProperties[key]
        validateField(val)
    }
    // - Check derivedProperty field types match archetype
    for (const key in derivedProperties) {
        const itemVal = derivedProperties[key]
        const archVal = archetype.derivedProperties[key]
        if (itemVal.type !== archVal) {
            throw validationErr(
                `Field type of derivedProperties.${key}="${itemVal.type}" ` +
                `does not match type specified in archetype ` +
                `"${archVal}".`
            )
        }
    }
    //Run archetype validators
    for (const validator of archetype.validators) {
        const isValid = validator(item)
        if (isValid !== true) {
            const index = archetype.validators.indexOf(validator)
            throw validationErr(
                `Archetype validator failed. [index=${index}]`
            )
        }
    }
}


const createItem = (
    archetype, 
    properties, 
    variations
) => {
    //Perform basic validation on archetype.
    validateArchetype(archetype)
    //Build item.
    // - Fieldify properties, assiging field types based on archetype.
    let itemProperties = {}
    for (const key in properties) {
        const property = properties[key]
        const fieldType = archetype.properties[key]
        const field = createField(fieldType, property)
        itemProperties = {
            ...itemProperties,
            [key]: field
        }
    }
    // - Fieldify variation entries, assigning 
    //   field types based on archetype.
    let itemVariations = {}
    for (const key in variations) {
        const variation = variations[key]
        const fieldType = archetype.variations[key]
        const fieldArray = []
        for (const entry of variation) {
            const field = createField(fieldType, entry)
            fieldArray.push(field)
        }
        itemVariations = {
            ...itemVariations,
            [key]: fieldArray
        }
    }
    // - Build intermediate item.
    let item = {
        properties: itemProperties,
        variations: itemVariations
    }
    // - If derived properties exist in archetype, derive them,
    //   and then fieldify them.
    let itemDerivedProperties = {}
    if (archetype.derivedProperties !== null) {
        const intermediateItem = { ...item }
        const derivedProperties = archetype.deriver(intermediateItem)
        for (const key in derivedProperties) {
            const derivedProperty = derivedProperties[key]
            const fieldType = archetype.derivedProperties[key]
            const field = createField(fieldType, derivedProperty)
            itemDerivedProperties = {
                ...itemDerivedProperties,
                [key]: field
            }
        }
    }
    // - Finish building item.
    item = {
        ...item,
        derivedProperties: itemDerivedProperties
    }
    //Validate item.
    validateItem(item, archetype)
    //Return item.
    const newItem = { ...item }
    return newItem
}

exports.validateItem = validateItem
exports.createItem = createItem