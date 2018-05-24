const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    const mainWindowConfig = {
        width: 1000,
        height: 700,
        center: true,
        title: 'TechoramaBE 2018 - Remote Finished',
        webPreferences: {
            // disable node.js integration
            nodeIntegration: false,
            // create a proxy to whitelist APIs
            preload: path.join(__dirname, 'bridge.js'),
        },
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

    // disable eval for renderer
    mainWindow.webContents.executeJavaScript(
        'window.eval = function(){ throw new Error(`Sorry, this app does not support window.eval().`);}'
    );


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
