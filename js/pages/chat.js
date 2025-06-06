const messageArray = [];

const sampleObj = {
  fromUser: true,
  message: "hello",
};
// message functions

//placeholder
const placeHolder_handler = (inputDiv, input_placheholder) => {
  const messagelength = inputDiv.textContent.length;

  // console.log(inputDiv.textContent.length, inputDiv.textContent[0]);
  if (messagelength > 0) {
    input_placheholder.style.display = "none";
  } else {
    input_placheholder.style.display = "inline";
  }
};

const chatInputHandler = () => {
  const inputDiv = document.querySelector(".input_div");
  const input_placheholder = document.querySelector(".input_placeholder");
  const descDiv = document.querySelector(".description_div");
  const descPlaceHolder = document.querySelector(".desc_placeholder");

  inputDiv.addEventListener("input", () => {
    placeHolder_handler(inputDiv, input_placheholder);
  });
  descDiv.addEventListener("input", () => {
    placeHolder_handler(descDiv, descPlaceHolder);
  });

  inputDiv.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      //line change handler
      // const enterEvent = new KeyboardEvent("keydown", {
      //   key: "Enter",
      //   keyCode: 13,
      //   code: "Enter",
      //   which: 13,
      //   shiftKey: false,
      //   ctrlKey: false,
      //   metaKey: false,
      // });
      // inputDiv.dispatchEvent(enterEvent);
      // inputDiv.innerHTML += '<br>';

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      // const inputContent = inputDiv.textContent.trim();
      const inputContent = inputDiv.innerHTML;
      if (inputContent.length > 0) {
        sampleObj.message = inputContent;
        if (messageArray.length > 0) {
          const toggler = messageArray[messageArray.length - 1].fromUser;
          sampleObj.fromUser = !toggler;
          console.log(toggler, "printing toggerle");
        }
        messageArray.push(sampleObj);
        postMessageRerenderer();
        inputDiv.textContent = "";
      }
    }
  });
};

const messageDivGenrator = (messageObj) => {
  console.log(messageObj);
  const newMessage = document.createElement("div");
  newMessage.className = `message-wrapper d-flex ${
    messageObj.fromUser ? "from-user" : "to-user"
  } color-lightgray`;
  const formattedMessage = messageObj.message.replace(/\n/g, "<br>");
  if (messageObj.fromUser) {
    console.log("from user");
    newMessage.innerHTML = `
    <div class="info">
      <div class="username">Breez_nik</div>
      <div class="message rounded-m">${formattedMessage}</div>
    </div>
    <div class="profile">
      <img src="/assets/profile.png" alt="profile" />
    </div>
  `;
  } else {
    newMessage.innerHTML = `<div class="profile">
    <img src="/assets/profile.png" alt="profile" />
  </div>
  <div class="info">
    <div class="username">Breez_nik</div>
    <div class="message rounded-m btn-purple color-white">
    ${formattedMessage}
    </div>
  </div>`;
  }
  return newMessage;
};

const initialMessageRenderer = () => {
  const messages = document.querySelector(".messages");
  const chat_top = document.querySelector(".chat").firstElementChild;

  messageArray.forEach((message) => {
    const newMessage = messageDivGenrator(message);
    messages.appendChild(newMessage);
  });
  chat_top.scrollTop = chat_top.scrollHeight;
};

const postMessageRerenderer = () => {
  const messages = document.querySelector(".messages");
  const chat_top = document.querySelector(".chat").firstElementChild;
  const recentMessage = messageArray[messageArray.length - 1];
  const newMessage = messageDivGenrator(recentMessage);
  messages.appendChild(newMessage);
  console.log(chat_top);
  chat_top.scrollTop = chat_top.scrollHeight;
};

const settingsToggler = () => {
  const ps_icon = document.querySelector(".ps_button");
  const ps_settings = document.querySelector(".profile_settings");
  const btns = document.querySelector(".buttons");
  const toggler = () => {
    if (ps_settings.classList.contains("profile_settings_active")) {
      console.log("removed");
      ps_settings.classList.remove("profile_settings_active");
    } else {
      console.log("added");
      ps_settings.classList.add("profile_settings_active");
    }
  };
  ps_icon.addEventListener("click", toggler);
  btns.addEventListener("click", toggler);
};

const genreateTypingIndicator = () => {
  const indicator = document.createElement("div");
  indicator.classList.add("typing_user", "message-wrapper", "d-flex", "from-user", "color-lightgray");
  indicator.innerHTML = `<div class="info">
                    <div class="username">Breez_nik</div>
                    <div class="message rounded-m flex-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50px"
                        height="20px"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="18" cy="12" r="0" fill="currentColor">
                          <animate
                            attributeName="r"
                            begin=".67"
                            calcMode="spline"
                            dur="1.5s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle cx="12" cy="12" r="0" fill="currentColor">
                          <animate
                            attributeName="r"
                            begin=".33"
                            calcMode="spline"
                            dur="1.5s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                        <circle cx="6" cy="12" r="0" fill="currentColor">
                          <animate
                            attributeName="r"
                            begin="0"
                            calcMode="spline"
                            dur="1.5s"
                            keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                            repeatCount="indefinite"
                            values="0;2;0;0"
                          />
                        </circle>
                      </svg>
                    </div>
                  </div>
                  <div class="profile">
                    <img src="/assets/profile.png" alt="profile" />
                  </div>`;
  return indicator;
};
// JavaScript function to show/hide the typing indicator
function setupTypingIndicator(inputId, timeout, messagesContainerId) {
  const inputElement = document.querySelector(inputId);
  const indicatorElement = genreateTypingIndicator();
  const messagesContainer  = document.querySelector(".messages");
  let typingTimeout;

  inputElement.addEventListener('input', () => {
      if (!messagesContainer.contains(indicatorElement)) {
          messagesContainer.appendChild(indicatorElement);
      }

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
          if (messagesContainer.contains(indicatorElement)) {
              messagesContainer.removeChild(indicatorElement);
          }
      }, timeout);
  });

  inputElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
          clearTimeout(typingTimeout);
          if (messagesContainer.contains(indicatorElement)) {
              messagesContainer.removeChild(indicatorElement);
          }
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  chatInputHandler();
  initialMessageRenderer();
  settingsToggler();
  setupTypingIndicator(".input_div",  1000);
});
