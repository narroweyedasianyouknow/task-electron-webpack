const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const baseURL = 'http://localhost:1500';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 250,
    minWidth: 300,
    webPreferences: {
      preload: path.join(__dirname, "/preload.ts"),
      contextIsolation: true,
      nodeIntegration: true,
      webviewTag: true,
    },
    frame: false,
    autoHideMenuBar: true,
  });  

  // mainWindow.loadURL(`file://${path.join(__dirname, "../dist/index.html")}`);
  mainWindow.loadURL(baseURL);
  ipcMain.on('minimize-main-window', () => {
    mainWindow.minimize()
  })
  ipcMain.on('fullscreen-main-window', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen())
  })
}
ipcMain.on('close-main-window', () => {
  app.quit()
})

app.whenReady().then(() => {
  createWindow();

   app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
