

const FIELD_TYPE = {
    STRING: "STRING",
    NUMBER: "NUMBER",
    BOOLEAN: "BOOLEAN",
    OBJECT: "OBJECT",
    ARRAY: "ARRAY"
}

const JS_TYPE = {
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "boolean",
    OBJECT: "object",
    ARRAY: "array"
}

const ftj = new Map([
    [FIELD_TYPE.STRING, JS_TYPE.STRING],
    [FIELD_TYPE.NUMBER, JS_TYPE.NUMBER]
    [FIELD_TYPE.BOOLEAN, JS_TYPE.BOOLEAN]
    [FIELD_TYPE.OBJECT, JS_TYPE.OBJECT]
    [FIELD_TYPE.ARRAY, JS_TYPE.ARRAY]
])

const jtf = new Map([
    [JS_TYPE.STRING, FIELD_TYPE.STRING],
    [JS_TYPE.NUMBER, FIELD_TYPE.NUMBER]
    [JS_TYPE.BOOLEAN, FIELD_TYPE.BOOLEAN]
    [JS_TYPE.OBJECT, FIELD_TYPE.OBJECT]
    [JS_TYPE.ARRAY, FIELD_TYPE.ARRAY]
])

/**
 * Convert catalogg field type to native js type.
 * @param {FIELD_TYPE} fieldType 
 * @returns {JS_TYPE}
 */
const fieldTypeToJsType = (fieldType) => {
    //Ensure given field type exists.
    if (!ftj.has(fieldType)) {
        throw new Error(
            `catalogg field type to js type conversion ` +
            `error: Field type "${fieldType}" does not ` +
            `exist.`
        )
    }
    //
    return ftj.get(fieldType)
}

/**
 * Convert native js type to catalogg field type.
 * @param {JS_TYPE} jsType 
 * @returns {FIELD_TYPE}
 */
const jsTypeToFieldType = (jsType) => {
    //Ensure a conversion for given js type exists.
    if (!jtf.has(jsType)) {
        throw new Error(
            `catalogg js type to field type conversion ` +
            `error: No conversion exists for js type ` +
            `"${jsType}".`
        )
    }
    //
    return jtf.get(jsType)
}

exports.FIELD_TYPE = FIELD_TYPE
exports.JS_TYPE = JS_TYPE
exports.fieldTypeToJsType = fieldTypeToJsType
exports.jsTypeToFieldType = jsTypeToFieldType

///////////
///////////


///////////
///////////

/**
 * Create a catalogg field object.
 * @param {FIELD_TYPE} fieldType catalogg data type
 * @param {*} fieldData Native js data type must match field type
 */
const createField = (fieldType, fieldData) => {
    const creationErr = (msg) => new Error(
        `catologg field creation error: ${msg}`
    )
    //Ensure supplied field type exists.
    if (!FIELD_TYPE.includes(fieldType)) {
        throw creationErr(
            `Field type "${fieldType}" does not exist`
        )
    }
    //Ensure supplied data matches required type.
    const jsType = fieldTypeToJsType(fieldType)
    if (typeof fieldData !== jsType) {
        throw creationErr(
            `Field data's js type "${jsType}" does ` +
            `not match given field type "${fieldType}".`
        )
    }
    //Create and return field object.
    const field = {
        type: fieldType,
        data: fieldData
    }
    return field
}

const validateField = (field, fieldValidator=()=>true) => {
    const fieldJson = JSON.stringify(field)
    const validationErr = (msg) => new Error(
        `catalogg field validation error: ${msg}\n` +
        `${fieldJson}`
    )
    //Check that field has only 2 properties
    const properties = Object.keys(field)
    const propertyCount = properties.length
    if (propertyCount !== 2) {
        throw validationErr(
            `Field object has ${propertyCount} properties, ` +
            `expected 2.`
        )
    }
    //Check that field has "type" and "data" properties.
    if (!properties.includes("type")) {
        throw validationErr(
            `Field object does not have a "type" property.`
        )
    }
    if (!properties.includes("data")) {
        throw validationErr(
            `Field object does not have a "data" property.`
        )
    }
    //Check that js type of field data matches field type.
    const jsType = fieldTypeToJsType(field.type)
    if (typeof field.data !== jsType) {
        throw validationErr(
            `Js type "${jsType}" of field's "data" property ` 
            `does not match its field type "${fieldType}".`
        )
    }
    //Run field validator.
    //If throws error, pass forward.
    //If returns false, null, or otherwise not true, throw error.
    try {
        const result = fieldValidator(field)
        if (result === false) {
            throw validationErr(
                `Field validator returned false.`
            )
        }
        if (result === null) {
            throw validationErr(
                `Field validator returned null.`
            )
        }
        if (typeof result !== true) {
            throw validationErr(
                `Field validator did not return true.`
            )
        }
    } catch (err) {
        throw validationErr(err.message)
    }
}