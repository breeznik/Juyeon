//constants
const paginationAction = { inc: "inc", dec: "dec" };

//variables
const pagination_wrapper = document.querySelector(".pagination-wrapper");
const pageNum_Wrapper = document.querySelector(".numbers-wrapper");
const totalPage = pageNum_Wrapper.children.length;
const forward = document.querySelector(".forward-icon");
const backward = document.querySelector(".backward-icon");
let pageNumber = 0;
let touchStartX_is = 0;
let touchDragX_is = 0;

const toggleHandler = (element) => {
  const selectedElement = document.querySelector(element);
  selectedElement.addEventListener("click", () => {
    if (selectedElement.classList.contains("active")) {
      selectedElement.classList.remove("active");
    } else {
      selectedElement.classList.add("active");
    }
  });
};

const menuToggler = () => {
  const menu = document.querySelector(".menu-button");
  const settings = document.querySelector(".settings-wrapper");
  const media = document.querySelector('.media-section')
  menu.addEventListener("click", () => {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      settings.classList.remove("active");
      media.style.opacity = '1';
      media.style.filter = 'none';
    } else {
      menu.classList.add("active");
      settings.classList.add("active");
      media.style.opacity = '0.3';
      media.style.filter = 'blur(10px)';
    }
  });
};

const wheelHandler = (actionType = paginationAction.inc) => {
  if (actionType === paginationAction.inc && pageNumber !== totalPage - 1) {
    //remove previose active
    pageNum_Wrapper.children[pageNumber].classList.remove("active");
    //activate next number
    pageNum_Wrapper.children[pageNumber + 1].classList.add("active");
    pageNumber++;
  } else if (actionType === paginationAction.dec && pageNumber !== 0) {
    //remove current active
    pageNum_Wrapper.children[pageNumber].classList.remove("active");
    //activate previouse number
    pageNum_Wrapper.children[pageNumber - 1].classList.add("active");
    pageNumber--;
  }
  const childOffsetWidth = pageNum_Wrapper.children[pageNumber].offsetWidth;

  pageNum_Wrapper.style.transform = `translateX(-${
    pageNumber * childOffsetWidth
  }px)`;
};
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
const playback = () => {
  forward.addEventListener("click", debounce(() => {
    // pageNumber = totalPage - 2;
    wheelHandler();
  } , 50));
  backward.addEventListener("click", debounce(() => {
    // pageNumber = 1;
    wheelHandler(paginationAction.dec);
  } , 50));
};

// const dragHandler = () => {
//   pagination_wrapper.addEventListener("touchstart", (event) => {
//     // console.log("touch start", event.touches[0]);
//     touchStartX_is = event.touches[0].clientX;
//     // console.log(touchStartX_is  , touchDragX_is ,  'hello')
//   });
//   pagination_wrapper.addEventListener("touchmove", (event) => {
//     // console.log("touch drag", event.touches[0]);
//     touchDragX_is = event.touches[0].clientX;
//     console.log("tochdrag : ", touchDragX_is, "tochstart :", touchStartX_is);
//     if (Math.abs(touchStartX_is - touchDragX_is) > 100) {
//       if (touchStartX_is > touchDragX_is) {
//         wheelHandler();
//       } else if (touchStartX_is < touchDragX_is) {
//         wheelHandler(paginationAction.dec);
//       }
//     }
//   });

//   // if (touchStartX_is > touchDragX_is) {
//   //   wheelHandler();
//   // } else if (touchStartX_is < touchDragX_is) {
//   //   wheelHandler(paginationAction.dec);
//   // }

//   // pagination_wrapper.addEventListener("touchend", () =>{
//   //   touchDragX_is = 0;
//   //   touchStartX_is = 0;
//   // })
// };

document.addEventListener("DOMContentLoaded", () => {
  toggleHandler(".boost-card");
  toggleHandler(".boost_mode_wrapper");
  menuToggler();
  pagination_wrapper.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      console.log("increment hit");
      wheelHandler();
    } else {
      console.log("decrement hit");
      wheelHandler(paginationAction.dec);
    }
  });

  // dragHandler();
  playback();
});
