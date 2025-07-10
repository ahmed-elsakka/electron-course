const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-close").addEventListener("click", () => {
        window.close();
    });
})

document.getElementById("btn-open-file").addEventListener("click", () => {
    ipcRenderer.send("open-file-dialog");
})

ipcRenderer.on("text-file-content", (event, { canceled, contents }) => {
    if(!canceled) {
        document.getElementById("area-content").value = contents;
    }
})