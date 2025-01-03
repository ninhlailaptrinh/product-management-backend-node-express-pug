// Button status

const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    let url = new URL(window.location.href);
    console.log(url);
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      console.log(status);
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
