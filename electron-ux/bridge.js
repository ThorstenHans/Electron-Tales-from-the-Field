const electron = require('electron');

const init = () => {
    window.bridge = {
        openExternal: openExternal,
    };
};

const openExternal = url => {
    if (url && url.match(/^https?:\/\//)) {
        electron.shell.openExternal(url);
    }
};

init();
