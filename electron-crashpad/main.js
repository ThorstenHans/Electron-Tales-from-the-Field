const { app, BrowserWindow, globalShortcut, crashReporter } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

crashReporter.start({
    productName: 'TechoramaBE 2018 - CrashPad',
    companyName: 'Thinktecture AG',
    submitURL: 'http://localhost:3000/api/crashes',
    uploadToServer: true,
});

function createWindow() {
    const mainWindowConfig = {
        width: 1000,
        height: 700,
        center: true,
        title: 'TechoramaBE 2018 - CrashPad',
    };
    const mainWindowUrl = url.format({
        pathname: path.join(__dirname, 'web', 'index.html'),
        protocol: 'file:',
        slashes: true,
    });

    mainWindow = new BrowserWindow(mainWindowConfig);
    mainWindow.loadURL(mainWindowUrl);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+Shift+D');
});

app.on('ready', () => {
    createWindow();
    globalShortcut.register('CommandOrControl+Shift+D', () => {
        mainWindow.webContents.toggleDevTools();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
