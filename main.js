const electron = require('electron')
const path     = require('path')

const app           = electron.app
const BrowserWindow = electron.BrowserWindow

// reference to window object to prevent garbage collection
let mainWindow

function createWindow () {
  let modalPath = path.join('file://', __dirname, 'index.html')

  mainWindow = new BrowserWindow({width: 1500, height: 900})
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(modalPath)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quite()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
