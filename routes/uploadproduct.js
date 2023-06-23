const express = require('express')
const uploadproduct = express.Router()
const { uploadMiddleware } = require("../middleware/multerMiddleware");
const Products = require("../Products");

uploadproduct.post("/uploadproduct", uploadMiddleware.any(), async (req, res) => {
    const files = req.files;
    const arrImages = files.map((file) => file.filename);
    const data = req.body;
    const newProduct = {
        idProduct: data.idProduct,
        name: data.name,
        price: data.price,
        sale: data.sale,
        type: data.type,
        hot: data.hot,
        status: data.status,
        description: data.description,
        images: arrImages,
    };

    await Products.create(newProduct);

    res.json({ status: "OK", newProduct, image: files });
});

uploadproduct.put("/uploadproduct", uploadMiddleware.any(), async (req, res) => {
    const data = req.body;
    console.log(data);
    files = req.files;
    const pastImgs = data.pastImgs.length > 0 ? data.pastImgs.split(",") : [];

    files.forEach((file) => pastImgs.push(file.filename));

    const editedProduct = {
        idProduct: data.idProduct,
        name: data.name,
        price: data.price,
        sale: data.sale,
        type: data.type,
        hot: data.hot,
        status: data.status,
        description: data.description,
        images: pastImgs,
    };

    await Products.replaceOne({ idProduct: data.idProduct }, editedProduct);
    res.json({
        status: "OK",
        editedProduct: {
            hot: data.hot === "true" ? true : false,
            ...editedProduct,
        },
    });
});


uploadproduct.get("/uploadproduct", async (req, res) => {
    const data = await Products.find();
    res.json({ status: "OK", data: data });
});

module.exports = uploadproduct