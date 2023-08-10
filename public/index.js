const socket = io();

let name;
let textArea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

do {
  firstName = prompt("Please enter your name..");
} while (!firstName);

textArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

const sendMessage = (message) => {
  let msg = {
    user: firstName,
    message: message.trim(),
  };

  // append
  appendMessage(msg, "outgoing");
  textArea.value = " ";
  scrollToButtom();
  // Sending message to the socket server

  socket.emit("message", msg);
};

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `

  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  
  `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
};

// Recieving Message

socket.on("message", (msg) => {
  console.log(msg);
  appendMessage(msg, "incoming");
  scrollToButtom();
});

const scrollToButtom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};
