// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const fs = require("fs");

let mainWindow;
let childWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    frame: false,
    title: "Notes",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('main.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createChildWindow() {
  childWindow = new BrowserWindow({
    height: 300,
    width: 400,
    parent: mainWindow,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  childWindow.loadFile("child.html");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on("display-new-note", () => {
  createChildWindow();
});

ipcMain.on("open-file-dialog", async (event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: "Open a text file",
    filters: [{name: "Text", extensions:["txt"]}],
    properties: ["openFile"]
  });

  if(canceled || filePaths.length === 0) {
    dialog.showMessageBox({
      type: "error",
      title: "File open cancelled",
      message: "You cancelled opening the file."
    })
    event.sender.send("text-file-content", {
    canceled: true
    });

    return;
  }

  const filePath = filePaths[0];
  const contents = fs.readFileSync(filePath, "utf8");

  event.sender.send("text-file-content", {
    canceled: false,
    contents
  });
});

ipcMain.on("save-file-dialog", async (event, content) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: "Save note to file",
    filters: [{name: "Text", extensions: ["txt"]}]
  });

  if(!canceled && filePath) {
    fs.writeFileSync(filePath, content, "utf8");
    event.sender.send("text-file-saved", {success: true, filePath});
    dialog.showMessageBox({
      title: "File saved",
      type: "info",
      message: `File saved: ${filePath}`
    })
  } else {
    dialog.showMessageBox({
      type: "error",
      title: "File save cancelled",
      message: "You cancelled saving the file."
    })
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
