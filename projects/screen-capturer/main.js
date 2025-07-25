// Modules to control application life and create native browser window
const { app, BrowserWindow, desktopCapturer, ipcMain, globalShortcut, screen, shell, Tray, Menu} = require('electron')
const path = require('node:path')
const fs = require("fs");

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true

    },
    frame: false,
    transparent: true,
    show: false
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
  createTray();
  globalShortcut.register("CommandOrControl+Alt+Shift+S", async () => {
    await captureScreenshot();
  });
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

ipcMain.on("capture-request", async (event) => {
  const buffer = await captureScreenshot();
  event.reply("capture-response", buffer);
});

async function captureScreenshot() {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  const screens = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: {
      width: screenSize.width,
      height: screenSize.height
    }
  });
  const img = screens[0].thumbnail.toPNG();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `screenshot-${timestamp}.png`;
  const outputPath = path.join(__dirname, filename);

  fs.writeFile(outputPath, img, (err) => {
    if(err) return console.error(err);
    shell.openExternal(`file://${outputPath}`);
  });

}

function createTray() {
  const iconPath = path.join(__dirname, "assets/camera.png");
  const tray = new Tray(iconPath);

  const contextMenuTemplate =  [
    {
      label: "Capture Screenshot (Ctrl+Alt+Shift+S)",
      click: async () => {
        await captureScreenshot();
      }
    },
    {
      label: "Show",
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      }
    }
  ];

  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("Screenshot Capturer");

  tray.on("click", () => {
    if(mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}