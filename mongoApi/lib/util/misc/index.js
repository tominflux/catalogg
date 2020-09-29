

const apiErr = (msg) => new Error(
    `Catalogg MongoDB API Error: ${msg}`
)

exports.apiErr = apiErr