const { lockItem } = require("@x-logg/util")


////////////////
////////////////


const postBasket = async (req, res, next) => {
    const userId = req.params.uid
    //
    await req.catalogg.createBasket(userId)
    //
    res.send()
}

const getBasket = async (req, res, next) => {
    const userId = req.params.uid
    //
    const basket = await req.catalogg.readBasket(userId)
    //
    const lockedBasket = lockItem(basket)
    //
    res.json(lockedBasket)
}

const putBasket = async (req, res, next) => {
    const userId = req.params.uid
    //
    const itemSelections = req.body.itemSelections
    //
    await req.catalogg.updateBasket(userId, itemSelections)
    //
    res.send()
}

const deleteBasket = async (req, res, next) => {
    const userId = req.params.uid
    //
    await req.catalogg.deleteBasket(userId)
    //
    res.send()
}


////////////////
////////////////


const serveBasketApi = (router) => {
    router.post(
        "/basket/:uid",
        postBasket
    )
    router.get(
        "/basket/:uid",
        getBasket
    )
    router.put(
        "/basket/:uid",
        putBasket
    )
    router.delete(
        "/basket/:uid",
        deleteBasket
    )
}

exports.serveBasketApi = serveBasketApi