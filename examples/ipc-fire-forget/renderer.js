const { ipcRenderer } = require("electron");

document.getElementById("btn-send").addEventListener("click", () => {
  ipcRenderer.send("log-message", "Hello from renderer prcoess!");
});
