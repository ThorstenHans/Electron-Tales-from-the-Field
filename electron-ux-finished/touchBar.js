const { TouchBar } = require('electron');
const { TouchBarButton } = TouchBar;

class Touchy {
    getTouchBar(webContents) {
        return new TouchBar([
            new TouchBarButton({
                label: '🚀',
                backgroundColor: '#7851A9',
                click: () => {
                    webContents.toggleDevTools();
                },
            }),
        ]);
    }
}

module.exports = new Touchy();
