
const goodFeedback = document.getElementById('goodFeedback');
const badFeedback = document.getElementById('badFeedback');

goodFeedback.onclick = () => {
    window.bridge.openExternal('http://www.google.com');
    return false;
};

badFeedback.onclick = () => {
    window.bridge.openExternal('x-apple.systempreferences:com.apple.preference.keyboard');
    return false;
};
