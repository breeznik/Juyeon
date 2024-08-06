console.log("router loaded");

// Constants
const beforeLogin = {
  home: { path: "/", text: "Home" },
  cards: { path: "/cards", text: "Cards" },
  invite: { path: "/invite", text: "Invite" },
  discord: { path: "/discord", text: "Discord" },
  info: { path: "/Info", text: "Info" },
};

const afterLogin = {
  home: { path: "/", text: "Home" },
  invite: { path: "/invite", text: "Invite" },
  discord: { path: "/discord", text: "Discord" },
  info: { path: "/Info", text: "Info" },
  inventory: { path: "/inventory", text: "Inventory" },
  chat: { path: "/chat", text: "Chat" },
};

const filePaths = {
  home: "/",
  cards: "./cards.html",
  invite: "/",
  discord: "/",
  info: "/",
  inventory: "./inventory.html",
  chat: "./chat.html",
};
const logStatsuConst = {
  login: "Login",
  logout: "Logout",
};

// DOM elements
const linkWrapper = document.querySelector(".navigation_link");
const ResponsiveLinkWrapper = document.querySelector(".responsive_navlinks");
const loginButton = document.querySelector(".login");
const ResponsiveLoginButton = document.querySelector(".responsive_login");


// Set your login status on this variable
let user = localStorage.getItem("user");
let isLoggedIn = user ? true : false;
let currentLinks = isLoggedIn?.session ? afterLogin : beforeLogin;

// Render navigation links
const routeRenderer = () => {
  let routeString = ``;
  Object.keys(currentLinks).forEach((pathKey) => {
    routeString += `<a href="${filePaths[pathKey]}">${currentLinks[pathKey].text}</a>`;
  });
  linkWrapper.innerHTML = routeString;
  ResponsiveLinkWrapper.innerHTML = routeString;
};

const refresher = () => {
  user = localStorage.getItem("user");
  isLoggedIn = user ? true : false;
  currentLinks = isLoggedIn ? afterLogin : beforeLogin;
  console.log(user);
};

const loginChecker = () => {
  if (isLoggedIn) {
    localStorage.clear();
    console.log("user logged out");
  } else {
    // run login code
    localStorage.setItem("user", `{ session: true }`);
  }
};
const logginerToggler = () => {
  if (isLoggedIn) {
    loginButton.innerText = logStatsuConst.logout;
    ResponsiveLoginButton.innerText = logStatsuConst.logout;
  } else {
    loginButton.innerText = logStatsuConst.login;
    ResponsiveLoginButton.innerText = logStatsuConst.login;
  }
};
const login = () => {
  loginButton.addEventListener("click", () => {
    // update
    loginChecker();
    refresher();
    
    // render
    routeRenderer();
    logginerToggler();
  });
  ResponsiveLoginButton.addEventListener('click' , () =>{
    // update
    loginChecker();
    refresher();
    
    // render
    routeRenderer();
    logginerToggler();
  })
  //initial render
  refresher();
  logginerToggler();
  routeRenderer();
};

document.addEventListener("DOMContentLoaded", () => {
  login();
});
