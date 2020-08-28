const { createArchetype } = require("aarketype");
const { FIELD_TYPE } = require("ffield")


/////////////
/////////////


const basketArchetype = createArchetype(
    "__basket",
    {
        itemSelections: FIELD_TYPE.ARRAY
    }
)


/////////////
/////////////


exports.basketArchetype = basketArchetype