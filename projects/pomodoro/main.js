// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("node:path");
const isDev = process.env.NODE_ENV === "development";

let mainWindow;

const showPomodoroWiki = () => {
  shell.openExternal("https://en.wikipedia.org/wiki/Pomodoro_Technique");
};
const stopTimer = () => {
  mainWindow.webContents.send("timer-control", "stop");
};
const startTimer = () => {
  mainWindow.webContents.send("timer-control", "start");
};
const pauseTimer = () => {
  mainWindow.webContents.send("timer-control", "pause");
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 550,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const menuTemplate = [
  {
    label: "Timer",
    submenu: [
      {
        label: "Start",
        click: startTimer,
      },
      {
        label: "Pause",
        click: pauseTimer,
      },
      {
        label: "Stop",
        click: stopTimer,
      },
    ],
  },
  ...(isDev
    ? [
        {
          label: "View",
          submenu: [
            {
              label: "Reload",
              role: "reload"
            },
            {
              label: "Show DevTools",
              role: "toggledevtools"
            }
          ]
        }
      ]
    : []),
  {
    label: "Help",
    submenu: [
      {
        label: "What is Pomodoro?",
        click: showPomodoroWiki,
      },
    ],
  },
];

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
