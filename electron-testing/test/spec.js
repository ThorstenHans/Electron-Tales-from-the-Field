const Application = require('spectron').Application;
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');

const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..', 'app')],
});

describe('Application launch', function() {
    this.timeout(10000);

    beforeEach(function() {
        return app.start();
    });

    afterEach(function() {
        return app.stop();
    });

    it('shows initial window', function() {
        return app.client.getWindowCount().then(count => {
            assert.equal(count, 1);
        });
    });

    it('doesnt have devtools opened', async () => {
        const actual = await app.client.waitUntilWindowLoaded().browserWindow.isDevToolsOpened();
        return assert.equal(actual, false);
    });

    it('has correct title', async () => {
        const expected = 'TechoramaBE 2018 - Testing';
        const actual = await app.client.waitUntilWindowLoaded().getTitle();
        return assert.equal(actual, expected);
    });
});
