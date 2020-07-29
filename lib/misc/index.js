
const includes = (obj, val) => {
    for (const key in obj) {
        if (obj[key] === val) {
            return true
        }
    }
    return false
}

exports.includes = includes