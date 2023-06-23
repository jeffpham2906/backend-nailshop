const express = require('express')
const hotproducts = express.Router()
const Products = require("../Products");
hotproducts.get("/hotproducts", async (req, res) => {
    const hotproducts = await Products.find({ hot: "true" });
    return res.status(200).json({ status: "OK", data: hotproducts });
});


module.exports = hotproducts