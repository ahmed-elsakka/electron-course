const { ipcRenderer } = require("electron");

/*document.getElementById("go").addEventListener("click", () => {
    const url = document.getElementById("urlInput").value;
    if (!url.startsWith("http")) {
        alert("Not a valid url.");
        return;
    }
    window.electronAPI.sendNavMessage({
        action: "load",
        data: url
    });
})

window.electronAPI.onLoadingStatusChanged(({loading}) => {
    document.getElementById("status").textContent = loading ? "Loading..." : "Idle";
})

document.getElementById('back').onclick = () => {
    window.electronAPI.sendNavMessage({
        action: "back",
        data: null,
    });
};
document.getElementById('forward').onclick = () => {
    window.electronAPI.sendNavMessage({
        action: "forward",
        data: null,
    });
};
document.getElementById('reload').onclick = () => {
    window.electronAPI.sendNavMessage({
        action: "reload",
        data: null,
    });
};*/


ipcRenderer.on("test", (event, message) => {
    alert(`Message from main process: ${message}`)
})

ipcRenderer.send("greeting", "Hello from Renderer!");