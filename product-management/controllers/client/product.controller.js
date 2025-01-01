const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({});

  console.log(products);
  console.log("Sản phẩm : ", products.length);

  res.render("client/pages/products/index", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
  });
};
