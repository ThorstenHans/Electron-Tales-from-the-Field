const provideFeedback = url => {
    window.bridge.openExternal('http://www.google.com');
    return false;
};

const provideBadFeedback = () => {
    window.bridge.openExternal('x-apple.systempreferences:com.apple.preference.keyboard');
    return false;
};
