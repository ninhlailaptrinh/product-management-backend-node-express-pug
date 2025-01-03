const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status,
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }
  // Lấy ra các bản ghi có deleted = false
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  // Điều kiện tìm kiếm
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i"); // Tìm kiếm không phân biệt chữ hoa thường
    find.title = regex;
  }
  // Hàm đợi lấy data từ database
  const products = await Product.find(find);

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
  });
};
