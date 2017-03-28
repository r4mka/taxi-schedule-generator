const electron  = require('electron')
const path      = require('path')
const PdfMake   = require('pdfmake')
const fs        = require('fs')

const ipcMain       = electron.ipcMain
const app           = electron.app
const BrowserWindow = electron.BrowserWindow
const reactDevTools = '/Users/aramski/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.0.12_0'
const schedulesPath = path.join(__dirname, '/app/resources/grafiki')

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
  BrowserWindow.addDevToolsExtension(reactDevTools)
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

ipcMain.on('generate-schedule', (event, pdfDefinition, pdfName) => {
  const Roboto = {
    Roboto: {
      normal:      './app/fonts/Roboto-Regular.ttf',
      bold:        './app/fonts/Roboto-Medium.ttf',
      italics:     './app/fonts/Roboto-Italic.ttf',
      bolditalics: './app/fonts/Roboto-Italic.ttf'
    }
  }
  
  const printer  = new PdfMake(Roboto)
  const schedule = printer.createPdfKitDocument(pdfDefinition)
  schedule.pipe(fs.createWriteStream('./app/resources/grafiki/' + pdfName))
  schedule.end()

  event.sender.send('generate-schedule-reply', 'done')
})

ipcMain.on('check-schedules', (event) => {
  fs.readdir(schedulesPath, (err, files) => {
    if (err) {
      return event.sender.send('check-schedules-reply-err', err)
    }
    return event.sender.send('check-schedules-reply', files)
  })
})
