const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  thumbnail: String,
  stock: Number,
  status: String,
  position: Number,
  deleted: Boolean,
  deleteAt: Date,
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
