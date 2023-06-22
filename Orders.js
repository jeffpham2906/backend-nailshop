const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderId: String,
  name: String,
  phone: String,
  diachi: String,
  city: String,
  ghichu: String,
  status: String,
  quanhuyen: String,
  orders: [
    {
      id: String,
      img: String,
      name: String,
      size: String,
      form: String,
      quantity: Number,
      price: Number,
      sale: Number,
    },
  ],
  times: String,
});

module.exports = mongoose.model("orders", orderSchema);
