const { app, BrowserWindow } = require('electron');

const url = require('url'),
    path = require('path');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        center: true,
        title: 'Techorama live'
    });
    const mainWindowUrl = url.format({
        pathname: path.join(__dirname, 'web', 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(mainWindowUrl);
    mainWindow.webContents.toggleDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
