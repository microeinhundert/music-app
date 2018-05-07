const electron = require('electron'),
  { app, BrowserWindow } = electron,
  url = process.env.NODE_ENV === 'DEV' ? 'http://localhost:8080/' : `file://${process.cwd()}/dist/index.html`;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#1A1D2C',
  });

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
