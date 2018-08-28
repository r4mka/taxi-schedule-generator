const electron  = require('electron')
const path      = require('path')
const fs        = require('fs')
const PdfMake   = require('pdfmake')
const PDFWindow = require('electron-pdf-window')

const ipcMain       = electron.ipcMain
const app           = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog        = electron.dialog

// const reactDevTools = '/Users/aramski/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.0.12_0'

// const appDataPath  = (electron.app || electron.remote.app).getAppPath()

const userDataPath  = (electron.app || electron.remote.app).getPath('userData')
const schedulesPath = path.join(userDataPath)
const fontsPath     = path.join(__dirname, 'app', 'fonts')

// const fontsPath = path.join(__dirname, 'app', 'fonts')
// console.log(fontsPath)

// reference to window object to prevent garbage collection
let mainWindow

function createWindow () {
  let modalPath = path.join('file://', __dirname, 'index.html')

  mainWindow = new BrowserWindow({width: 1360, height: 882})
  // mainWindow.webContents.openDevTools()
  mainWindow.loadURL(modalPath)
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // BrowserWindow.addDevToolsExtension(reactDevTools)
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
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
      normal:      path.join(fontsPath, 'Roboto-Regular.ttf'),
      bold:        path.join(fontsPath, 'Roboto-Medium.ttf'),
      italics:     path.join(fontsPath, 'Roboto-Italic.ttf'),
      bolditalics: path.join(fontsPath, 'Roboto-Italic.ttf')
    }
  }
  const schedulePath = path.join(schedulesPath, pdfName)
  const printer      = new PdfMake(Roboto)
  const schedule     = printer.createPdfKitDocument(pdfDefinition)
  const win          = new PDFWindow({
    width:  800,
    height: 600
  })

  schedule.pipe(fs.createWriteStream(schedulePath))
  schedule.on('end', () => {
    win.loadURL(schedulePath)
    event.sender.send('generate-schedule-reply', 'done')
  })
  schedule.end()
})

ipcMain.on('check-schedules', (event) => {
  fs.readdir(schedulesPath, 'utf8', (err, files) => {
    if (err) {
      return event.sender.send('check-schedules-reply-err', err)
    }

    files = files.map((file) => file.normalize())

    return event.sender.send('check-schedules-reply', files)
  })
})

ipcMain.on('browse-schedules', (event) => {
  const options = {
    defaultPath: schedulesPath,
    properties:  ['openFile', 'multiSelections']
  }

  dialog.showOpenDialog(options, (schedules) => {
    if (schedules) {
      schedules.forEach((schedule) => {
        const win = new PDFWindow({
          width:  800,
          height: 600
        })

        win.loadURL(schedule)
      })
    }

    return event.sender.send('browse-schedules-reply')
  })
})
