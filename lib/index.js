const fs = require("fs-extra")
const { createField, FIELD_TYPE } = require("ffield")
const { defaultOptions } = require("./defaultOptions")


const createCatologue = (
    name,
    collections,
    archetypes,
    options={}
) => {
    const compositeOptions = {
        ...defaultOptions,
        ...options
    }

    return {
        name: createField(FIELD_TYPE.STRING, name),
        collections,
        archetypes,
        archetypeMap: new Map()
    }
}

const validateCatalogue = () => {
    //Ensure all collections have same archetypes

}


//
/*
const setCollections = (collections) => {
    
}

const getCollections = () => {
    
}

const validateCollections = () => {}

//

const constructCollections = () => {}

const modifyCollections = () => {}

const destroyCollections = () => {}
*/