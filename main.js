const electron  = require('electron')
const path      = require('path')
const fs        = require('fs')
const PdfMake   = require('pdfmake')
const PDFWindow = require('electron-pdf-window')

const ipcMain       = electron.ipcMain
const app           = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog        = electron.dialog

const userDocsPath  = (electron.app || electron.remote.app).getPath('documents')
const schedulesPath = path.join(userDocsPath, 'Taxi grafiki')
const fontsPath     = path.join(__dirname, 'app', 'fonts')

// reference to window object to prevent garbage collection
let mainWindow
function createWindow () {
  let modalPath = path.join('file://', __dirname, 'index.html')

  mainWindow = new BrowserWindow({width: 1360, height: 882})
  mainWindow.loadURL(modalPath)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.openDevTools()
  _createSchedulesDirectory(schedulesPath, (err) => {
    if (err) return console.log(err)
    // todo: if err - render popup with message
  })
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

function _createSchedulesDirectory (_path, done) {
  fs.stat(_path, (err, stats) => {
    if (err) {
      if (err.code !== 'ENOENT') return done(err)

      fs.mkdir(_path, done)
    }

    if (stats && !stats.isDirectory()) {
      return done(new Error(_path + ' is not a directory'))
    }

    done()
  })
}
