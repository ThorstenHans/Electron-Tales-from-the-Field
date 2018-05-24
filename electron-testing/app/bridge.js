const { shell } = require('electron');

const init = () => {
    window.bridge = {
        openExternal: openExternal,
    };
};

const openExternal = url => {
    if (url && url.match(/^https?:\/\//)) {
        shell.openExternal(url);
    }
};

init();
