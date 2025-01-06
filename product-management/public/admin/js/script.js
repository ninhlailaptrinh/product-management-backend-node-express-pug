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

// checkbox all
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  // Lấy checkbox "Chọn tất cả"
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  // Lấy tất cả các checkbox có name="id"
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']");

  // Xử lý sự kiện khi click vào checkbox "Chọn tất cả"
  inputCheckAll.addEventListener("click", () => {
    // Duyệt qua từng checkbox và đặt trạng thái của chúng giống với checkbox "Chọn tất cả"
    inputIds.forEach((input) => {
      input.checked = inputCheckAll.checked;
    });
  });

  // Xử lý sự kiện khi click vào từng checkbox
  inputIds.forEach((input) => {
    input.addEventListener("click", () => {
      // Đếm số lượng checkbox đã được chọn
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked",
      ).length;

      // Nếu tất cả các checkbox đều được chọn, đánh dấu checkbox "Chọn tất cả"
      if (countChecked === inputIds.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

// Form change multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked",
    );

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputChecked.forEach((input) => {
        const id = input.value;
        ids.push(id);

        inputIds.value = ids.join(", ");

        formChangeMulti.submit();
      });
    } else {
      alert("Vui lòng chọn ít nhất 1 sản phẩm!");
    }
  });
}

// delete item

const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-status");
  const path = formDeleteItem.getAttribute("data-path");
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("DELETE");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
