const mongoose = require("mongoose");
const express = require("express");
const { uploadMiddleware } = require("./middleware/multerMiddleware");

const cors = require("cors");
const admin = require("./admin");
const Products = require("./Products");
const Orders = require("./Orders");
const uri = "mongodb://127.0.0.1:27017/nailshop";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

async function Connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongo db");

    app.get("/", async (req, res) => {
      res.json({ message: "hello" });
    });

    app.get("/allproducts", async (req, res) => {
      const allProducts = await Products.find();
      res.json({ status: "OK", data: allProducts });
    });

    app.get("/hotproducts", async (req, res) => {
      const hotproducts = await Products.find({ hot: "true" });
      res.json({ status: "OK", data: hotproducts });
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

      res.json({ status: "OK", newProduct, image: files });
    });
    app.put("/uploadproduct", uploadMiddleware.any(), async (req, res) => {
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

    app.delete("/product/:idProduct", async (req, res) => {
      const idProduct = req.params.idProduct;

      await Products.deleteOne({ idProduct });
      res.json({ status: "OK", idProduct });
    });

    app.get("/uploadproduct", async (req, res) => {
      const data = await Products.find();
      res.json({ status: "OK", data: data });
    });

    app.post("/admin", uploadMiddleware.any(), async (req, res) => {
      const data = req.body;

      const infor = await admin.find();

      if (infor[0].username === data.username) {
        if (infor[0].password === data.password) res.json({ status: "OK" });
        else res.json({ status: "Failed" });
      } else res.json({ status: "Failed" });
    });

    app.post("/order", async (req, res) => {
      const data = req.body;
      const currentDate = new Date();

      const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)
      const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, add 1 to match the actual month)
      const currentYear = currentDate.getFullYear(); // Get the current four-digit year
      const currentHours = currentDate.getHours(); // Get the current hours (0-23)
      const currentMinutes = currentDate.getMinutes(); // Get the current minutes (0-59)
      const currentSeconds = currentDate.getSeconds(); // Get the current seconds (0-59)
      data.times = `${currentDay}/${currentMonth}/${currentYear} ${currentHours}:${currentMinutes}:${currentSeconds}`;
      console.log(data);
      await Orders.create(data);
      res.json({ status: "OK" });
    });

    app.get("/orders", async (req, res) => {
      const data = await Orders.find();
      res.json({ status: "OK", data });
    });

    app.post("/updateOrders/:id", async (req, res) => {
      const idOrder = req.params.id;
      await Orders.updateOne(
        { _id: idOrder },
        {
          $set: {
            status: "accepted",
          },
        }
      );
      res.json({ status: "OK" });
    });

    app.post("/cancelOrder/:id", async (req, res) => {
      const orderId = req.params.id;
      await Orders.updateOne(
        { _id: orderId },
        {
          $set: {
            status: "cancel",
          },
        }
      );
      res.json({ status: "OK" });
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
