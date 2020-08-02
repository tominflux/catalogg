
const traverseThroughStocks = (item, fn) => {
    if (item.variationFactors === null) {
        fn({})
    }
    const traverse = (variationFactors, accumFactors={}) => {
        //Get keys of variation factors.
        const keys = Object.keys(variationFactors)
        //Check if theres any variation factors left to traverse.
        if (keys.length === 0) {
            //If not, then call the callback function
            fn(accumFactors)
            return
        }
        //Remove one key.
        const remainingKeys = [...keys]
        const currentKey = remainingKeys.splice(0, 1)
        //Rebuild remaining variation factors.
        let _remainingVariationFactors = {}
        for (const key of remainingKeys) {
            _remainingVariationFactors = {
                ..._remainingVariationFactors,
                [key]: variationFactors[key]
            }
        } 
        const remainingVariationFactors = _remainingVariationFactors
        //Get current variation factor.
        const variationFactor = variationFactors[currentKey]
        //Iterate through each variation
        //(E.g: sm, md, lg)
        for (const variation of variationFactor) {
            //Add variation to next factors.
            const nextFactors = {
                ...accumFactors,
                [currentKey]: variation.data
            }
            //Traverse further
            traverse(remainingVariationFactors, nextFactors)
        }
    }
    traverse(item.variationFactors)
}

const genVariationObjs = (item) => {
    const variationObjs = []
    traverseThroughStocks(item, (obj) => variationObjs.push(obj))
    return variationObjs
}

exports.genVariationObjs = genVariationObjs