const electron = require('electron'),
    Store = require('electron-store'),
    configStore = new Store();

class Memento {
    read() {
        const { width, height } = configStore.get('dimension', { width: 1000, height: 700 });
        const { screenWidth, screenHeight } = electron.screen.getPrimaryDisplay().workAreaSize;
        const { x, y } = configStore.get('position', { x: (screenWidth - width) / 2, y: (screenHeight - height) / 2 });
        return { width: width, height: height, x: x, y: y };
    }
    writePosition(currentWindow) {
        const currentPosition = currentWindow.getPosition();
        configStore.set('position', {
            x: currentPosition[0],
            y: currentPosition[1],
        });
    }

    writeDimension(currentWindow) {
        const currentDimension = currentWindow.getSize();
        configStore.set('dimension', {
            width: currentDimension[0],
            height: currentDimension[1],
        });
    }
}

module.exports = new Memento();
