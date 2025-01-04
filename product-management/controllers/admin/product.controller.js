const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const { query } = require("express");
const searchHelper = require("../../helpers/search");

module.exports.index = async (req, res) => {
  // Truyền filterStatus từ helpers qua !

  let filterStatus = filterStatusHelper(req.query);

  // Lấy ra các bản ghi có deleted = false
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Điều kiện tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Hàm đợi lấy data từ database
  const products = await Product.find(find);
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
