
// navigation variables
const menu = document.querySelector(".navigation_toggler");
const close = document.querySelector('.close')
const reponsiveNav = document.querySelector(".responsive_naviagation");

const toggler = (selectedElement) => {
  if (selectedElement.classList.contains("active")) {
    selectedElement.classList.remove("active");
  } else {
    selectedElement.classList.add("active");
  }
};

const index_toggleHandler = (element) => {
  const selectedElement = document.querySelector(element);
  selectedElement.addEventListener("click", () => toggler(selectedElement));
};

document.addEventListener("DOMContentLoaded", () => {
  menu.addEventListener("click", () => toggler(reponsiveNav));
  close.addEventListener("click", () => toggler(reponsiveNav));
});


