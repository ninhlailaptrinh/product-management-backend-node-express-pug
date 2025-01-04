module.exports = (query) => {
  let objectSearch = {
    keyword: "",
  };

  if (query.keyword && query.keyword.trim().length > 0) {
    objectSearch.keyword = query.keyword.trim();

    const regex = new RegExp(objectSearch.keyword, "i"); // Tìm kiếm không phân biệt chữ hoa thường
    objectSearch.regex = regex;
  }
  return objectSearch;
};
