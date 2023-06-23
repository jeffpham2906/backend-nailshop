const express = require('express')
const product = express.Router()
const Products = require("../Products");

product.delete("/product/:idProduct", async (req, res) => {
    const idProduct = req.params.idProduct;

    await Products.deleteOne({ idProduct });
    res.json({ status: "OK", idProduct });
});

module.exports = product