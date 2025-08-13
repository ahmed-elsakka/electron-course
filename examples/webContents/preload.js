const {ipcRenderer, contextBridge} = require("electron");


contextBridge.exposeInMainWorld("electronAPI", {
  sendNavMessage: (payload) => {
    ipcRenderer.send("nav", payload)
  },
  onLoadingStatusChanged: (callback) => {
    ipcRenderer.on("loading-status", (event, payload) => {
      callback(payload);
    })
  }
});
