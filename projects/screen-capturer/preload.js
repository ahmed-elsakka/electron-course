const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("screenshotAPI", {
  requestCapture: () => ipcRenderer.send("capture-request"),
  onCapture: (callback) => ipcRenderer.on("capture-response", (event, data) => {
    callback(data);
  })
});