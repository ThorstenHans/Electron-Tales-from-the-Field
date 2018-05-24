const provideFeedback = url => {
    window.bridge.openExternal('http://www.google.com');
    return false;
};

const simulateLongRunningAction = () => {
    setTimeout(() => {
        document.querySelector('#result').innerHTML = 'Job Completed';
    }, 3000);
};
