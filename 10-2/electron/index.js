const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: true,
  });

  mainWindow.loadURL("http://localhost:5173");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.on('set-always-on-top', (event, value) => {
    if (mainWindow) {
      mainWindow.setAlwaysOnTop(value);
    }
  });
});