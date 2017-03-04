const electron = require('electron')
const path     = require('path')

const app           = electron.app
const BrowserWindow = electron.BrowserWindow

// reference to window object to prevent garbage collection
let mainWindow

function createWindow () {
  let modalPath = path.join('file://', __dirname, 'index.html')

  mainWindow = new BrowserWindow({width: 1360, height: 882})
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(modalPath)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  BrowserWindow.addDevToolsExtension('/Users/aramski/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.0.12_0')
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
