console.log("router loaded");

// Constants
const beforeLogin = {
  home: { path: "/", text: "Home" },
  cards: { path: "/cards", text: "Cards" },
  invite: { path: "/invite", text: "Invite" },
  discord: { path: "/discord", text: "Discord" },
  info: { path: "/info", text: "Info" },
};

const afterLogin = {
  home: { path: "/", text: "Home" },
  invite: { path: "/invite", text: "Invite" },
  discord: { path: "/discord", text: "Discord" },
  info: { path: "/info", text: "Info" },
  inventory: { path: "/inventory", text: "Inventory" },
  chat: { path: "/chat", text: "Chat" },
};

const filePaths = {
  home: "./pages/homepage.html",
  cards: "./pages/cards.html",
  invite: "./pages/invite.html",
  discord: "./pages/discord.html",
  info: "./pages/info.html",
  inventory: "./pages/inventory.html",
  chat: "./pages/chat.html"
};

// DOM elements
const linkWrapper = document.querySelector('.navigation_link');
const root = document.getElementById('root');

// Set your login status on this variable
let isLoggedIn = false;
const currentLinks = isLoggedIn ? afterLogin : beforeLogin;

// Render navigation links
const routeRenderer = () => {
  let routeString = ``;
  Object.values(currentLinks).forEach((pathObj) => {
    routeString += `<a href="${pathObj.path}" data-route>${pathObj.text}</a>`;
  });
  linkWrapper.innerHTML = routeString;
};

// Fetch and load content
const fetchPage = async (path) => {
  try {
    const response = await fetch(filePaths[path]);
    if (response.ok) {
      const html = await response.text();
      root.innerHTML = html;
    } else {
      root.innerHTML = "<h1>404 Not Found</h1>";
    }
  } catch (error) {
    root.innerHTML = "<h1>Error Loading Content</h1>";
  }
};

// Router function
const router = (path) => {
  fetchPage(path);
  history.pushState({}, "", path);
};

// Handle link clicks
linkWrapper.addEventListener('click', (event) => {
  if (event.target.matches('[data-route]')) {
    event.preventDefault();
    const path = event.target.getAttribute('href').substring(1); // Remove leading slash
    router(path);
  }
});

// Listen to navigation events
window.addEventListener("popstate", () => {
  const path = window.location.pathname.substring(1); // Remove leading slash
  fetchPage(path);
});

document.addEventListener("DOMContentLoaded", () => {
  routeRenderer();
  const path = window.location.pathname.substring(1) || "home";
  fetchPage(path);
});
