const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("webApp", {
  closeApp: () => ipcRenderer.send("close-main-window", { mainWindow: true }),
  minimizeApp: () => ipcRenderer.send("minimize-main-window"),
  fullscreenApp: () => ipcRenderer.send("fullscreen-main-window"),
});
