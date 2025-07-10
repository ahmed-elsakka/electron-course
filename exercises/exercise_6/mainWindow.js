const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-close").addEventListener("click", () => {
    window.close();
  });

  document.getElementById("btn-new-note").addEventListener("click", () => {
    ipcRenderer.send("display-new-note");
  });
});
