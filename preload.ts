const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("webApp", {
  closeApp: () => ipcRenderer.send("close-main-window", { mainWindow: true }),
});
