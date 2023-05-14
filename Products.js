const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  idProduct: String,
  name: String,
  price: Number,
  sale: Number,
  type: String,
  hot: Boolean,
  status: String,
  description: String,
  images: [String],
});

module.exports = mongoose.model("products", productSchema);
