const fs = require("fs-extra")
const { defaultOptions } = require("./defaultOptions")


const createCatologue = (
    collections,
    archetypes,
    options={}
) => {
    const compositeOptions = {
        ...defaultOptions,
        ...options
    }
}

const validateCatalogue = () => {}


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