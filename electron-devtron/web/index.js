const provideFeedback = url => {
    openExternal('http://www.google.com');
    return false;
};

const openExternal = url => {
    if (url && url.match(/^https?:\/\//)) {
        require('electron').shell.openExternal(url);
    }
};

let interval = null;

const startPingPong = () => {
    let i = 0;
    const { ipcRenderer } = require('electron');
    ipcRenderer.on('pong', (sender, arg) => {
        i = arg;
    });
    interval = setInterval(() => {
        ipcRenderer.send('ping', i);
    }, 500);
};

const stopPingPong = () => {
    if (interval) {
        clearInterval(interval);
    }
};
