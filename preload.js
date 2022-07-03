const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    openTask: (task) => ipcRenderer.send('openTask', task),
    closeTask: (task) => ipcRenderer.send('closeTask', task),
    onWindowMoving: (x, y) => ipcRenderer.send('onWindowMoving', { x: x, y: y }),
})