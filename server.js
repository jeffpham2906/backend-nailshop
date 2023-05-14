const mongoose = require("mongoose");
const express = require("express");
const { uploadMiddleware } = require("./middleware/multerMiddleware");

const cors = require("cors");
const User = require("./User");
const Products = require("./Products");
const uri = "mongodb://127.0.0.1:27017/nailshop";
const app = express();
app.use(cors());

app.use(express.static("public"));

async function Connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongo db");

    app.get("/", async (req, res) => {
      const user = await User.create({ name: "Dung", age: 22 });
      const allUsers = await User.find();
      res.json({ message: "hello" });
    });

    app.get("/allproducts", async (req, res) => {
      const allProducts = await Products.find();
      res.send(allProducts);
    });

    app.post("/uploadproduct", uploadMiddleware.any(), async (req, res) => {
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

      res.json({ status: "OK", data, image: files });
    });

    app.delete("/product/:idProduct", async (req, res) => {
      const idProduct = req.params.idProduct;
      console.log(idProduct);
      await Products.deleteOne({ idProduct });
      res.json({ status: "OK" });
    });

    app.get("/uploadproduct", async (req, res) => {
      const data = await Products.find();
      res.json({ status: "OK", data: data });
    });

    const port = 5000;
    app.listen(port, () => {
      console.log(`App listening in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

Connect();
