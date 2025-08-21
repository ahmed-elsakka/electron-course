const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  displayNewNote: () => {
    ipcRenderer.send("display-new-note");
  },
  displayOpenFileDialog: () => {
    ipcRenderer.send("open-file-dialog");
  },
  displaySaveFileDialog: (content) => {
    ipcRenderer.send("save-file-dialog", content);
  },
  onFileLoaded: (callback) => {
      ipcRenderer.on("text-file-content", (event, { canceled, contents, fileName }) => {
        callback({canceled, contents, fileName});
    })
  },
  onFileSaved: (callback) => {
      ipcRenderer.on("text-file-saved", (event, { success, fileName }) => {
        callback({success, fileName});
    })
  }
})