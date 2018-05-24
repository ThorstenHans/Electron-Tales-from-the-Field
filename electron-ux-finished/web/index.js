
const provideFeedbackBtn = document.getElementById('provideFeedback');
const resultDiv = document.getElementById('result');

const startJobBtn = document.getElementById('startjob');
provideFeedbackBtn.onclick = () => {
    window.bridge.openExternal('http://www.google.com');
    return false;
};

startJobBtn.onclick = () => {
    setTimeout(() => {
        window.bridge.simulateLongRunningActionFinished();
        var n = new window.Notification('Action Completed', {
            body: 'Live @ Techorama BE 2018',
            silent: false,
        });

        n.onclick = () => {
            window.bridge.bringToFront();
        };
        resultDiv.innerHTML = 'Job Completed';
    }, 3000);
    return false;
};
