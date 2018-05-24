const electron = require('electron');
const { app, BrowserWindow, globalShortcut } = electron;
const path = require('path'),
    url = require('url'),
    createMenu = require(path.join(__dirname, 'menu.js')),
    memento = require(path.join(__dirname, 'memento.js')),
    touchy = require(path.join(__dirname, 'touchBar.js'));

let mainWindow;

function createWindow() {
    const bounds = memento.read();
    const mainWindowConfig = {
        width: bounds.width,
        height: bounds.height,
        minWidth: 600,
        minHeight: 300,
        x: bounds.x,
        y: bounds.y,
        show: false,
        title: 'TechoramaBE 2018 - UX finished',
        webPreferences: {
            nodeIntegration: false,
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
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.setTouchBar(touchy.getTouchBar(mainWindow.webContents));
    });
    mainWindow.on('focus', () => {
        const dock = app.dock;
        if (dock) {
            dock.setBadge('');
        }
    });
    mainWindow.on('resize', () => {
        memento.writeDimension(mainWindow);
    });
    mainWindow.on('move', () => {
        memento.writePosition(mainWindow);
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+Shift+D');
});

app.on('ready', () => {
    createMenu(app);
    createWindow();
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
