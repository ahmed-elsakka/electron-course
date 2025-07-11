const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-close").addEventListener("click", () => {
        window.close();
    });
})

document.getElementById("btn-open-file").addEventListener("click", () => {
    ipcRenderer.send("open-file-dialog");
})

document.getElementById("btn-save-file").addEventListener("click", () => {
    const content = document.getElementById("area-content").value;
    ipcRenderer.send("save-file-dialog", content);
})

ipcRenderer.on("text-file-content", (event, { canceled, contents }) => {
    if(!canceled) {
        document.getElementById("area-content").value = contents;
    }
})

ipcRenderer.on("text-file-saved", (event, {success, filePath}) => {
    if(success) {
        alert(`File saved: ${filePath}`)
    } else {
        alert("Saving to file canceled")
    }
})