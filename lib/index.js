const { createArchetype, validateArchetype } = require("./archetype");
const { createItem, validateItem } = require("./item");
const { includes } = require("./misc") 


module.exports = [
    //Archetype
    createArchetype,
    validateArchetype,
    //Item
    createItem,
    validateItem,
    //Misc
    includes
]