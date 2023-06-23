const mongoose = require("mongoose");
const express = require("express");


const cors = require("cors");

const uri = "mongodb://127.0.0.1:27017/nailshop";
const app = express();

const home = require("./routes/home");
const allProducts = require('./routes/allproducts')
const hotproducts = require('./routes/hotproducts')
const uploadproduct = require('./routes/uploadproduct')
const product = require('./routes/product')
const ad = require('./routes/admin')
const order = require('./routes/order')
const updateOrders = require('./routes/updateOrders')
const cancelOrder = require('./routes/cancelOrder')
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(express.json());
app.use(express.static("public"));

async function Connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to mongo db");

    app.use("/", home);

    app.use('/allproducts', allProducts)

    app.use('/hotproducts', hotproducts)

    app.use('/uploadproduct', uploadproduct)

    app.use('/product', product)

    app.use('/admin', ad)



    app.use('/order', order)

    app.use('/updateOrders', updateOrders)



    app.use('/cancelOrder', cancelOrder)

    const port = 5000;
    app.listen(port, () => {
      console.log(`App listening in port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

Connect();
