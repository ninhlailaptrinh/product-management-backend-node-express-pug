// Button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    let url = new URL(location.href);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      location.href = url.href;
    });
  });
}

// Form search

const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault(); // không reload trang khi bấm nút tìm

    const keyword = e.target.elements.keyword.value.trim();

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    location.href = url.href;
  });
}
