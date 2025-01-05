const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
<<<<<<< HEAD
const paginationHelper = require("../../helpers/pagination");
||||||| parent of 9684e7a (Cập nhập chức năng thay đổi trạng thái hoạt động)
=======
const paginationHelper = require("../../helpers/pagination");
const { request } = require("express");
>>>>>>> 9684e7a (Cập nhập chức năng thay đổi trạng thái hoạt động)

module.exports.index = async (req, res) => {
  // Lấy trạng thái lọc từ helper
  const filterStatus = filterStatusHelper(req.query);

  // Điều kiện mặc định để lấy các sản phẩm chưa bị xóa
  let find = {
    deleted: false,
  };

  // Thêm điều kiện lọc theo trạng thái nếu có
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Thêm điều kiện tìm kiếm nếu có
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }

  // Đếm tổng số sản phẩm phù hợp với điều kiện tìm kiếm
  const countProducts = await Product.countDocuments(find);

  // Thiết lập phân trang
  const objectPagination = paginationHelper(
    {
      currentPage: 1, // Trang mặc định
      limitItem: 4, // Số sản phẩm mỗi trang
    },
    req.query,
    countProducts,
  );

  // Lấy danh sách sản phẩm với điều kiện tìm kiếm và phân trang
  const products = await Product.find(find)
    .skip(objectPagination.skip) // Bỏ qua các sản phẩm trước đó
    .limit(objectPagination.limitItem); // Giới hạn số sản phẩm trên mỗi trang

  // Render trang và truyền dữ liệu
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm", // Tiêu đề trang
    products: products, // Danh sách sản phẩm
    filterStatus: filterStatus, // Trạng thái lọc
    keyword: objectSearch.keyword, // Từ khóa tìm kiếm
    pagination: objectPagination, // Thông tin phân trang
  });
};

// Router change-status
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  res.redirect("back"); // chuyển hướng lại về trang admin/products sau khi chuyển trạng thái
};
