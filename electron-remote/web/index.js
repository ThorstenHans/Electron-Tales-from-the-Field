const provideFeedback = url => {
    openExternal('http://www.google.com');
    return false;
};

const provideBadFeedback = () => {
    openExternal('x-apple.systempreferences:com.apple.preference.keyboard');
    return false;
};

const openExternal = url => {
    require('electron').shell.openExternal(url);
};
