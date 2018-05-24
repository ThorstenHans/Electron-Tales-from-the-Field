const electron = require('electron');

const init = () => {
    window.bridge = {
        openExternal: openExternal,
        bringToFront: bringToFront,
        simulateLongRunningActionFinished: simulateLongRunningActionFinished,
    };
};

const simulateLongRunningActionFinished = () => {
    const dock = electron.remote.require('electron').app.dock;
    if (dock) {
        dock.setBadge('1');
        dock.bounce('critical');
    }
};

const bringToFront = () => {
    const app = electron.remote.require('electron').app;
    app.focus();
};
const openExternal = url => {
    if (url && url.match(/^https?:\/\//)) {
        electron.shell.openExternal(url);
    }
};

init();
