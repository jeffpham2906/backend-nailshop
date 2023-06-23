const express = require('express')
const allproducts = express.Router()
const Products = require("../Products");

allproducts.get("/allproducts", async (req, res) => {
    const allProducts = await Products.find();
    res.json({ status: "OK", data: allProducts });
});

module.exports = allproducts