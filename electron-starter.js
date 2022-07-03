const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const baseURL = 'http://localhost:1500';

const createTaskWindow = () => {
  var taskWin = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    parent: false,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
      contextIsolation: true
    },
  })

  ipcMain.on('closeTask', (event, link) => {
    if(taskWin){
      taskWin.close();
    }
  });
  ipcMain.on('onWindowMoving', (event, e) => {
    if(taskWin){
      taskWin.setPosition(e.x, e.y)
    }
  });
  taskWin.on('closed', (event) => {
    event.preventDefault();
    taskWin = null;
  })
  return taskWin
  
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 250,
    minWidth: 300,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
      contextIsolation: true
    },    
    autoHideMenuBar: true,
  });  

  // mainWindow.loadURL(`file://${path.join(__dirname, "../dist/index.html")}`);
  mainWindow.loadURL(baseURL);

}

app.whenReady().then(() => {
  createWindow();
  ipcMain.on('openTask', (event, link) => {
    console.log(link)
    createTaskWindow().loadURL(`${baseURL}/?${link}`);
  });
   app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
