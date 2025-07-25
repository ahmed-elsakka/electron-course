// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog } = require('electron')
const path = require('node:path')

let quitConfirmed = false;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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


app.on("before-quit", (event) => {
  if(!quitConfirmed) {
    event.preventDefault();
    const response = dialog.showMessageBoxSync({
      type: "question",
      buttons: ["No", "Yes"],
      defaultId: 1,
      cancelId: 0,
      title: "Quitting the Application",
      message: "Are you sure that you want to quit the application?"
    });

    if(response === 1) {
      quitConfirmed = true;
      app.quit();
    }
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
