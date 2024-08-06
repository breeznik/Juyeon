// variables
const accordians = document.querySelectorAll(".accordian");

const accordianToggler = (accordian) => {
  if (accordian.classList.contains("active")) {
    accordian.classList.remove("active");
  } else {
    accordian.classList.add("active");
  }
};

const accordianHandler = () => {
  accordians.forEach((accordian) => {
    accordian.children[0].addEventListener("click", () => accordianToggler(accordian));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  accordianHandler();
});
