console.log('router loaded');

const routeList = {
  beforeLogin: {
    "/": { file: "./fetch_test/home.html", text: "Home" },
    "/invite-juyoen": { file: "./fetch_test/invite-juyoen.html", text: "Invite Juyoen" },
    "/discord": { file: "./fetch_test/discord.html", text: "Discord" },
  },
  afterLogin: {
    "/": { file: "./fetch_test/home.html", text: "Home" },
    "/invite-juyoen": { file: "./fetch_test/invite-juyoen.html", text: "Invite Juyoen" },
    "/discord": { file: "./fetch_test/discord.html", text: "Discord" },
    "/inventory": { file: "./fetch_test/inventory.html", text: "Inventory" },
    "/chat": { file: "./fetch_test/chat.html", text: "Chat" },
  },
};

//set you login status on this variable
let isLoggedIn = false;
const currentPath = isLoggedIn ? routeList.afterLogin : routeList.beforeLogin;

//will change routes based on login status
const routeGenrator = (loggedIn) => {
  let routeString = ``;
  let routeObj = loggedIn ? routeList.afterLogin : routeList.beforeLogin;

  Object.keys(routeObj).forEach((key) => {
    routeString =
      routeString + `<a href="${key}" data-route>${routeObj[key].text}</a>`;
  });

  return routeString;
};

//will fill the routes in navbar
const updateNavigation = () => {
  const navigation_link = document.querySelector(".navigation_link");
  const navItems = routeGenrator(isLoggedIn);
  navigation_link.innerHTML = navItems;
};

const checkLoginState = () => {
  isLoggedIn = true 
  updateNavigation();
};

// Load content function
const fetchPage = async (path) => {
  const content = document.querySelector("main");
  try {
    const response = await fetch(currentPath[path].file);
    if (response.ok) {
      const html = await response.text();
      content.innerHTML = html;
    } else {
      content.innerHTML = "<h1>404 Not Found</h1>";
    }
  } catch (error) {
    content.innerHTML = "<h1>Error Loading Content</h1>";
  }
};

// Router function
const router = () => {
  const path = window.location.pathname;
  fetchPage(path);
};

// Listen to navigation events
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {  
});
